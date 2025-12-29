import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, User, Mail, Phone, Ticket, Eye, Filter, Search } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'attended', label: 'Attended' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'All Payment Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
      params.append('page', page);
      params.append('limit', '10');

      const response = await axios.get(`/api/admin/bookings?${params}`);
      setBookings(response.data.bookings);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchBookings(1);
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`/api/admin/bookings/${bookingId}/status`, { status: newStatus });
      toast.success('Booking status updated successfully');
      fetchBookings(pagination.currentPage);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#38a169';
      case 'cancelled': return '#e53e3e';
      case 'attended': return '#667eea';
      default: return '#718096';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#38a169';
      case 'pending': return '#f6ad55';
      case 'failed': return '#e53e3e';
      case 'refunded': return '#718096';
      default: return '#718096';
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '32px',
          color: '#2d3748'
        }}>
          Manage Bookings
        </h1>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <div className="grid grid-cols-3" style={{ gap: '16px', alignItems: 'end' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Booking Status</label>
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

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Status</label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                  className="form-select"
                >
                  {paymentStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleSearch} className="btn btn-primary">
                  <Search size={18} />
                  Search
                </button>
                <button
                  onClick={() => {
                    setFilters({ status: '', paymentStatus: '' });
                    fetchBookings(1);
                  }}
                  className="btn btn-secondary"
                >
                  <Filter size={18} />
                  Clear
                </button>
              </div>
            </div>
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
            {loading ? 'Loading...' : `Showing ${bookings.length} of ${pagination.total} bookings`}
          </p>
        </div>

        {/* Bookings Table */}
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
        ) : bookings.length > 0 ? (
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
                      Booking Details
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Customer
                    </th>
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
                      Amount
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
                  {bookings.map((booking) => (
                    <tr key={booking._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#2d3748',
                            marginBottom: '4px'
                          }}>
                            {booking.bookingReference}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#718096'
                          }}>
                            {formatDate(booking.createdAt)}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#718096',
                            marginTop: '4px'
                          }}>
                            {Object.keys(booking.tickets).map(type => {
                              if (booking.tickets[type].quantity > 0) {
                                return `${booking.tickets[type].quantity} ${type}`;
                              }
                              return null;
                            }).filter(Boolean).join(', ')}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#2d3748',
                            marginBottom: '4px'
                          }}>
                            {booking.user.name}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#718096',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginBottom: '2px'
                          }}>
                            <Mail size={12} />
                            {booking.user.email}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#718096',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Phone size={12} />
                            {booking.attendeeInfo.phone}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#2d3748',
                            marginBottom: '4px'
                          }}>
                            {booking.event.title}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#718096',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Calendar size={12} />
                            {new Date(booking.event.date).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#667eea'
                        }}>
                          ${booking.totalAmount}
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid #e2e8f0',
                              fontSize: '12px',
                              fontWeight: '500',
                              color: getStatusColor(booking.status),
                              backgroundColor: 'white'
                            }}
                          >
                            {statusOptions.slice(1).map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '500',
                            color: getPaymentStatusColor(booking.paymentStatus),
                            backgroundColor: `${getPaymentStatusColor(booking.paymentStatus)}20`,
                            textAlign: 'center',
                            textTransform: 'uppercase'
                          }}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => window.open(`/bookings/${booking._id}`, '_blank')}
                          className="btn btn-outline"
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            color: '#667eea',
                            borderColor: '#667eea'
                          }}
                        >
                          <Eye size={14} />
                          View
                        </button>
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
            <Ticket size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '8px' }}>No Bookings Found</h3>
            <p>No bookings match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;