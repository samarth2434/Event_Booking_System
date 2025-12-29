# EventHub - Event Booking System

A complete MERN stack event booking system with features like event management, secure payment processing, booking management, and admin dashboard.

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login system
- **Event Discovery**: Browse events by category, location, and date
- **Event Details**: Comprehensive event information with venue details
- **Ticket Booking**: Multiple ticket types (General, VIP, Premium)
- **Secure Payments**: Stripe integration for secure payment processing
- **Booking Management**: View and manage personal bookings
- **QR Code Tickets**: Digital tickets with QR codes for entry
- **Email Notifications**: Booking confirmations and event reminders
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Admin Dashboard**: Overview of events, bookings, users, and revenue
- **Event Management**: Create, edit, and manage events
- **Booking Management**: View and manage all bookings
- **User Management**: View registered users and their activity
- **Revenue Analytics**: Track earnings and popular events
- **Status Management**: Update event and booking statuses

### Technical Features
- **Real-time Availability**: Live ticket availability updates
- **Automated Reminders**: Email reminders sent 24 hours before events
- **Booking Expiration**: Automatic cleanup of unpaid bookings
- **Calendar Integration**: Event scheduling and date management
- **Search & Filtering**: Advanced search and filtering capabilities
- **Pagination**: Efficient data loading with pagination

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Nodemailer** - Email service
- **Multer** - File uploads
- **Node-cron** - Scheduled tasks

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Lucide React** - Icons
- **QR Code** - QR code generation
- **Date-fns** - Date utilities

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Stripe account for payments
- Gmail account for email service

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-booking-system
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eventbooking
   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start the backend server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```

### Full Application Setup

To run both backend and frontend simultaneously:
```bash
npm run dev
```

## 🔧 Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your `.env` file
3. The application will automatically create the necessary collections

### Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Add the keys to your `.env` file
4. For webhooks, use Stripe CLI or configure webhook endpoints

### Email Setup
1. Use a Gmail account or configure SMTP settings
2. For Gmail, you may need to use App Passwords
3. Update email credentials in the `.env` file

## 📱 Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Browse Events**: Explore available events
3. **Book Tickets**: Select events and book tickets
4. **Make Payment**: Secure payment via Stripe
5. **Receive Confirmation**: Get booking confirmation with QR code
6. **Attend Event**: Present QR code at venue

### For Admins
1. **Login as Admin**: Use admin credentials
2. **Access Dashboard**: View system overview
3. **Manage Events**: Create and manage events
4. **Monitor Bookings**: Track all bookings
5. **Manage Users**: View user activity

### Demo Credentials
```
Admin Login:
Email: admin@eventhub.com
Password: admin123

User Login:
Email: user@eventhub.com
Password: user123
```

## 🏗️ Project Structure

```
event-booking-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── utils/                  # Utility functions
├── uploads/                # File uploads directory
├── server.js              # Main server file
└── package.json
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin resource sharing configuration
- **Rate Limiting**: Protection against abuse
- **Secure Headers**: Security headers for production

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

### Bookings
- `GET /api/bookings/my-bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details

### Payments
- `POST /api/payments/create-payment-intent` - Create payment
- `POST /api/payments/confirm-payment` - Confirm payment

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/events` - Manage events
- `GET /api/admin/bookings` - Manage bookings
- `GET /api/admin/users` - Manage users

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git or GitHub integration

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Configure environment variables

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update connection string in environment variables
3. Configure network access and database users

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: support@eventhub.com

## 🔮 Future Enhancements

- **Social Login**: Google, Facebook authentication
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Detailed reporting and analytics
- **Multi-language Support**: Internationalization
- **Event Reviews**: User reviews and ratings
- **Seat Selection**: Interactive seat selection for venues
- **Recurring Events**: Support for recurring events
- **Discount Codes**: Promotional codes and discounts
- **Waitlist**: Waitlist for sold-out events
- **Live Chat**: Customer support chat

---

Built with ❤️ using the MERN stack