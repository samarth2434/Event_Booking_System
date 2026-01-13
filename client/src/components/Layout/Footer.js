import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
      color: 'white',
      marginTop: '80px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          padding: '60px 0 40px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <Calendar size={32} />
              <h3 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>
                EventHub
              </h3>
            </div>
            <p style={{
              color: '#cbd5e0',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Your premier destination for discovering and booking amazing events. 
              From concerts to conferences, we make event booking simple and secure.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} />
                <span style={{ color: '#cbd5e0' }}>gsamarth2004@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} />
                <span style={{ color: '#cbd5e0' }}>+91 9098860093</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'white'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link 
                to="/events" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Browse Events
              </Link>
              <Link 
                to="/events?category=concert" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Concerts
              </Link>
              <Link 
                to="/events?category=conference" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Conferences
              </Link>
              <Link 
                to="/events?category=sports" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Sports
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'white'
            }}>
              Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link 
                to="/help-center" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Help Center
              </Link>
              <Link 
                to="/support" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Support
              </Link>
              <Link 
                to="/contact" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Contact Us
              </Link>
              <Link 
                to="/privacy-policy" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                style={{
                  color: '#cbd5e0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'white'
            }}>
              Stay Updated
            </h4>
            <p style={{
              color: '#cbd5e0',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              Subscribe to get notified about new events and exclusive offers.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #4a5568',
          paddingTop: '20px',
          paddingBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            color: '#cbd5e0',
            fontSize: '14px',
            margin: 0
          }}>
            © 2024 EventHub. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link 
              to="/contact" 
              style={{
                color: '#cbd5e0',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
            >
              Facebook
            </Link>
            <Link 
              to="/contact" 
              style={{
                color: '#cbd5e0',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
            >
              Twitter
            </Link>
            <Link 
              to="/contact" 
              style={{
                color: '#cbd5e0',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e0'}
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;