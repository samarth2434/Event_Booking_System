const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const fixAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@eventhub.com' });
    console.log('Deleted existing admin user');

    // Create new admin user (password will be hashed automatically by pre-save hook)
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@eventhub.com',
      password: 'admin123456', // This will be hashed by the pre-save hook
      phone: '1234567890',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ New admin user created successfully!');
    
    // Test password immediately
    const testPassword = await adminUser.comparePassword('admin123456');
    console.log('✅ Password test result:', testPassword);
    
    if (testPassword) {
      console.log('🎉 Admin login is ready!');
      console.log('Email: admin@eventhub.com');
      console.log('Password: admin123456');
    } else {
      console.log('❌ Password test failed');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAdmin();