# 🚀 EventHub - Quick Start Guide

Get your Event Booking System up and running in minutes!

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Install locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🏃‍♂️ Quick Setup (5 minutes)

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd event-booking-system
npm run setup
```

### 2. Configure Environment
Edit the `.env` file with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/eventbooking
JWT_SECRET=your_secure_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, just update the MONGODB_URI in .env
```

### 4. Seed Sample Data
```bash
npm run seed
```

### 5. Start the Application
```bash
npm run dev
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔐 Demo Login Credentials

### Admin Account
- **Email**: admin@eventhub.com
- **Password**: admin123

### User Account
- **Email**: user@eventhub.com
- **Password**: user123

## 🎯 What You Get

### ✅ Pre-loaded Sample Data
- 6 diverse events (concerts, conferences, sports, etc.)
- 3 user accounts (1 admin, 2 regular users)
- Sample bookings and transactions

### ✅ Full Feature Set
- User registration and authentication
- Event browsing and filtering
- Ticket booking system
- Payment processing (Stripe)
- Admin dashboard
- Email notifications
- QR code tickets

## 🛠️ Optional Configuration

### Stripe Payment Setup
1. Create account at [stripe.com](https://stripe.com)
2. Get your test API keys
3. Update `.env` with your keys
4. Test payments will work immediately

### Email Notifications
1. Use Gmail with App Password
2. Update EMAIL_USER and EMAIL_PASS in `.env`
3. Booking confirmations and reminders will be sent

### Production Deployment
1. Set `NODE_ENV=production`
2. Update MongoDB URI for production
3. Use production Stripe keys
4. Configure proper email service

## 🆘 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ismaster')"

# Or use MongoDB Compass to connect
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Missing Dependencies
```bash
# Reinstall all dependencies
rm -rf node_modules client/node_modules
npm run setup
```

## 📚 Next Steps

1. **Explore the Admin Panel** - Create your own events
2. **Test Booking Flow** - Book tickets as a user
3. **Customize Design** - Modify the React components
4. **Add Features** - Extend functionality as needed
5. **Deploy** - Use Heroku, Netlify, or your preferred platform

## 🎉 You're Ready!

Your Event Booking System is now running with:
- ✅ Complete user authentication
- ✅ Event management system
- ✅ Secure payment processing
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ Mobile-responsive design

Happy coding! 🚀