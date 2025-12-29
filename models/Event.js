const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['concert', 'conference', 'workshop', 'sports', 'theater', 'festival', 'other']
  },
  venue: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  pricing: {
    general: {
      type: Number,
      required: true
    },
    vip: {
      type: Number,
      default: 0
    },
    premium: {
      type: Number,
      default: 0
    }
  },
  images: [{
    type: String
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availableTickets: {
    general: {
      type: Number,
      required: true
    },
    vip: {
      type: Number,
      default: 0
    },
    premium: {
      type: Number,
      default: 0
    }
  },
  soldTickets: {
    general: {
      type: Number,
      default: 0
    },
    vip: {
      type: Number,
      default: 0
    },
    premium: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed', 'draft'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for search and filtering
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ date: 1, category: 1, 'venue.city': 1 });

module.exports = mongoose.model('Event', eventSchema);