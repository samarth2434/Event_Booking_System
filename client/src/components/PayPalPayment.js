import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const PayPalPayment = ({ booking, onSuccess, onError }) => {
  const [paypalClientId, setPaypalClientId] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchPayPalConfig();
  }, []);

  const fetchPayPalConfig = async () => {
    try {
      const response = await axios.get('/api/payments/paypal-client-id');
      setPaypalClientId(response.data.clientId);
    } catch (error) {
      console.error('Error fetching PayPal config:', error);
      toast.error('Failed to load PayPal configuration');
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/payments/create-paypal-order', {
        bookingId: booking._id
      }, {
        headers: { 'x-auth-token': token }
      });

      return response.data.orderID;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      toast.error('Failed to create payment order');
      throw error;
    }
  };

  const onApprove = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/payments/capture-paypal-payment', {
        orderID: data.orderID,
        bookingId: booking._id
      }, {
        headers: { 'x-auth-token': token }
      });

      if (response.data.success) {
        toast.success('Payment completed successfully!');
        onSuccess(response.data);
      } else {
        toast.error('Payment failed');
        onError(new Error('Payment failed'));
      }
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      toast.error('Payment processing failed');
      onError(error);
    }
  };

  const onCancel = () => {
    toast.info('Payment cancelled');
  };

  const onErrorHandler = (error) => {
    console.error('PayPal error:', error);
    toast.error('Payment error occurred');
    onError(error);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <div className="spinner" style={{
          width: '32px',
          height: '32px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #667eea'
        }}></div>
      </div>
    );
  }

  if (!paypalClientId) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#718096'
      }}>
        <p>PayPal configuration not available</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <PayPalScriptProvider
        options={{
          "client-id": paypalClientId,
          currency: "USD",
          intent: "capture"
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal"
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onErrorHandler}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;