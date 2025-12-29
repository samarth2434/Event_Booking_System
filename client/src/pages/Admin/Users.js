import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Calendar, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      params.append('page', page);
      params.append('limit', '10');

      const response = await axios.get(`/api/admin/users?${params}`);
      setUsers(response.data.users);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
          Manage Users
        </h1>

        {/* Search */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-2" style={{ gap: '16px', alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Search Users</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input"
                      placeholder="Search by name or email..."
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

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary">
                    <Search size={18} />
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      fetchUsers(1);
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
            {loading ? 'Loading...' : `Showing ${users.length} of ${pagination.total} users`}
          </p>
        </div>

        {/* Users Table */}
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
        ) : users.length > 0 ? (
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
                      User
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Contact Information
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Bookings
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Joined
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <User size={20} color="white" />
                          </div>
                          <div>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#2d3748',
                              marginBottom: '2px'
                            }}>
                              {user.name}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: '#718096'
                            }}>
                              ID: {user._id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}>
                          <div style={{
                            fontSize: '14px',
                            color: '#2d3748',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <Mail size={14} />
                            {user.email}
                          </div>
                          <div style={{
                            fontSize: '14px',
                            color: '#718096',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <Phone size={14} />
                            {user.phone || 'Not provided'}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#667eea'
                        }}>
                          {user.bookings ? user.bookings.length : 0}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#718096'
                        }}>
                          total bookings
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{
                          fontSize: '14px',
                          color: '#718096',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Calendar size={14} />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: user.isVerified ? '#d4edda' : '#fff3cd',
                          color: user.isVerified ? '#155724' : '#856404'
                        }}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
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
            <User size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '8px' }}>No Users Found</h3>
            <p>No users match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;