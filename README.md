# EventHub - Professional Event Booking System

A complete MERN stack event booking system with advanced features including role-based admin controls, secure PayPal payments, MongoDB Atlas integration, email notifications, and comprehensive event management.

## 🚀 Features

### User Features
- **User Authentication**: Secure JWT-based registration and login system
- **Event Discovery**: Browse events by category, location, date with advanced filtering
- **Event Details**: Comprehensive event information with venue details and pricing
- **Ticket Booking**: Multiple ticket types (General, VIP, Premium) with real-time availability
- **PayPal Integration**: Secure payment processing with PayPal checkout
- **Booking Management**: View and manage personal bookings with QR codes
- **Email Notifications**: Automated booking confirmations and welcome emails
- **Responsive Design**: Mobile-first responsive interface
- **Profile Management**: User profile with booking history

### Admin Features (Role-Based Access Control)
- **Secure Admin Dashboard**: Complete system overview with analytics
- **Event Management**: Create, edit, delete, and manage all events
- **Booking Management**: View and manage all user bookings
- **User Management**: View registered users and their activity
- **Revenue Analytics**: Track earnings, popular events, and booking statistics
- **Status Management**: Update event and booking statuses
- **Admin-Only Access**: Secure role-based permissions system

### Technical Features
- **MongoDB Atlas**: Cloud database with automatic scaling
- **Real-time Updates**: Live ticket availability and booking updates
- **Automated Email System**: Gmail integration with HTML email templates
- **Security Implementation**: Role-based access control with admin middleware
- **PayPal Sandbox**: Complete payment testing environment
- **Search & Filtering**: Advanced search with pagination
- **File Upload**: Event image management with Multer
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication with role-based access
- **PayPal SDK** - Payment processing
- **Nodemailer** - Gmail email service
- **Multer** - File upload handling
- **Node-cron** - Scheduled tasks
- **Bcryptjs** - Password hashing
- **Express-validator** - Input validation

### Frontend
- **React 18** - Modern UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **PayPal React SDK** - PayPal payment components
- **React Toastify** - Toast notifications
- **Lucide React** - Modern icon library
- **Context API** - State management
- **Responsive CSS** - Mobile-first design

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB Atlas** account (cloud database)
- **PayPal Developer** account
- **Gmail** account with App Password

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following configuration:

   ```env
   # Environment Configuration
   NODE_ENV=development
   PORT=5000

   # Database (MongoDB Atlas)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventbooking?appName=EventHub

   # JWT Secret (Generate a secure key)
   JWT_SECRET=your_secure_jwt_secret_key_here

   # PayPal Configuration
   PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
   PAYPAL_MODE=sandbox

   # Email Configuration (Gmail)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   EMAIL_FROM=EventHub <your_email@gmail.com>
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587

   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

4. **Create Admin User**
   ```bash
   npm run create-admin
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both backend (port 5000) and frontend (port 3000) servers.

## 🔧 Detailed Configuration

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create database user with read/write permissions
4. Get connection string and update `MONGODB_URI`
5. Whitelist your IP address

### PayPal Integration Setup
1. Create account at [PayPal Developer](https://developer.paypal.com/)
2. Create a new sandbox application
3. Get Client ID and Client Secret
4. Update PayPal credentials in `.env`
5. Use sandbox accounts for testing

### Gmail Email Service Setup
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password (not regular password)
3. Update email credentials in `.env`
4. Test email functionality

### JWT Secret Generation
Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔐 Security Features

### Role-Based Access Control
- **Admin Role**: Full system access (create/edit/delete events)
- **User Role**: Limited access (view events, book tickets)
- **Route Protection**: Frontend and backend route guards
- **Middleware Security**: Admin middleware on protected routes

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured cross-origin resource sharing
- **Admin Verification**: Multi-layer admin access verification

## 📱 Usage Guide

### Admin Access
```
Email: admin@eventhub.com
Password: admin123456
Role: admin
```

**Admin Capabilities:**
- Access admin dashboard at `/admin`
- Create and manage events
- View all bookings and users
- Monitor system analytics
- Manage event statuses

### User Registration & Booking
1. **Register**: Create new user account
2. **Browse Events**: View available events with filters
3. **Book Tickets**: Select tickets and proceed to checkout
4. **PayPal Payment**: Complete secure payment via PayPal
5. **Confirmation**: Receive booking confirmation email
6. **Manage Bookings**: View booking history and details

## 🏗️ Project Structure

```
event-booking-system/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/               # Authentication components
│   │   │   ├── Layout/             # Layout components
│   │   │   └── PayPalPayment.js    # PayPal integration
│   │   ├── contexts/
│   │   │   └── AuthContext.js      # Authentication context
│   │   ├── pages/
│   │   │   ├── Admin/              # Admin-only pages
│   │   │   ├── Auth/               # Login/Register pages
│   │   │   └── ...                 # Other pages
│   │   └── App.js                  # Main app component
├── models/                          # MongoDB Models
│   ├── User.js                     # User model with roles
│   ├── Event.js                    # Event model
│   └── Booking.js                  # Booking model
├── routes/                          # Express Routes
│   ├── auth.js                     # Authentication routes
│   ├── events.js                   # Event management routes
│   ├── bookings.js                 # Booking routes
│   ├── payments.js                 # PayPal payment routes
│   └── admin.js                    # Admin-only routes
├── middleware/
│   ├── auth.js                     # Authentication middleware
│   └── admin.js                    # Admin role middleware
├── utils/
│   ├── emailService.js             # Email service utilities
│   └── scheduler.js                # Scheduled tasks
├── scripts/
│   ├── createAdmin.js              # Admin user creation
│   ├── checkAtlasConnection.js     # Database connection test
│   └── testAdminLogin.js           # Admin login verification
├── uploads/                         # File upload directory
├── server.js                       # Main server file
├── .env                            # Environment variables
└── package.json                    # Dependencies and scripts
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user profile

### Events (Admin Protected)
- `GET /api/events` - Get all events (public)
- `GET /api/events/featured` - Get featured events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details

### PayPal Payments
- `POST /api/payments/create-paypal-order` - Create PayPal order
- `POST /api/payments/capture-paypal-payment` - Capture payment
- `GET /api/payments/paypal-client-id` - Get PayPal client ID

### Admin Dashboard
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/events` - Manage all events
- `GET /api/admin/bookings` - Manage all bookings
- `GET /api/admin/users` - Manage all users

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/eventbooking
JWT_SECRET=your_production_jwt_secret
PAYPAL_CLIENT_ID=your_live_paypal_client_id
PAYPAL_CLIENT_SECRET=your_live_paypal_client_secret
PAYPAL_MODE=live
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_production_app_password
CLIENT_URL=https://your-domain.com
```

### Deployment Steps
1. **Backend**: Deploy to Heroku, Railway, or similar
2. **Frontend**: Deploy to Netlify, Vercel, or similar
3. **Database**: MongoDB Atlas (already cloud-based)
4. **PayPal**: Switch to live credentials
5. **Email**: Use production email credentials

## 🧪 Testing

### Available Scripts
```bash
npm run dev          # Start both servers
npm run server       # Start backend only
npm run client       # Start frontend only
npm run create-admin # Create admin user
npm run seed         # Seed sample data
```

### Testing Checklist
- [ ] User registration and login
- [ ] Admin login and dashboard access
- [ ] Event creation (admin only)
- [ ] Event booking flow
- [ ] PayPal payment processing
- [ ] Email notifications
- [ ] Role-based access control

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/eventbooking` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secure_random_string` |
| `PAYPAL_CLIENT_ID` | PayPal application client ID | `AQW_B3JJSFFHl0HG96GCX0COAqO7Ep0J...` |
| `PAYPAL_CLIENT_SECRET` | PayPal application client secret | `EFQReXHA_hknorA3fdMtcwTd0PRvyGT-...` |
| `PAYPAL_MODE` | PayPal environment | `sandbox` or `live` |
| `EMAIL_USER` | Gmail email address | `your_email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `abcd efgh ijkl mnop` |
| `CLIENT_URL` | Frontend application URL | `http://localhost:3000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

- **Security Documentation**: See `SECURITY_IMPLEMENTATION.md`
- **PayPal Setup Guide**: See `PAYPAL_SETUP.md`
- **Quick Start Guide**: See `QUICKSTART.md`

For support and questions:
- Create an issue in the repository
- Email: gsamarth2004@gmail.com

## 🔮 Future Enhancements

- [ ] **Social Login**: Google, Facebook authentication
- [ ] **Mobile App**: React Native mobile application
- [ ] **Advanced Analytics**: Detailed reporting dashboard
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Event Reviews**: User reviews and ratings system
- [ ] **Seat Selection**: Interactive venue seat selection
- [ ] **Recurring Events**: Support for recurring event series
- [ ] **Discount Codes**: Promotional codes and discounts
- [ ] **Waitlist Management**: Waitlist for sold-out events
- [ ] **Live Chat**: Customer support integration
- [ ] **Push Notifications**: Real-time event updates
- [ ] **Calendar Integration**: Google Calendar sync

---

**Built with ❤️ using the MERN stack**  
**Secure • Scalable • Production-Ready**