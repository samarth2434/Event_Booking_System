import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Globe, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const [loading, setLoading] = useState(false);

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Partnerships' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'media', label: 'Media & Press' },
    { value: 'careers', label: 'Careers' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: [
        'EventHub Headquarters',
        'Tech Park, Sector 5',
        'Gurgaon, Haryana 122001',
        'India'
      ],
      color: '#667eea'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        'Main: +91 9098860093',
        'Support: +91 9098860093',
        'Sales: +91 9098860093',
        'Available 24/7'
      ],
      color: '#38a169'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'General: gsamarth2004@gmail.com',
        'Support: gsamarth2004@gmail.com',
        'Sales: gsamarth2004@gmail.com',
        'Press: gsamarth2004@gmail.com'
      ],
      color: '#f6ad55'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed',
        'IST (Indian Standard Time)'
      ],
      color: '#e53e3e'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', url: '/contact', color: '#1877f2' },
    { name: 'Twitter', url: '/contact', color: '#1da1f2' },
    { name: 'LinkedIn', url: '/contact', color: '#0077b5' },
    { name: 'Instagram', url: '/contact', color: '#e4405f' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '60px 0', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="fade-in">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '50px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <MessageSquare size={16} />
            Contact Us
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748',
            lineHeight: '1.2'
          }}>
            Get In
            <span className="gradient-text"> Touch</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-4" style={{ gap: '24px', marginBottom: '60px' }}>
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="card">
                <div className="card-body" style={{ textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: info.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#2d3748'
                  }}>
                    {info.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {info.details.map((detail, idx) => (
                      <p key={idx} style={{
                        color: '#718096',
                        margin: 0,
                        fontSize: '14px'
                      }}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2" style={{ gap: '60px' }}>
          {/* Contact Form */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Send us a Message
              </h2>
              <p style={{ color: '#718096', margin: '8px 0 0 0' }}>
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2" style={{ gap: '20px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '20px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        marginRight: '8px'
                      }}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            {/* Map Placeholder */}
            <div className="card" style={{ marginBottom: '24px' }}>
              <div style={{
                height: '250px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px 12px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={48} style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                    Find Us Here
                  </h3>
                  <p style={{ opacity: 0.9 }}>
                    Interactive map coming soon
                  </p>
                </div>
              </div>
              <div className="card-body">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>
                  EventHub Headquarters
                </h3>
                <p style={{ color: '#718096', marginBottom: '16px' }}>
                  Tech Park, Sector 5<br />
                  Gurgaon, Haryana 122001<br />
                  India
                </p>
                <button className="btn btn-outline" style={{ width: '100%' }}>
                  <MapPin size={16} />
                  Get Directions
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="card" style={{ marginBottom: '24px' }}>
              <div className="card-header">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                  Follow Us
                </h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      to={social.url}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px',
                        background: social.color,
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '500',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      <Globe size={16} style={{ marginRight: '8px' }} />
                      {social.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                  Why Choose EventHub?
                </h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#667eea',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Users size={20} color="white" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                        10,000+ Happy Customers
                      </h4>
                      <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                        Trusted by event organizers worldwide
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#38a169',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Clock size={20} color="white" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                        24/7 Support
                      </h4>
                      <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                        Round-the-clock customer assistance
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#f6ad55',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Globe size={20} color="white" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                        Global Reach
                      </h4>
                      <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                        Events in 50+ countries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;