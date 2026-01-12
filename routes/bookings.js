const express = require('express');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event', 'title date startTime venue images')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate('user', 'name email phone');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating booking with data:', req.body);
    
    const { eventId, tickets, attendeeInfo } = req.body;
    
    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if event is still active and not in the past
    if (event.status !== 'active' || new Date(event.date) < new Date()) {
      return res.status(400).json({ message: 'Event is not available for booking' });
    }
    
    // Calculate total tickets and amount
    let totalAmount = 0;
    let totalTickets = 0;
    
    const bookingTickets = {
      general: { quantity: 0, price: 0 },
      vip: { quantity: 0, price: 0 },
      premium: { quantity: 0, price: 0 }
    };
    
    // Process each ticket type
    Object.keys(tickets).forEach(type => {
      if (tickets[type] && tickets[type] > 0) {
        const quantity = parseInt(tickets[type]);
        const price = event.pricing[type] || 0;
        
        // Check availability
        if (quantity > event.availableTickets[type]) {
          throw new Error(`Not enough ${type} tickets available`);
        }
        
        bookingTickets[type] = { quantity, price };
        totalAmount += quantity * price;
        totalTickets += quantity;
      }
    });
    
    if (totalTickets === 0) {
      return res.status(400).json({ message: 'At least one ticket must be selected' });
    }
    
    // Generate unique booking reference
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
    const bookingReference = `BK${timestamp}${randomStr}`;
    
    console.log('Generated booking reference:', bookingReference);
    
    // Create booking
    const booking = new Booking({
      user: req.user.id,
      event: eventId,
      tickets: bookingTickets,
      totalAmount,
      attendeeInfo,
      paymentStatus: 'pending',
      bookingReference
    });
    
    console.log('Booking object before save:', {
      user: req.user.id,
      event: eventId,
      tickets: bookingTickets,
      totalAmount,
      attendeeInfo,
      bookingReference
    });
    
    console.log('Booking created successfully:', booking.bookingReference);
    
    await booking.save();
    
    console.log('Booking saved with reference:', booking.bookingReference);
    
    // Update event ticket availability
    Object.keys(bookingTickets).forEach(type => {
      if (bookingTickets[type].quantity > 0) {
        event.availableTickets[type] -= bookingTickets[type].quantity;
        event.soldTickets[type] += bookingTickets[type].quantity;
      }
    });
    
    await event.save();
    
    // Add booking to user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookings: booking._id }
    });
    
    await booking.populate('event', 'title date startTime venue');
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;