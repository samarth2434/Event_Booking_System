const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const testAdminLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking');
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@eventhub.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found! Creating new admin...');
      
      // Create new admin with proper password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123456', salt);
      
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@eventhub.com',
        password: hashedPassword,
        phone: '1234567890',
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('✅ New admin user created with properly hashed password!');
      return;
    }

    console.log('✅ Admin user found:');
    console.log('- ID:', adminUser._id);
    console.log('- Name:', adminUser.name);
    console.log('- Email:', adminUser.email);
    console.log('- Role:', adminUser.role);
    
    // Test password comparison with different methods
    console.log('\n🔍 Testing password comparison:');
    
    // Method 1: Using the model's comparePassword method
    const isPasswordValid1 = await adminUser.comparePassword('admin123456');
    console.log('- Using model method:', isPasswordValid1);
    
    // Method 2: Direct bcrypt comparison
    const isPasswordValid2 = await bcrypt.compare('admin123456', adminUser.password);
    console.log('- Using bcrypt directly:', isPasswordValid2);
    
    // Check if password is properly hashed
    console.log('- Password starts with $2a$ or $2b$:', adminUser.password.startsWith('$2'));
    console.log('- Password length:', adminUser.password.length);
    
    if (!isPasswordValid1 || !isPasswordValid2) {
      console.log('\n🔧 Password comparison failed. Recreating admin with proper hash...');
      
      // Delete existing admin
      await User.findByIdAndDelete(adminUser._id);
      
      // Create new admin with proper password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123456', salt);
      
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@eventhub.com',
        password: hashedPassword,
        phone: '1234567890',
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('✅ Admin recreated with properly hashed password!');
      
      // Test the new admin
      const testPasswordValid = await newAdmin.comparePassword('admin123456');
      console.log('✅ New admin password test:', testPasswordValid);
    } else {
      console.log('✅ Admin password is working correctly!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testAdminLogin();