# PayPal Integration Setup Guide

## Overview
The Event Booking System now uses PayPal for payment processing instead of Stripe. This guide will help you set up PayPal integration.

## PayPal Developer Account Setup

### 1. Create PayPal Developer Account
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Sign in with your PayPal account or create a new one
3. Navigate to "My Apps & Credentials"

### 2. Create a Sandbox Application
1. Click "Create App"
2. Choose "Default Application" 
3. Select "Sandbox" for testing
4. Choose your sandbox business account
5. Select "Checkout" as the product

### 3. Get Your Credentials
After creating the app, you'll get:
- **Client ID**: Used for frontend PayPal buttons
- **Client Secret**: Used for server-side API calls

### 4. Update Environment Variables
Update your `.env` file with your PayPal credentials:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret_here
PAYPAL_MODE=sandbox
```

## Testing the Integration

### 1. PayPal Sandbox Accounts
PayPal automatically creates test accounts for you:
- **Business Account**: Receives payments
- **Personal Account**: Makes payments

You can find these in your PayPal Developer Dashboard under "Sandbox" > "Accounts"

### 2. Test Payment Flow
1. Start the application: `npm run dev`
2. Navigate to an event and click "Book Now"
3. Fill in booking details and click "Create Booking"
4. Use PayPal sandbox credentials to complete payment
5. Verify booking status changes to "confirmed"

### 3. Test Credentials
Use these PayPal sandbox test accounts:
- **Email**: sb-buyer@personal.example.com
- **Password**: password123

## Production Setup

### 1. Create Live Application
1. In PayPal Developer Dashboard, create a new app
2. Select "Live" instead of "Sandbox"
3. Get your live credentials

### 2. Update Environment
```env
PAYPAL_CLIENT_ID=your_live_client_id_here
PAYPAL_CLIENT_SECRET=your_live_client_secret_here
PAYPAL_MODE=live
```

## Features Implemented

✅ **PayPal Order Creation**: Creates PayPal orders with booking details
✅ **Payment Capture**: Captures payments after user approval
✅ **Booking Integration**: Updates booking status after successful payment
✅ **Email Notifications**: Sends confirmation emails after payment
✅ **Error Handling**: Proper error handling for failed payments
✅ **Responsive UI**: PayPal buttons integrated into booking modal

## API Endpoints

- `POST /api/payments/create-paypal-order` - Create PayPal order
- `POST /api/payments/capture-paypal-payment` - Capture payment
- `GET /api/payments/paypal-client-id` - Get client ID for frontend

## Troubleshooting

### Common Issues

1. **"PayPal configuration not available"**
   - Check your PAYPAL_CLIENT_ID in .env file
   - Ensure the server is running and environment variables are loaded

2. **"Failed to create PayPal order"**
   - Verify PAYPAL_CLIENT_SECRET is correct
   - Check PayPal API credentials in developer dashboard

3. **Payment not completing**
   - Ensure you're using sandbox test accounts
   - Check browser console for JavaScript errors

### Debug Mode
Enable PayPal debug mode by adding to your .env:
```env
PAYPAL_DEBUG=true
```

## Security Notes

- Never expose your Client Secret in frontend code
- Use HTTPS in production
- Validate all payments on the server side
- Store payment IDs for record keeping

## Support

For PayPal-specific issues, refer to:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal Integration Guide](https://developer.paypal.com/docs/checkout/)