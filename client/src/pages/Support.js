import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, Send, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Issues' },
    { value: 'payment', label: 'Payment Problems' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'refund', label: 'Refund Request' },
    { value: 'event', label: 'Event Information' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#38a169' },
    { value: 'medium', label: 'Medium', color: '#f6ad55' },
    { value: 'high', label: 'High', color: '#e53e3e' }
  ];

  const faqs = [
    {
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking up to 24 hours before the event. Go to 'My Bookings' and click the cancel button."
    },
    {
      question: "When will I receive my tickets?",
      answer: "Digital tickets are sent immediately after payment confirmation. Check your email and spam folder."
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer: "Yes, you can transfer tickets through your booking dashboard up to 2 hours before the event."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and digital wallets for secure payments."
    },
    {
      question: "How do I get a refund?",
      answer: "Refunds are processed according to the event's cancellation policy. Contact support for assistance."
    }
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
      
      toast.success('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'medium'
      });
    } catch (error) {
      toast.error('Failed to submit support ticket. Please try again.');
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
            <HelpCircle size={16} />
            Support Center
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748',
            lineHeight: '1.2'
          }}>
            How Can We
            <span className="gradient-text"> Help You?</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Get instant help or submit a support ticket. Our team is here to assist you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-3" style={{ gap: '40px', marginBottom: '60px' }}>
          {/* Contact Methods */}
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <Mail size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>
                Email Support
              </h3>
              <p style={{ color: '#718096', marginBottom: '20px' }}>
                Get detailed help via email
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#667eea' }}>
                gsamarth2004@gmail.com
              </p>
              <p style={{ fontSize: '14px', color: '#718096', marginTop: '8px' }}>
                Response within 2-4 hours
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <Phone size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>
                Phone Support
              </h3>
              <p style={{ color: '#718096', marginBottom: '20px' }}>
                Speak directly with our team
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#38a169' }}>
                +91 9098860093
              </p>
              <p style={{ fontSize: '14px', color: '#718096', marginTop: '8px' }}>
                Mon-Fri, 9 AM - 6 PM IST
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <MessageCircle size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>
                Live Chat
              </h3>
              <p style={{ color: '#718096', marginBottom: '20px' }}>
                Instant help via live chat
              </p>
              <button className="btn btn-primary" style={{ marginTop: '8px' }}>
                Start Chat
              </button>
              <p style={{ fontSize: '14px', color: '#718096', marginTop: '8px' }}>
                Average response: 2 minutes
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '40px' }}>
          {/* Support Form */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Submit Support Ticket
              </h2>
              <p style={{ color: '#718096', margin: '8px 0 0 0' }}>
                Describe your issue and we'll get back to you soon
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
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
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
                    placeholder="Brief description of your issue"
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
                    placeholder="Please provide detailed information about your issue..."
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Ticket
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <div className="card-header">
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {faqs.map((faq, index) => (
                    <div key={index} style={{
                      padding: '20px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#2d3748'
                      }}>
                        {faq.question}
                      </h4>
                      <p style={{
                        color: '#718096',
                        margin: 0,
                        lineHeight: '1.5'
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Clock size={24} color="#667eea" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                    Response Times
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#718096' }}>Email Support</span>
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>2-4 hours</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#718096' }}>Live Chat</span>
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>2 minutes</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#718096' }}>Phone Support</span>
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>Immediate</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#718096' }}>High Priority</span>
                    <span style={{ fontWeight: '600', color: '#e53e3e' }}>1 hour</span>
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

export default Support;