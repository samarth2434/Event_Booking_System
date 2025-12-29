#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 EventHub Setup Script');
console.log('========================\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  const envTemplate = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventbooking
JWT_SECRET=your_jwt_secret_key_here_${Math.random().toString(36).substring(7)}
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000`;
  
  fs.writeFileSync('.env', envTemplate);
  console.log('✅ .env file created');
} else {
  console.log('✅ .env file already exists');
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads', 'events');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Uploads directory created');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next Steps:');
console.log('1. Update your .env file with actual values');
console.log('2. Make sure MongoDB is running');
console.log('3. Run "npm run seed" to add sample data');
console.log('4. Run "npm run dev" to start the application');
console.log('\n🌐 The application will be available at:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend:  http://localhost:5000');
console.log('\n📧 Demo Credentials:');
console.log('   Admin: admin@eventhub.com / admin123');
console.log('   User:  user@eventhub.com / user123');
console.log('\n🚀 Happy coding!');