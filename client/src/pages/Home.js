import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Play, Shield, Zap, Award, TrendingUp, Globe } from 'lucide-react';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0
  });

  useEffect(() => {
    fetchFeaturedEvents();
    fetchStats();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const response = await axios.get('/api/events/featured');
      setFeaturedEvents(response.data);
    } catch (error) {
      console.error('Error fetching featured events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats for now - you can implement actual API endpoint
      setStats({
        totalEvents: 150,
        totalUsers: 5000,
        totalBookings: 12000
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%), url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center/cover',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'pulse 4s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'pulse 6s infinite'
        }}></div>
        
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }} className="slide-in-up">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '32px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }} className="glass">
              <Star size={16} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                #1 Event Booking Platform
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: '800',
              marginBottom: '24px',
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Discover Amazing Events
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Near You
              </span>
            </h1>
            
            <p style={{
              fontSize: '1.375rem',
              marginBottom: '48px',
              opacity: '0.95',
              lineHeight: '1.7',
              maxWidth: '700px',
              margin: '0 auto 48px'
            }}>
              From electrifying concerts to inspiring conferences, find and book tickets 
              for the events that matter to you. Join thousands of event-goers who trust EventHub.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <Link 
                to="/events" 
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  color: '#667eea',
                  fontSize: '18px',
                  padding: '18px 36px',
                  fontWeight: '700',
                  boxShadow: '0 12px 40px rgba(255, 255, 255, 0.3)',
                  border: 'none'
                }}
              >
                <Calendar size={22} />
                Explore Events
              </Link>
              
              <button 
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontSize: '18px',
                  padding: '18px 36px',
                  fontWeight: '600'
                }}
              >
                <Play size={20} />
                Watch Demo
              </button>
            </div>

            {/* Stats Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stats.totalEvents}+
                </div>
                <div style={{ fontSize: '14px', opacity: '0.9', fontWeight: '500' }}>
                  Events Available
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stats.totalUsers.toLocaleString()}+
                </div>
                <div style={{ fontSize: '14px', opacity: '0.9', fontWeight: '500' }}>
                  Happy Users
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stats.totalBookings.toLocaleString()}+
                </div>
                <div style={{ fontSize: '14px', opacity: '0.9', fontWeight: '500' }}>
                  Tickets Booked
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section style={{ 
        padding: '120px 0', 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }} className="fade-in">
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
              <Zap size={16} />
              Why Choose EventHub
            </div>
            
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginBottom: '24px',
              color: '#2d3748',
              lineHeight: '1.2'
            }}>
              The Future of
              <span className="gradient-text"> Event Booking</span>
            </h2>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#718096',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Experience seamless event discovery and booking with cutting-edge technology 
              and unmatched user experience.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '50px' }}>
            <div style={{ textAlign: 'center' }} className="fade-in">
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
                transform: 'rotate(-5deg)'
              }}>
                <Calendar size={40} color="white" />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#2d3748'
              }}>
                Event Discovery
              </h3>
              <p style={{ 
                color: '#718096', 
                lineHeight: '1.7',
                fontSize: '16px'
              }}>
                Browse and discover amazing events by category, location, and date with our intuitive search and filtering system.
              </p>
            </div>

            <div style={{ textAlign: 'center' }} className="fade-in">
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                boxShadow: '0 20px 60px rgba(72, 187, 120, 0.3)',
                transform: 'rotate(5deg)'
              }}>
                <Shield size={40} color="white" />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#2d3748'
              }}>
                Easy Booking
              </h3>
              <p style={{ 
                color: '#718096', 
                lineHeight: '1.7',
                fontSize: '16px'
              }}>
                Simple and secure ticket booking process with instant confirmations and digital ticket delivery.
              </p>
            </div>

            <div style={{ textAlign: 'center' }} className="fade-in">
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                boxShadow: '0 20px 60px rgba(246, 173, 85, 0.3)',
                transform: 'rotate(-3deg)'
              }}>
                <Award size={40} color="white" />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#2d3748'
              }}>
                Event Management
              </h3>
              <p style={{ 
                color: '#718096', 
                lineHeight: '1.7',
                fontSize: '16px'
              }}>
                Create and manage your own events with our comprehensive event management tools and user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Events Section */}
      <section style={{ 
        padding: '120px 0', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '50px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <TrendingUp size={16} />
                Trending Now
              </div>
              
              <h2 style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#2d3748',
                lineHeight: '1.2'
              }}>
                Featured Events
              </h2>
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#718096',
                lineHeight: '1.6'
              }}>
                Don't miss these popular upcoming events
              </p>
            </div>
            <Link 
              to="/events" 
              className="btn btn-primary"
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              View All Events
              <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}>
              <div className="spinner" style={{
                width: '50px',
                height: '50px',
                border: '5px solid #e2e8f0',
                borderTop: '5px solid #667eea'
              }}></div>
            </div>
          ) : (
            <div className="grid grid-cols-3" style={{ gap: '40px' }}>
              {featuredEvents.length > 0 ? (
                featuredEvents.map((event, index) => (
                  <div 
                    key={event._id} 
                    className="card fade-in" 
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      height: '250px',
                      background: event.images && event.images.length > 0 
                        ? `url(${event.images[0]}) center/cover`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '20px 20px 0 0',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {event.category}
                      </div>
                      
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '700'
                      }}>
                        ${event.pricing.general}
                      </div>
                    </div>
                    
                    <div className="card-body" style={{ padding: '32px' }}>
                      <h3 style={{
                        fontSize: '1.375rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        color: '#2d3748',
                        lineHeight: '1.4'
                      }}>
                        {event.title}
                      </h3>
                      
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '24px',
                        color: '#718096',
                        fontSize: '14px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Calendar size={16} />
                          <span style={{ fontWeight: '500' }}>{formatDate(event.date)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Clock size={16} />
                          <span style={{ fontWeight: '500' }}>{event.startTime}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <MapPin size={16} />
                          <span style={{ fontWeight: '500' }}>{event.venue.city}</span>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/events/${event._id}`}
                        className="btn btn-primary"
                        style={{ 
                          width: '100%',
                          padding: '14px',
                          fontSize: '15px',
                          fontWeight: '600'
                        }}
                      >
                        View Details
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <Calendar size={64} style={{ margin: '0 auto 24px', opacity: 0.5 }} />
                  <h3 style={{ marginBottom: '12px', fontSize: '1.5rem', fontWeight: '600' }}>
                    No Featured Events
                  </h3>
                  <p style={{ fontSize: '16px' }}>
                    Check back soon for exciting upcoming events!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '32px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <Globe size={16} />
              Join Our Community
            </div>
            
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Ready to Discover Your
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Next Adventure?
              </span>
            </h2>
            
            <p style={{
              fontSize: '1.375rem',
              marginBottom: '48px',
              opacity: '0.95',
              lineHeight: '1.7',
              maxWidth: '600px',
              margin: '0 auto 48px'
            }}>
              Join thousands of event enthusiasts who trust EventHub for their entertainment needs.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/events" 
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  color: '#667eea',
                  fontSize: '18px',
                  padding: '18px 36px',
                  fontWeight: '700',
                  boxShadow: '0 12px 40px rgba(255, 255, 255, 0.3)'
                }}
              >
                <Calendar size={22} />
                Start Exploring
              </Link>
              
              <Link 
                to="/register" 
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontSize: '18px',
                  padding: '18px 36px',
                  fontWeight: '600'
                }}
              >
                <Users size={20} />
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;