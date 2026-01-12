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
    console.log('Received form data:', req.body);
    
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      organizer: req.user.id,
      venue: {
        name: req.body['venue[name]'] || req.body.venue?.name,
        address: req.body['venue[address]'] || req.body.venue?.address,
        city: req.body['venue[city]'] || req.body.venue?.city,
        capacity: parseInt(req.body['venue[capacity]'] || req.body.venue?.capacity)
      },
      pricing: {
        general: parseFloat(req.body['pricing[general]'] || req.body.pricing?.general),
        vip: req.body['pricing[vip]'] || req.body.pricing?.vip ? parseFloat(req.body['pricing[vip]'] || req.body.pricing?.vip) : 0,
        premium: req.body['pricing[premium]'] || req.body.pricing?.premium ? parseFloat(req.body['pricing[premium]'] || req.body.pricing?.premium) : 0
      },
      availableTickets: {
        general: parseInt(req.body['availableTickets[general]'] || req.body.availableTickets?.general) || parseInt(req.body['venue[capacity]'] || req.body.venue?.capacity),
        vip: req.body['availableTickets[vip]'] || req.body.availableTickets?.vip ? parseInt(req.body['availableTickets[vip]'] || req.body.availableTickets?.vip) : 0,
        premium: req.body['availableTickets[premium]'] || req.body.availableTickets?.premium ? parseInt(req.body['availableTickets[premium]'] || req.body.availableTickets?.premium) : 0
      }
    };
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      eventData.images = req.files.map(file => `/uploads/events/${file.filename}`);
    }

    // Process tags
    if (req.body.tags && typeof req.body.tags === 'string') {
      eventData.tags = req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    console.log('Processed event data:', JSON.stringify(eventData, null, 2));

    const event = new Event(eventData);
    await event.save();
    
    await event.populate('organizer', 'name email');
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Update event (Admin only)
router.put('/:id', [auth, admin, upload.array('images', 5)], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const eventData = req.body;
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      eventData.images = req.files.map(file => `/uploads/events/${file.filename}`);
    }
    
    // Convert pricing to numbers if provided
    if (eventData.pricing) {
      eventData.pricing = {
        general: parseFloat(eventData.pricing.general),
        vip: eventData.pricing.vip ? parseFloat(eventData.pricing.vip) : event.pricing.vip,
        premium: eventData.pricing.premium ? parseFloat(eventData.pricing.premium) : event.pricing.premium
      };
    }

    // Convert venue capacity to number if provided
    if (eventData.venue && eventData.venue.capacity) {
      eventData.venue.capacity = parseInt(eventData.venue.capacity);
    }

    // Process tags if provided
    if (eventData.tags && typeof eventData.tags === 'string') {
      eventData.tags = eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true, runValidators: true }
    ).populate('organizer', 'name email');
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Delete event (Admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;