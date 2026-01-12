import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Clock, Users, Ticket, ArrowLeft, Plus, Minus, X } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState({
    general: 0,
    vip: 0,
    premium: 0
  });
  const [attendeeInfo, setAttendeeInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchEvent();
    if (user) {
      setAttendeeInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [id, user]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Event not found');
      navigate('/events');
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

  const isEventPast = () => {
    return event && new Date(event.date) < new Date();
  };

  const updateTicketQuantity = (type, change) => {
    setSelectedTickets(prev => {
      const newQuantity = Math.max(0, Math.min(prev[type] + change, event.availableTickets[type]));
      return { ...prev, [type]: newQuantity };
    });
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalAmount = () => {
    return Object.keys(selectedTickets).reduce((total, type) => {
      return total + (selectedTickets[type] * (event?.pricing[type] || 0));
    }, 0);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const totalTickets = getTotalTickets();
      if (totalTickets === 0) {
        toast.error('Please select at least one ticket');
        return;
      }

      const token = localStorage.getItem('token');
      const bookingData = {
        eventId: event._id,
        tickets: selectedTickets,
        attendeeInfo
      };

      const response = await axios.post('/api/bookings', bookingData, {
        headers: { 'x-auth-token': token }
      });

      toast.success('Booking created successfully!');
      setShowBookingModal(false);
      navigate(`/bookings/${response.data._id}`);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Error creating booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const openBookingModal = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
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

  if (!event) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2>Event not found</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          style={{ marginBottom: '24px' }}
        >
          <ArrowLeft size={18} />
          Back to Events
        </button>

        <div className="grid grid-cols-2" style={{ gap: '40px' }}>
          {/* Event Details */}
          <div>
            {/* Event Image */}
            <div style={{
              height: '400px',
              background: event.images && event.images.length > 0 
                ? `url(${event.images[0]}) center/cover`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              marginBottom: '24px'
            }}></div>

            {/* Event Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <span style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {event.category}
                </span>
                {event.featured && (
                  <span style={{
                    background: '#f6ad55',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    FEATURED
                  </span>
                )}
              </div>

              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#2d3748',
                lineHeight: '1.2'
              }}>
                {event.title}
              </h1>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '24px',
                color: '#718096'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Calendar size={20} />
                  <span style={{ fontSize: '16px' }}>{formatDate(event.date)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={20} />
                  <span style={{ fontSize: '16px' }}>{event.startTime} - {event.endTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={20} />
                  <span style={{ fontSize: '16px' }}>
                    {event.venue.name}, {event.venue.address}, {event.venue.city}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={20} />
                  <span style={{ fontSize: '16px' }}>Capacity: {event.venue.capacity}</span>
                </div>
              </div>

              <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#2d3748'
                }}>
                  About This Event
                </h3>
                <p style={{
                  color: '#718096',
                  lineHeight: '1.6'
                }}>
                  {event.description}
                </p>
              </div>

              {/* Organizer Info */}
              <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '8px'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#2d3748'
                }}>
                  Organized by
                </h3>
                <p style={{ color: '#718096' }}>
                  {event.organizer.name}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '20px' }}>
              <div className="card-header">
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: 0,
                  color: '#2d3748'
                }}>
                  {isEventPast() ? 'Event Ended' : 'Book Tickets'}
                </h2>
              </div>

              <div className="card-body">
                {isEventPast() ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#718096'
                  }}>
                    <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                    <p>This event has already ended.</p>
                  </div>
                ) : (
                  <>
                    {/* Ticket Types */}
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '16px',
                        color: '#2d3748'
                      }}>
                        Available Tickets
                      </h3>

                      {Object.keys(event.pricing).map(type => {
                        if (event.pricing[type] > 0) {
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
                                  color: '#2d3748',
                                  textTransform: 'capitalize'
                                }}>
                                  {type} Ticket
                                </div>
                                <div style={{
                                  fontSize: '14px',
                                  color: '#718096'
                                }}>
                                  ${event.pricing[type]} • {event.availableTickets[type]} available
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={openBookingModal}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      <Ticket size={18} />
                      Book Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
                  Book Tickets - {event.title}
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} style={{ padding: '24px' }}>
                {/* Ticket Selection */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
                    Select Tickets
                  </h3>
                  
                  {Object.keys(event.pricing).map(type => {
                    if (event.pricing[type] > 0) {
                      return (
                        <div key={type} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          marginBottom: '12px'
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
                              ${event.pricing[type]} • {event.availableTickets[type]} available
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button
                              type="button"
                              onClick={() => updateTicketQuantity(type, -1)}
                              disabled={selectedTickets[type] === 0}
                              style={{
                                width: '32px',
                                height: '32px',
                                border: '1px solid #e2e8f0',
                                background: selectedTickets[type] === 0 ? '#f8fafc' : 'white',
                                borderRadius: '4px',
                                cursor: selectedTickets[type] === 0 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Minus size={16} />
                            </button>
                            
                            <span style={{
                              minWidth: '24px',
                              textAlign: 'center',
                              fontSize: '16px',
                              fontWeight: '500'
                            }}>
                              {selectedTickets[type]}
                            </span>
                            
                            <button
                              type="button"
                              onClick={() => updateTicketQuantity(type, 1)}
                              disabled={selectedTickets[type] >= event.availableTickets[type]}
                              style={{
                                width: '32px',
                                height: '32px',
                                border: '1px solid #e2e8f0',
                                background: selectedTickets[type] >= event.availableTickets[type] ? '#f8fafc' : 'white',
                                borderRadius: '4px',
                                cursor: selectedTickets[type] >= event.availableTickets[type] ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Attendee Information */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
                    Attendee Information
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        value={attendeeInfo.name}
                        onChange={(e) => setAttendeeInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        value={attendeeInfo.phone}
                        onChange={(e) => setAttendeeInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      value={attendeeInfo.email}
                      onChange={(e) => setAttendeeInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                {getTotalTickets() > 0 && (
                  <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px' }}>
                      Booking Summary
                    </h3>
                    
                    {Object.keys(selectedTickets).map(type => {
                      if (selectedTickets[type] > 0) {
                        return (
                          <div key={type} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                          }}>
                            <span style={{ textTransform: 'capitalize' }}>
                              {selectedTickets[type]} x {type} Ticket
                            </span>
                            <span>${(selectedTickets[type] * event.pricing[type]).toFixed(2)}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                    
                    <div style={{
                      borderTop: '1px solid #e2e8f0',
                      paddingTop: '12px',
                      marginTop: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      <span>Total Amount</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={bookingLoading || getTotalTickets() === 0}
                    className="btn btn-primary"
                    style={{ flex: 2 }}
                  >
                    {bookingLoading ? (
                      <>
                        <div className="spinner" style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid transparent',
                          borderTop: '2px solid white',
                          marginRight: '8px'
                        }}></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Ticket size={18} />
                        Confirm Booking (${getTotalAmount().toFixed(2)})
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;