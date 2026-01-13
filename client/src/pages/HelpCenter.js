import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, CreditCard, Calendar, Users, Settings, ChevronRight, Star, ThumbsUp } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book, color: '#667eea' },
    { id: 'booking', name: 'Booking & Tickets', icon: Calendar, color: '#38a169' },
    { id: 'payment', name: 'Payments & Refunds', icon: CreditCard, color: '#f6ad55' },
    { id: 'account', name: 'Account Management', icon: Users, color: '#e53e3e' },
    { id: 'events', name: 'Events & Venues', icon: Calendar, color: '#9f7aea' },
    { id: 'technical', name: 'Technical Support', icon: Settings, color: '#38b2ac' }
  ];

  const articles = [
    {
      id: 1,
      title: 'How to Book Event Tickets',
      category: 'booking',
      description: 'Step-by-step guide to booking tickets for events on EventHub',
      readTime: '3 min read',
      helpful: 245,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Payment Methods and Security',
      category: 'payment',
      description: 'Learn about accepted payment methods and security measures',
      readTime: '5 min read',
      helpful: 189,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Managing Your Account Profile',
      category: 'account',
      description: 'How to update your profile information and preferences',
      readTime: '2 min read',
      helpful: 156,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Event Cancellation and Refunds',
      category: 'payment',
      description: 'Understanding our refund policy and cancellation process',
      readTime: '4 min read',
      helpful: 298,
      rating: 4.6
    },
    {
      id: 5,
      title: 'Digital Tickets and QR Codes',
      category: 'booking',
      description: 'How to access and use your digital tickets',
      readTime: '3 min read',
      helpful: 167,
      rating: 4.8
    },
    {
      id: 6,
      title: 'Troubleshooting Login Issues',
      category: 'technical',
      description: 'Common login problems and their solutions',
      readTime: '4 min read',
      helpful: 134,
      rating: 4.5
    },
    {
      id: 7,
      title: 'Finding Events Near You',
      category: 'events',
      description: 'Tips for discovering events in your area',
      readTime: '2 min read',
      helpful: 203,
      rating: 4.7
    },
    {
      id: 8,
      title: 'Group Booking Discounts',
      category: 'booking',
      description: 'How to get discounts for group bookings',
      readTime: '3 min read',
      helpful: 178,
      rating: 4.6
    }
  ];

  const quickHelp = [
    {
      question: 'How do I cancel my booking?',
      answer: 'You can cancel your booking up to 24 hours before the event through your booking dashboard.'
    },
    {
      question: 'When will I receive my tickets?',
      answer: 'Digital tickets are sent immediately after payment confirmation to your registered email.'
    },
    {
      question: 'Can I change my ticket type?',
      answer: 'Ticket type changes are subject to availability and may incur additional charges.'
    },
    {
      question: 'What if the event is cancelled?',
      answer: 'If an event is cancelled, you will receive a full refund within 5-7 business days.'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <Book size={16} />
            Help Center
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
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Find answers to common questions and get detailed guides
          </p>

          {/* Search Bar */}
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 50px 16px 20px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '50px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#718096'
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '40px' }}>
          <div className="grid grid-cols-6" style={{ gap: '16px' }}>
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '20px',
                    background: isActive ? category.color : 'white',
                    color: isActive ? 'white' : '#2d3748',
                    border: `2px solid ${isActive ? category.color : '#e2e8f0'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.borderColor = category.color;
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <Icon size={24} style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>
                    {category.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3" style={{ gap: '40px' }}>
          {/* Help Articles */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d3748' }}>
                Help Articles ({filteredArticles.length})
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredArticles.map((article) => (
                <div key={article.id} className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-body" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{
                            background: categories.find(c => c.id === article.category)?.color || '#667eea',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase'
                          }}>
                            {categories.find(c => c.id === article.category)?.name || 'General'}
                          </span>
                          <span style={{ fontSize: '14px', color: '#718096' }}>
                            {article.readTime}
                          </span>
                        </div>
                        
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#2d3748'
                        }}>
                          {article.title}
                        </h3>
                        
                        <p style={{
                          color: '#718096',
                          marginBottom: '16px',
                          lineHeight: '1.5'
                        }}>
                          {article.description}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={16} color="#f6ad55" fill="#f6ad55" />
                            <span style={{ fontSize: '14px', color: '#718096' }}>
                              {article.rating}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ThumbsUp size={16} color="#38a169" />
                            <span style={{ fontSize: '14px', color: '#718096' }}>
                              {article.helpful} helpful
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight size={20} color="#718096" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help */}
          <div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                  Quick Help
                </h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {quickHelp.map((item, index) => (
                    <div key={index}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#2d3748'
                      }}>
                        {item.question}
                      </h4>
                      <p style={{
                        color: '#718096',
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="card">
              <div className="card-body" style={{ textAlign: 'center', padding: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>
                  Still Need Help?
                </h3>
                <p style={{ color: '#718096', marginBottom: '20px' }}>
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
                  <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Contact Support
                  </Link>
                </button>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;