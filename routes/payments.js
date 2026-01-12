const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

const router = express.Router();

// Generate PayPal Access Token
async function generateAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");
  const paypalApi = process.env.PAYPAL_MODE === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com';
    
  const response = await axios.post(
    `${paypalApi}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

// Create PayPal Order
router.post('/create-paypal-order', auth, async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    // Get booking details
    const booking = await Booking.findById(bookingId).populate('event');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const accessToken = await generateAccessToken();
    const paypalApi = process.env.PAYPAL_MODE === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';

    const orderData = {
      intent: 'CAPTURE',
      application_context: {
        brand_name: 'EventHub',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`
      },
      purchase_units: [{
        reference_id: booking.bookingReference,
        description: `EventHub - ${booking.event.title}`,
        amount: {
          currency_code: 'USD',
          value: booking.totalAmount.toFixed(2)
        }
      }]
    };

    const response = await axios.post(
      `${paypalApi}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      }
    );
    
    // Update booking with PayPal order ID
    booking.paypalOrderId = response.data.id;
    await booking.save();

    const approvalUrl = response.data.links.find(link => link.rel === 'approve')?.href;

    res.json({
      orderID: response.data.id,
      approvalUrl
    });

  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({ message: 'Failed to create PayPal order' });
  }
});

// Capture PayPal Payment
router.post('/capture-paypal-payment', auth, async (req, res) => {
  try {
    const { orderID, bookingId } = req.body;

    const accessToken = await generateAccessToken();
    const paypalApi = process.env.PAYPAL_MODE === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';

    const response = await axios.post(
      `${paypalApi}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      }
    );
    
    // Update booking status
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (response.data.status === 'COMPLETED') {
      booking.paymentStatus = 'completed';
      booking.paymentMethod = 'paypal';
      booking.paypalPaymentId = response.data.purchase_units[0].payments.captures[0].id;
      booking.status = 'confirmed';
      await booking.save();

      res.json({
        success: true,
        message: 'Payment completed successfully',
        paymentId: response.data.purchase_units[0].payments.captures[0].id
      });
    } else {
      booking.paymentStatus = 'failed';
      await booking.save();
      
      res.status(400).json({
        success: false,
        message: 'Payment was not completed'
      });
    }

  } catch (error) {
    console.error('PayPal payment capture error:', error);
    res.status(500).json({ message: 'Failed to capture payment' });
  }
});

// Get PayPal Client ID for frontend
router.get('/paypal-client-id', (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID,
    mode: process.env.PAYPAL_MODE || 'sandbox'
  });
});

// PayPal Webhook (for production)
router.post('/paypal-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    // Handle PayPal webhooks for production
    const event = req.body;
    
    console.log('PayPal webhook received:', event.event_type);
    
    // Handle different webhook events
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Handle successful payment
        console.log('Payment completed:', event.resource.id);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        // Handle failed payment
        console.log('Payment denied:', event.resource.id);
        break;
      default:
        console.log('Unhandled webhook event:', event.event_type);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});

module.exports = router;