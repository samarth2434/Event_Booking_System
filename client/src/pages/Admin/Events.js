import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Users, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      params.append('page', page);
      params.append('limit', '10');

      const response = await axios.get(`/api/admin/events?${params}`);
      setEvents(response.data.events);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(1);
  };

  const handleStatusUpdate = async (eventId, newStatus) => {
    try {
      await axios.put(`/api/admin/events/${eventId}/status`, { status: newStatus });
      toast.success('Event status updated successfully');
      fetchEvents(pagination.currentPage);
    } catch (error) {
      console.error('Error updating event status:', error);
      toast.error('Failed to update event status');
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${eventId}`);
        toast.success('Event deleted successfully');
        fetchEvents(pagination.currentPage);
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#38a169';
      case 'draft': return '#718096';
      case 'cancelled': return '#e53e3e';
      case 'completed': return '#667eea';
      default: return '#718096';
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748'
          }}>
            Manage Events
          </h1>
          <Link to="/admin/events/create" className="btn btn-primary">
            <Plus size={18} />
            Create Event
          </Link>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-3" style={{ gap: '16px', alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Search Events</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="form-input"
                      placeholder="Search by title, venue, city..."
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
                  <label className="form-label">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="form-select"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary">
                    <Search size={18} />
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({ search: '', status: '' });
                      fetchEvents(1);
                    }}
                    className="btn btn-secondary"
                  >
                    <Filter size={18} />
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Results Summary */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <p style={{ color: '#718096' }}>
            {loading ? 'Loading...' : `Showing ${events.length} of ${pagination.total} events`}
          </p>
        </div>

        {/* Events Table */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #667eea'
            }}></div>
          </div>
        ) : events.length > 0 ? (
          <div className="card">
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Event
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Date & Venue
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Tickets
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '4px',
                            color: '#2d3748'
                          }}>
                            {event.title}
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#718096',
                            margin: 0
                          }}>
                            {event.category} • ${event.pricing.general}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          fontSize: '14px',
                          color: '#718096'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={14} />
                            {formatDate(event.date)}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={14} />
                            {event.venue.city}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '14px',
                          color: '#718096'
                        }}>
                          <Users size={14} />
                          {(event.soldTickets?.general || 0) + (event.soldTickets?.vip || 0) + (event.soldTickets?.premium || 0)} / {event.venue.capacity}
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <select
                          value={event.status}
                          onChange={(e) => handleStatusUpdate(event._id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: getStatusColor(event.status),
                            backgroundColor: 'white'
                          }}
                        >
                          {statusOptions.slice(1).map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <Link
                            to={`/events/${event._id}`}
                            className="btn btn-outline"
                            style={{
                              padding: '6px 12px',
                              fontSize: '12px',
                              color: '#667eea',
                              borderColor: '#667eea'
                            }}
                          >
                            <Edit size={14} />
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="btn btn-danger"
                            style={{
                              padding: '6px 12px',
                              fontSize: '12px'
                            }}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#718096'
          }}>
            <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '8px' }}>No Events Found</h3>
            <p style={{ marginBottom: '24px' }}>
              Create your first event to get started.
            </p>
            <Link to="/admin/events/create" className="btn btn-primary">
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;