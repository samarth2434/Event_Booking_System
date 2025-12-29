const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@eventhub.com',
      password: adminPassword,
      phone: '+1-555-0001',
      role: 'admin',
      isVerified: true
    });
    console.log('✅ Created admin user');

    // Create regular users
    const userPassword = await bcrypt.hash('user123', 10);
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'user@eventhub.com',
        password: userPassword,
        phone: '+1-555-0002',
        role: 'user',
        isVerified: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: userPassword,
        phone: '+1-555-0003',
        role: 'user',
        isVerified: true
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: userPassword,
        phone: '+1-555-0004',
        role: 'user',
        isVerified: true
      }
    ]);
    console.log('✅ Created regular users');

    // Create sample events
    const events = await Event.create([
      {
        title: 'Summer Music Festival 2024',
        description: 'Join us for the biggest music festival of the year featuring top artists from around the world. Experience three days of non-stop music, food, and entertainment.',
        category: 'festival',
        venue: {
          name: 'Central Park Amphitheater',
          address: '123 Park Avenue',
          city: 'New York',
          capacity: 5000
        },
        date: new Date('2024-07-15'),
        startTime: '18:00',
        endTime: '23:00',
        pricing: {
          general: 75,
          vip: 150,
          premium: 250
        },
        availableTickets: {
          general: 3000,
          vip: 500,
          premium: 200
        },
        soldTickets: {
          general: 1200,
          vip: 150,
          premium: 50
        },
        organizer: admin._id,
        featured: true,
        tags: ['music', 'festival', 'outdoor', 'summer'],
        status: 'active'
      },
      {
        title: 'Tech Conference 2024: Future of AI',
        description: 'Discover the latest trends in artificial intelligence and machine learning. Network with industry leaders and learn from expert speakers.',
        category: 'conference',
        venue: {
          name: 'Convention Center',
          address: '456 Business District',
          city: 'San Francisco',
          capacity: 1000
        },
        date: new Date('2024-08-20'),
        startTime: '09:00',
        endTime: '17:00',
        pricing: {
          general: 199,
          vip: 399,
          premium: 599
        },
        availableTickets: {
          general: 700,
          vip: 200,
          premium: 100
        },
        soldTickets: {
          general: 300,
          vip: 80,
          premium: 20
        },
        organizer: admin._id,
        featured: true,
        tags: ['technology', 'AI', 'conference', 'networking'],
        status: 'active'
      },
      {
        title: 'Broadway Musical: The Lion King',
        description: 'Experience the magic of Disney\'s The Lion King on Broadway. A spectacular musical that brings the African savanna to life.',
        category: 'theater',
        venue: {
          name: 'Minskoff Theatre',
          address: '200 W 45th St',
          city: 'New York',
          capacity: 1710
        },
        date: new Date('2024-06-30'),
        startTime: '20:00',
        endTime: '22:30',
        pricing: {
          general: 89,
          vip: 179,
          premium: 299
        },
        availableTickets: {
          general: 1200,
          vip: 400,
          premium: 110
        },
        soldTickets: {
          general: 800,
          vip: 200,
          premium: 50
        },
        organizer: admin._id,
        featured: false,
        tags: ['theater', 'musical', 'broadway', 'disney'],
        status: 'active'
      },
      {
        title: 'NBA Finals Game 7',
        description: 'Witness history in the making at the decisive Game 7 of the NBA Finals. The ultimate showdown between two championship teams.',
        category: 'sports',
        venue: {
          name: 'Madison Square Garden',
          address: '4 Pennsylvania Plaza',
          city: 'New York',
          capacity: 20000
        },
        date: new Date('2024-06-25'),
        startTime: '21:00',
        endTime: '23:30',
        pricing: {
          general: 299,
          vip: 599,
          premium: 999
        },
        availableTickets: {
          general: 15000,
          vip: 3000,
          premium: 1000
        },
        soldTickets: {
          general: 12000,
          vip: 2500,
          premium: 800
        },
        organizer: admin._id,
        featured: true,
        tags: ['sports', 'basketball', 'NBA', 'finals'],
        status: 'active'
      },
      {
        title: 'Cooking Workshop: Italian Cuisine',
        description: 'Learn to cook authentic Italian dishes from a professional chef. Hands-on workshop includes ingredients and recipes to take home.',
        category: 'workshop',
        venue: {
          name: 'Culinary Institute',
          address: '789 Chef Street',
          city: 'Los Angeles',
          capacity: 30
        },
        date: new Date('2024-07-05'),
        startTime: '14:00',
        endTime: '17:00',
        pricing: {
          general: 89,
          vip: 0,
          premium: 0
        },
        availableTickets: {
          general: 25,
          vip: 0,
          premium: 0
        },
        soldTickets: {
          general: 18,
          vip: 0,
          premium: 0
        },
        organizer: admin._id,
        featured: false,
        tags: ['cooking', 'workshop', 'italian', 'food'],
        status: 'active'
      },
      {
        title: 'Rock Concert: Electric Nights',
        description: 'Get ready to rock with the hottest bands in the city. An electrifying night of music that will leave you wanting more.',
        category: 'concert',
        venue: {
          name: 'The Fillmore',
          address: '1805 Geary Blvd',
          city: 'San Francisco',
          capacity: 1315
        },
        date: new Date('2024-08-10'),
        startTime: '20:00',
        endTime: '23:00',
        pricing: {
          general: 65,
          vip: 125,
          premium: 200
        },
        availableTickets: {
          general: 1000,
          vip: 250,
          premium: 65
        },
        soldTickets: {
          general: 600,
          vip: 100,
          premium: 25
        },
        organizer: admin._id,
        featured: false,
        tags: ['music', 'rock', 'concert', 'live'],
        status: 'active'
      }
    ]);
    console.log('✅ Created sample events');

    // Create sample bookings
    const bookings = await Booking.create([
      {
        user: users[0]._id,
        event: events[0]._id,
        tickets: {
          general: { quantity: 2, price: 75 },
          vip: { quantity: 0, price: 0 },
          premium: { quantity: 0, price: 0 }
        },
        totalAmount: 150,
        paymentStatus: 'completed',
        attendeeInfo: {
          name: 'John Doe',
          email: 'user@eventhub.com',
          phone: '+1-555-0002'
        },
        status: 'confirmed',
        bookingReference: 'BK' + Date.now() + 'A1'
      },
      {
        user: users[1]._id,
        event: events[1]._id,
        tickets: {
          general: { quantity: 1, price: 199 },
          vip: { quantity: 0, price: 0 },
          premium: { quantity: 0, price: 0 }
        },
        totalAmount: 199,
        paymentStatus: 'completed',
        attendeeInfo: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1-555-0003'
        },
        status: 'confirmed',
        bookingReference: 'BK' + Date.now() + 'B2'
      },
      {
        user: users[2]._id,
        event: events[2]._id,
        tickets: {
          general: { quantity: 0, price: 0 },
          vip: { quantity: 2, price: 179 },
          premium: { quantity: 0, price: 0 }
        },
        totalAmount: 358,
        paymentStatus: 'completed',
        attendeeInfo: {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+1-555-0004'
        },
        status: 'confirmed',
        bookingReference: 'BK' + Date.now() + 'C3'
      }
    ]);
    console.log('✅ Created sample bookings');

    // Update user bookings
    await User.findByIdAndUpdate(users[0]._id, { $push: { bookings: bookings[0]._id } });
    await User.findByIdAndUpdate(users[1]._id, { $push: { bookings: bookings[1]._id } });
    await User.findByIdAndUpdate(users[2]._id, { $push: { bookings: bookings[2]._id } });
    console.log('✅ Updated user bookings');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Credentials:');
    console.log('Admin: admin@eventhub.com / admin123');
    console.log('User: user@eventhub.com / user123');
    console.log('\n🚀 You can now start the application!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding function
seedData();