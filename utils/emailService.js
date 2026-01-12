const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || `EventHub <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Welcome to EventHub! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to EventHub!</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #2d3748;">Hi ${userName}! 👋</h2>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Thank you for joining EventHub! We're excited to have you as part of our community.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">What you can do now:</h3>
              <ul style="color: #4a5568;">
                <li>🎫 Browse and book tickets for amazing events</li>
                <li>🎪 Create and manage your own events</li>
                <li>📱 Get booking confirmations and reminders</li>
                <li>👥 Connect with other event enthusiasts</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CLIENT_URL}/events" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; padding: 15px 30px; text-decoration: none; 
                        border-radius: 8px; font-weight: bold; display: inline-block;">
                Start Exploring Events
              </a>
            </div>
            
            <p style="color: #718096; font-size: 14px; text-align: center;">
              Happy event hunting!<br>
              The EventHub Team
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send booking confirmation email
const sendBookingConfirmationEmail = async (booking, event, user) => {
  try {
    const transporter = createTransporter();
    
    const totalTickets = Object.values(booking.tickets).reduce((sum, ticket) => sum + (ticket.quantity || 0), 0);
    
    const ticketDetails = Object.keys(booking.tickets)
      .filter(type => booking.tickets[type].quantity > 0)
      .map(type => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-transform: capitalize;">${type} Ticket</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${booking.tickets[type].quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${(booking.tickets[type].quantity * booking.tickets[type].price).toFixed(2)}</td>
        </tr>
      `).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM || `EventHub <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Booking Confirmed - ${event.title} 🎫`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Booking Confirmed! ✅</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #2d3748;">Hi ${user.name}!</h2>
            
            <p style="color: #4a5568; font-size: 16px;">
              Great news! Your booking has been confirmed. Here are your ticket details:
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #48bb78;">
              <h3 style="color: #2d3748; margin-top: 0;">${event.title}</h3>
              <p style="color: #4a5568; margin: 5px 0;"><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p style="color: #4a5568; margin: 5px 0;"><strong>🕐 Time:</strong> ${event.startTime}</p>
              <p style="color: #4a5568; margin: 5px 0;"><strong>📍 Venue:</strong> ${event.venue.name}, ${event.venue.city}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d3748; margin-top: 0;">Ticket Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f7fafc;">
                    <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #e2e8f0;">Ticket Type</th>
                    <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #e2e8f0;">Quantity</th>
                    <th style="padding: 12px 8px; text-align: right; border-bottom: 2px solid #e2e8f0;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${ticketDetails}
                  <tr style="background: #f7fafc; font-weight: bold;">
                    <td style="padding: 12px 8px; border-top: 2px solid #e2e8f0;">Total</td>
                    <td style="padding: 12px 8px; text-align: center; border-top: 2px solid #e2e8f0;">${totalTickets}</td>
                    <td style="padding: 12px 8px; text-align: right; border-top: 2px solid #e2e8f0; color: #48bb78;">$${booking.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #81e6d9;">
              <p style="margin: 0; color: #234e52;"><strong>📱 Booking Reference:</strong> ${booking.bookingReference}</p>
              <p style="margin: 5px 0 0 0; color: #234e52; font-size: 14px;">Please keep this reference number for your records.</p>
            </div>
            
            <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #fed7d7;">
              <p style="margin: 0; color: #742a2a;"><strong>⚠️ Important:</strong></p>
              <ul style="color: #742a2a; margin: 10px 0 0 0; padding-left: 20px;">
                <li>Please arrive 30 minutes before the event starts</li>
                <li>Bring a valid ID for verification</li>
                <li>Show this email or booking reference at the venue</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CLIENT_URL}/bookings/${booking._id}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; padding: 15px 30px; text-decoration: none; 
                        border-radius: 8px; font-weight: bold; display: inline-block;">
                View Booking Details
              </a>
            </div>
            
            <p style="color: #718096; font-size: 14px; text-align: center;">
              See you at the event!<br>
              The EventHub Team
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Test email connection
const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email service is ready to send emails');
    return { success: true };
  } catch (error) {
    console.error('❌ Email service error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendBookingConfirmationEmail,
  testEmailConnection
};