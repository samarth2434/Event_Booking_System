import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Ticket, Calendar, MapPin, Clock, Eye } from 'lucide-react';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bookings/my-bookings', {
        headers: { 'x-auth-token': token }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#48bb78';
      case 'pending': return '#ed8936';
      case 'cancelled': return '#e53e3e';
      default: return '#718096';
    }
  };

  const getTotalTickets = (tickets) => {
    return Object.values(tickets).reduce((sum, ticket) => sum + (ticket.quantity || 0), 0);
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
    <div style={{ 
      padding: '60px 0', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }} className="fade-in">
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
            <Ticket size={16} />
            My Bookings
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748',
            lineHeight: '1.2'
          }}>
            Your Event
            <span className="gradient-text"> Bookings</span>
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#718096',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Manage and view all your event bookings in one place
          </p>
        </div>

        {bookings.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#718096'
          }}>
            <Ticket size={64} style={{ margin: '0 auto 24px', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>No Bookings Yet</h3>
            <p style={{ marginBottom: '24px' }}>
              You haven't booked any events yet. Start exploring amazing events!
            </p>
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '24px' }}>
            {bookings.map((booking) => (
              <div key={booking._id} className="card">
                <div className="card-body">
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr auto',
                    gap: '24px',
                    alignItems: 'center'
                  }}>
                    {/* Event Image */}
                    <div style={{
                      height: '120px',
                      background: booking.event.images && booking.event.images.length > 0 
                        ? `url(${booking.event.images[0]}) center/cover`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '8px'
                    }}></div>

                    {/* Booking Details */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                      }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          margin: 0,
                          color: '#2d3748'
                        }}>
                          {booking.event.title}
                        </h3>
                        <span style={{
                          background: getStatusColor(booking.status),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {booking.status}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        color: '#718096',
                        fontSize: '14px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={14} />
                          {formatDate(booking.event.date)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={14} />
                          {booking.event.startTime}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin size={14} />
                          {booking.event.venue.name}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px'
                      }}>
                        <div>
                          <span style={{ color: '#718096' }}>Tickets: </span>
                          <span style={{ fontWeight: '500' }}>{getTotalTickets(booking.tickets)}</span>
                        </div>
                        <div>
                          <span style={{ color: '#718096' }}>Total: </span>
                          <span style={{ fontWeight: '600', color: '#667eea' }}>
                            ${booking.totalAmount.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span style={{ color: '#718096' }}>Booking ID: </span>
                          <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>
                            {booking.bookingReference}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <Link
                        to={`/bookings/${booking._id}`}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Eye size={16} />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;