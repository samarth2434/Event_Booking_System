const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking');
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@eventhub.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found!');
      console.log('Creating admin user...');
      
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@eventhub.com',
        password: 'admin123456',
        phone: '1234567890',
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user found:');
      console.log('- ID:', adminUser._id);
      console.log('- Name:', adminUser.name);
      console.log('- Email:', adminUser.email);
      console.log('- Role:', adminUser.role);
      console.log('- Created:', adminUser.createdAt);
      
      // Test password comparison
      const isPasswordValid = await adminUser.comparePassword('admin123456');
      console.log('- Password valid:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('🔧 Fixing password...');
        adminUser.password = 'admin123456';
        await adminUser.save();
        console.log('✅ Password updated!');
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdmin();