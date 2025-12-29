import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Clock, Users, Ticket, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

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
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error('Please login to book tickets');
                          navigate('/login');
                        } else {
                          toast.info('Booking functionality will be implemented');
                        }
                      }}
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
      </div>
    </div>
  );
};

export default EventDetails;