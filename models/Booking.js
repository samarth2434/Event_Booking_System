const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  tickets: {
    general: {
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    },
    vip: {
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    },
    premium: {
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'cash'],
    default: 'paypal'
  },
  paypalOrderId: {
    type: String
  },
  paypalPaymentId: {
    type: String
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true
  },
  attendeeInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'attended'],
    default: 'confirmed'
  },
  qrCode: {
    type: String
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    // Generate a unique booking reference
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
    this.bookingReference = `BK${timestamp}${randomStr}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);