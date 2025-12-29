const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    let query = { status: 'active' };
    
    // Apply filters
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.city) {
      query['venue.city'] = new RegExp(req.query.city, 'i');
    }
    
    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ date: 1 })
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

// Get featured events
router.get('/featured', async (req, res) => {
  try {
    const events = await Event.find({ 
      status: 'active', 
      featured: true,
      date: { $gte: new Date() }
    })
    .populate('organizer', 'name email')
    .sort({ date: 1 })
    .limit(6);
    
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email phone');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
});

// Create event (Admin only)
router.post('/', [auth, admin, upload.array('images', 5)], async (req, res) => {
  try {
    const eventData = req.body;
    eventData.organizer = req.user.id;
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      eventData.images = req.files.map(file => `/uploads/events/${file.filename}`);
    }
    
    // Set available tickets equal to venue capacity initially
    eventData.availableTickets = {
      general: parseInt(eventData.availableTickets.general) || parseInt(eventData.venue.capacity),
      vip: eventData.availableTickets?.vip ? parseInt(eventData.availableTickets.vip) : 0,
      premium: eventData.availableTickets?.premium ? parseInt(eventData.availableTickets.premium) : 0
    };

    // Convert pricing to numbers
    eventData.pricing = {
      general: parseFloat(eventData.pricing.general),
      vip: eventData.pricing.vip ? parseFloat(eventData.pricing.vip) : 0,
      premium: eventData.pricing.premium ? parseFloat(eventData.pricing.premium) : 0
    };

    // Convert venue capacity to number
    eventData.venue.capacity = parseInt(eventData.venue.capacity);

    // Process tags
    if (eventData.tags && typeof eventData.tags === 'string') {
      eventData.tags = eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    const event = new Event(eventData);
    await event.save();
    
    await event.populate('organizer', 'name email');
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;