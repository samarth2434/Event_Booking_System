import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Clock, Search, Filter, ChevronLeft, ChevronRight, Plus, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    date: searchParams.get('date') || ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'concert', label: 'Concerts' },
    { value: 'conference', label: 'Conferences' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'sports', label: 'Sports' },
    { value: 'theater', label: 'Theater' },
    { value: 'festival', label: 'Festivals' },
    { value: 'other', label: 'Other' }
  ];

  const fetchEvents = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.city) params.append('city', filters.city);
      if (filters.date) params.append('date', filters.date);
      params.append('page', page);
      params.append('limit', '12');

      const response = await axios.get(`/api/events?${params}`);
      setEvents(response.data.events);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/events/my-events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching my events:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Refresh both lists
        fetchMyEvents();
        fetchEvents();
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchMyEvents();
    }
  }, [searchParams, user, fetchEvents]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(1);
  };

  const handlePageChange = (page) => {
    fetchEvents(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isEventPast = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  return (
    <div style={{ 
      padding: '60px 0', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div className="container">
        {/* Enhanced Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }} className="fade-in">
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
            <Calendar size={16} />
            Discover Events
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748',
            lineHeight: '1.2'
          }}>
            Find Your Perfect
            <span className="gradient-text"> Event</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover amazing events happening near you and book your tickets instantly
          </p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-4" style={{ gap: '16px', alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Search Events</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="form-input"
                      placeholder="Search by title, venue..."
                      style={{ paddingLeft: '40px' }}
                    />
                    <Search 
                      size={18} 
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#718096'
                      }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="form-select"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="form-input"
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0'
              }}>
                <button type="submit" className="btn btn-primary">
                  <Search size={18} />
                  Search Events
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ search: '', category: '', city: '', date: '' });
                    setSearchParams({});
                  }}
                  className="btn btn-secondary"
                >
                  <Filter size={18} />
                  Clear Filters
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Summary and Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <p style={{ color: '#718096' }}>
              {loading ? 'Loading...' : `Showing ${events.length} of ${pagination.total} events`}
            </p>
            
            {user && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setShowMyEvents(!showMyEvents)}
                  className={`btn ${showMyEvents ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '14px' }}
                >
                  <User size={16} />
                  {showMyEvents ? 'All Events' : 'My Events'} ({myEvents.length})
                </button>
              </div>
            )}
          </div>
          
          {user && (
            <Link to="/create-event" className="btn btn-primary">
              <Plus size={18} />
              Add New Event
            </Link>
          )}
        </div>

        {/* Events Grid */}
        {loading ? (
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
        ) : (showMyEvents ? myEvents : events).length > 0 ? (
          <>
            <div className="grid grid-cols-3" style={{ gap: '24px', marginBottom: '40px' }}>
              {(showMyEvents ? myEvents : events).map((event) => (
                <div key={event._id} className="card" style={{
                  opacity: isEventPast(event.date) ? 0.7 : 1
                }}>
                  <div style={{
                    height: '200px',
                    background: event.images && event.images.length > 0 
                      ? `url(${event.images[0]}) center/cover`
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px 12px 0 0',
                    position: 'relative'
                  }}>
                    {isEventPast(event.date) && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        Past Event
                      </div>
                    )}
                    
                    {showMyEvents && user && event.organizer._id === user.id && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        Your Event
                      </div>
                    )}
                  </div>
                  
                  <div className="card-body">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <span style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                      }}>
                        {event.category}
                      </span>
                      {event.featured && (
                        <span style={{
                          background: '#f6ad55',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          FEATURED
                        </span>
                      )}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#2d3748',
                      lineHeight: '1.4'
                    }}>
                      {event.title}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginBottom: '16px',
                      color: '#718096',
                      fontSize: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} />
                        {formatDate(event.date)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={14} />
                        {event.startTime}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={14} />
                        {event.venue.name}, {event.venue.city}
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '1.125rem',
                          fontWeight: '700',
                          color: '#667eea'
                        }}>
                          ${event.pricing.general}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          color: '#718096',
                          marginLeft: '4px'
                        }}>
                          onwards
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link 
                          to={`/events/${event._id}`}
                          className="btn btn-primary"
                          style={{ 
                            padding: '8px 16px', 
                            fontSize: '14px',
                            opacity: isEventPast(event.date) ? 0.6 : 1,
                            pointerEvents: isEventPast(event.date) ? 'none' : 'auto'
                          }}
                        >
                          {isEventPast(event.date) ? 'Event Ended' : 'View Details'}
                        </Link>
                        
                        {showMyEvents && user && event.organizer._id === user.id && (
                          <button
                            onClick={() => handleDeleteEvent(event._id)}
                            className="btn btn-danger"
                            style={{ 
                              padding: '8px 12px', 
                              fontSize: '14px',
                              background: '#e53e3e',
                              borderColor: '#e53e3e'
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - only show for all events, not my events */}
            {!showMyEvents && pagination.totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}>
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px' }}
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn ${page === pagination.currentPage ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '8px 12px', minWidth: '40px' }}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px' }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#718096'
          }}>
            <Calendar size={64} style={{ margin: '0 auto 24px', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>
              {showMyEvents ? 'No Events Created Yet' : 'No Events Found'}
            </h3>
            <p style={{ marginBottom: '24px' }}>
              {showMyEvents 
                ? 'You haven\'t created any events yet. Click "Add New Event" to get started!'
                : 'Try adjusting your search criteria or check back later for new events.'
              }
            </p>
            {showMyEvents ? (
              <Link to="/create-event" className="btn btn-primary">
                <Plus size={18} />
                Create Your First Event
              </Link>
            ) : (
              <button
                onClick={() => {
                  setFilters({ search: '', category: '', city: '', date: '' });
                  setSearchParams({});
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;