import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Users, Ticket, DollarSign, TrendingUp, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard');
      setStats(response.data.stats);
      setRecentBookings(response.data.recentBookings);
      setPopularEvents(response.data.popularEvents);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #667eea'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '50px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <Calendar size={16} />
              Admin Panel
            </div>
            
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              color: '#2d3748',
              lineHeight: '1.2'
            }}>
              Dashboard Overview
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#718096',
              marginTop: '8px'
            }}>
              Manage your events, bookings, and users from here
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/admin/events/create" className="btn btn-primary" style={{
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              boxShadow: '0 8px 25px rgba(72, 187, 120, 0.3)'
            }}>
              <Calendar size={20} />
              Create Event
            </Link>
            
            <Link to="/admin/events" className="btn btn-outline" style={{
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#667eea',
              borderColor: '#667eea'
            }}>
              Manage Events
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4" style={{ gap: '24px', marginBottom: '40px' }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Calendar size={24} color="white" />
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '4px',
                color: '#2d3748'
              }}>
                {stats.totalEvents || 0}
              </h3>
              <p style={{ color: '#718096', fontSize: '14px' }}>Total Events</p>
              <p style={{ color: '#38a169', fontSize: '12px', marginTop: '4px' }}>
                {stats.activeEvents || 0} Active
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Ticket size={24} color="white" />
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '4px',
                color: '#2d3748'
              }}>
                {stats.totalBookings || 0}
              </h3>
              <p style={{ color: '#718096', fontSize: '14px' }}>Total Bookings</p>
              <p style={{ color: '#38a169', fontSize: '12px', marginTop: '4px' }}>
                {stats.completedBookings || 0} Completed
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Users size={24} color="white" />
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '4px',
                color: '#2d3748'
              }}>
                {stats.totalUsers || 0}
              </h3>
              <p style={{ color: '#718096', fontSize: '14px' }}>Total Users</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <DollarSign size={24} color="white" />
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '4px',
                color: '#2d3748'
              }}>
                ${stats.totalRevenue || 0}
              </h3>
              <p style={{ color: '#718096', fontSize: '14px' }}>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '40px' }}>
          {/* Recent Bookings */}
          <div className="card">
            <div className="card-header">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0,
                  color: '#2d3748'
                }}>
                  Recent Bookings
                </h2>
                <Link to="/admin/bookings" className="btn btn-outline" style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  color: '#667eea',
                  borderColor: '#667eea'
                }}>
                  View All
                </Link>
              </div>
            </div>
            <div className="card-body">
              {recentBookings.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {recentBookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '4px',
                          color: '#2d3748'
                        }}>
                          {booking.event.title}
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          color: '#718096',
                          margin: 0
                        }}>
                          {booking.user.name} • {formatDate(booking.createdAt)}
                        </p>
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#667eea'
                      }}>
                        ${booking.totalAmount}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#718096', textAlign: 'center', padding: '20px' }}>
                  No recent bookings
                </p>
              )}
            </div>
          </div>

          {/* Popular Events */}
          <div className="card">
            <div className="card-header">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0,
                  color: '#2d3748'
                }}>
                  Popular Events
                </h2>
                <Link to="/admin/events" className="btn btn-outline" style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  color: '#667eea',
                  borderColor: '#667eea'
                }}>
                  View All
                </Link>
              </div>
            </div>
            <div className="card-body">
              {popularEvents.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {popularEvents.slice(0, 5).map((event) => (
                    <div key={event._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '4px',
                          color: '#2d3748'
                        }}>
                          {event.title}
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          color: '#718096',
                          margin: 0
                        }}>
                          {event.organizer.name} • {formatDate(event.date)}
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#38a169'
                      }}>
                        <TrendingUp size={16} />
                        {event.totalSold || 0} sold
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#718096', textAlign: 'center', padding: '20px' }}>
                  No events data available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#2d3748'
          }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-4" style={{ gap: '16px' }}>
            <Link to="/admin/events/create" className="card" style={{
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '24px' }}>
                <Calendar size={32} style={{ margin: '0 auto 12px', color: '#667eea' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  margin: 0
                }}>
                  Create Event
                </h3>
              </div>
            </Link>

            <Link to="/admin/events" className="card" style={{
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '24px' }}>
                <Eye size={32} style={{ margin: '0 auto 12px', color: '#38a169' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  margin: 0
                }}>
                  Manage Events
                </h3>
              </div>
            </Link>

            <Link to="/admin/bookings" className="card" style={{
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '24px' }}>
                <Ticket size={32} style={{ margin: '0 auto 12px', color: '#f6ad55' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  margin: 0
                }}>
                  View Bookings
                </h3>
              </div>
            </Link>

            <Link to="/admin/users" className="card" style={{
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '24px' }}>
                <Users size={32} style={{ margin: '0 auto 12px', color: '#e53e3e' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  margin: 0
                }}>
                  Manage Users
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;