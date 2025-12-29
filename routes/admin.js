const express = require('express');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', [auth, admin], async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ status: 'active' });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ paymentStatus: 'completed' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    // Calculate total revenue
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
    
    // Get recent bookings
    const recentBookings = await Booking.find()
      .populate('event', 'title date')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get popular events
    const popularEvents = await Event.aggregate([
      {
        $addFields: {
          totalSold: {
            $add: ['$soldTickets.general', '$soldTickets.vip', '$soldTickets.premium']
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: 'organizer',
          foreignField: '_id',
          as: 'organizer'
        }
      },
      { $unwind: '$organizer' }
    ]);
    
    res.json({
      stats: {
        totalEvents,
        activeEvents,
        totalBookings,
        completedBookings,
        totalUsers,
        totalRevenue
      },
      recentBookings,
      popularEvents
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all events for admin
router.get('/events', [auth, admin], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.search) {
      query.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { 'venue.name': new RegExp(req.query.search, 'i') },
        { 'venue.city': new RegExp(req.query.search, 'i') }
      ];
    }
    
    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Event.countDocuments(query);
    
    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all bookings for admin
router.get('/bookings', [auth, admin], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.paymentStatus) {
      query.paymentStatus = req.query.paymentStatus;
    }
    
    const bookings = await Booking.find(query)
      .populate('event', 'title date venue')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all users for admin
router.get('/users', [auth, admin], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = { role: 'user' };
    
    if (req.query.search) {
      query.$or = [
        { name: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .populate('bookings')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;