const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkAtlasConnection = async () => {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    console.log('URI:', process.env.MONGODB_URI);
    
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Check database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('📊 Database Name:', dbName);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections in database:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    // Count users
    const userCount = await User.countDocuments();
    console.log(`👥 Total users in database: ${userCount}`);
    
    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@eventhub.com' });
    if (adminUser) {
      console.log('✅ Admin user found in Atlas:');
      console.log(`  - ID: ${adminUser._id}`);
      console.log(`  - Name: ${adminUser.name}`);
      console.log(`  - Email: ${adminUser.email}`);
      console.log(`  - Role: ${adminUser.role}`);
      console.log(`  - Created: ${adminUser.createdAt}`);
    } else {
      console.log('❌ Admin user NOT found in Atlas database');
    }
    
    // List all users
    const allUsers = await User.find({}, 'name email role createdAt');
    console.log(`\n👥 All users in Atlas database (${allUsers.length}):`);
    allUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

checkAtlasConnection();