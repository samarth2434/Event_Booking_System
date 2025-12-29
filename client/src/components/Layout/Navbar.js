import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, User, LogOut, Menu, X, Settings, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0'
        }}>
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '28px',
              fontWeight: '800',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Calendar size={32} />
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px'
          }} className="hidden md:flex">
            <Link 
              to="/events" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '8px 16px',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Browse Events
            </Link>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <Link 
                  to="/bookings" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    padding: '8px 16px',
                    borderRadius: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  My Bookings
                </Link>

                {user?.role === 'admin' && (
                  <>
                    <Link 
                      to="/admin" 
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'rgba(255, 215, 0, 0.2)',
                        border: '1px solid rgba(255, 215, 0, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 215, 0, 0.3)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 215, 0, 0.2)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Sparkles size={18} />
                      Admin Panel
                    </Link>
                  </>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <Link 
                    to="/profile" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={16} color="#667eea" />
                    </div>
                    <span style={{ fontSize: '15px' }}>{user?.name}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link 
                  to="/login" 
                  className="btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    color: '#667eea',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: '700',
                    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            style={{
              display: 'block',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            className="md:hidden"
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div style={{
            display: 'block',
            paddingBottom: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            marginTop: '20px',
            paddingTop: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            margin: '20px 0'
          }} className="md:hidden">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 20px' }}>
              <Link 
                to="/events" 
                onClick={() => setIsMenuOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: '600',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Browse Events
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    to="/bookings" 
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    My Bookings
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '600',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(255, 215, 0, 0.2)',
                        border: '1px solid rgba(255, 215, 0, 0.3)'
                      }}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link 
                    to="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'left',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: '700',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;