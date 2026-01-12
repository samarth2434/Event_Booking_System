import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  ArrowLeft,
  Download,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/bookings/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      toast.error('Booking not found');
      navigate('/bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={20} color="#48bb78" />;
      case 'pending': return <AlertCircle size={20} color="#ed8936" />;
      case 'cancelled': return <XCircle size={20} color="#e53e3e" />;
      default: return <AlertCircle size={20} color="#718096" />;
    }
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

  if (!booking) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2>Booking not found</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '60px 0', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/bookings')}
          className="btn btn-secondary"
          style={{ marginBottom: '32px' }}
        >
          <ArrowLeft size={18} />
          Back to Bookings
        </button>

        {/* Booking Header */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '24px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#2d3748'
                }}>
                  Booking Confirmation
                </h1>
                <p style={{ color: '#718096', fontSize: '16px' }}>
                  Booking ID: <span style={{ fontFamily: 'monospace', fontWeight: '500' }}>
                    {booking.bookingReference}
                  </span>
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: `${getStatusColor(booking.status)}20`,
                color: getStatusColor(booking.status),
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {getStatusIcon(booking.status)}
                {booking.status}
              </div>
            </div>

            {/* Event Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '24px',
              alignItems: 'center'
            }}>
              <div style={{
                height: '150px',
                background: booking.event.images && booking.event.images.length > 0 
                  ? `url(${booking.event.images[0]}) center/cover`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px'
              }}></div>

              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#2d3748'
                }}>
                  {booking.event.title}
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  color: '#718096'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} />
                    {formatDate(booking.event.date)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} />
                    {booking.event.startTime}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} />
                    {booking.event.venue.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Ticket size={16} />
                    {getTotalTickets(booking.tickets)} Tickets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Ticket Details */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                Ticket Details
              </h3>
            </div>
            <div className="card-body">
              {Object.keys(booking.tickets).map(type => {
                if (booking.tickets[type].quantity > 0) {
                  return (
                    <div key={type} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          textTransform: 'capitalize',
                          marginBottom: '4px'
                        }}>
                          {type} Ticket
                        </div>
                        <div style={{ fontSize: '14px', color: '#718096' }}>
                          Quantity: {booking.tickets[type].quantity}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#667eea'
                      }}>
                        ${(booking.tickets[type].quantity * booking.tickets[type].price).toFixed(2)}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#2d3748'
              }}>
                <span>Total Amount</span>
                <span>${booking.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Attendee Information */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                Attendee Information
              </h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <User size={18} color="#718096" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#718096' }}>Full Name</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>
                      {booking.attendeeInfo.name}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} color="#718096" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#718096' }}>Email</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>
                      {booking.attendeeInfo.email}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={18} color="#718096" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#718096' }}>Phone</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>
                      {booking.attendeeInfo.phone}
                    </div>
                  </div>
                </div>
              </div>

              {booking.status === 'confirmed' && (
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: '#f0fff4',
                  border: '1px solid #9ae6b4',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#38a169',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <CheckCircle size={16} />
                    Booking Confirmed
                  </div>
                  <p style={{
                    margin: '8px 0 0 0',
                    fontSize: '14px',
                    color: '#2f855a'
                  }}>
                    Your booking is confirmed! Please arrive 30 minutes before the event starts.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '32px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={18} />
            Print Ticket
          </button>
          
          <button
            onClick={() => navigate(`/events/${booking.event._id}`)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            View Event Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;