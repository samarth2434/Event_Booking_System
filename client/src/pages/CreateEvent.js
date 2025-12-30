import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Clock, DollarSign, Tag, Image, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    venue: {
      name: '',
      address: '',
      city: '',
      capacity: ''
    },
    date: '',
    startTime: '',
    endTime: '',
    pricing: {
      general: '',
      vip: '',
      premium: ''
    },
    availableTickets: {
      general: '',
      vip: '',
      premium: ''
    },
    tags: '',
    images: []
  });

  const categories = [
    { value: 'concert', label: 'Concert' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'sports', label: 'Sports' },
    { value: 'theater', label: 'Theater' },
    { value: 'festival', label: 'Festival' },
    { value: 'other', label: 'Other' }
  ];

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'venue' || key === 'pricing' || key === 'availableTickets') {
          Object.keys(formData[key]).forEach(subKey => {
            submitData.append(`${key}.${subKey}`, formData[key][subKey]);
          });
        } else if (key === 'images') {
          formData.images.forEach(image => {
            submitData.append('images', image);
          });
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const response = await axios.post('/api/events', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Event created successfully!');
      navigate(`/events/${response.data._id}`);
    } catch (error) {
      console.error('Error creating event:', error);
      alert(error.response?.data?.message || 'Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '60px 0', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }} className="fade-in">
          <button
            onClick={() => navigate('/events')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: '#667eea',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '24px',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            Back to Events
          </button>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748'
          }}>
            Create New Event
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#718096',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Share your event with the world and start selling tickets
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '20px',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Tag size={20} />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Event Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Describe your event..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="music, live, entertainment"
                  />
                </div>
              </div>

              {/* Venue Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '20px',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MapPin size={20} />
                  Venue Information
                </h3>
                
                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Venue Name *</label>
                    <input
                      type="text"
                      name="venue.name"
                      value={formData.venue.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter venue name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="venue.city"
                      value={formData.venue.city}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Address *</label>
                    <input
                      type="text"
                      name="venue.address"
                      value={formData.venue.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter full address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Capacity *</label>
                    <input
                      type="number"
                      name="venue.capacity"
                      value={formData.venue.capacity}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Maximum attendees"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '20px',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Calendar size={20} />
                  Date & Time
                </h3>
                
                <div className="grid grid-cols-3" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Event Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start Time *</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Time *</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Tickets */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '20px',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <DollarSign size={20} />
                  Pricing & Tickets
                </h3>
                
                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '12px', color: '#4a5568' }}>
                      Ticket Prices ($)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">General Admission *</label>
                        <input
                          type="number"
                          name="pricing.general"
                          value={formData.pricing.general}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">VIP (Optional)</label>
                        <input
                          type="number"
                          name="pricing.vip"
                          value={formData.pricing.vip}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Premium (Optional)</label>
                        <input
                          type="number"
                          name="pricing.premium"
                          value={formData.pricing.premium}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '12px', color: '#4a5568' }}>
                      Available Tickets
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">General Admission *</label>
                        <input
                          type="number"
                          name="availableTickets.general"
                          value={formData.availableTickets.general}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Leave empty to use venue capacity"
                          min="1"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">VIP</label>
                        <input
                          type="number"
                          name="availableTickets.vip"
                          value={formData.availableTickets.vip}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Premium</label>
                        <input
                          type="number"
                          name="availableTickets.premium"
                          value={formData.availableTickets.premium}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '20px',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Image size={20} />
                  Event Images
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Upload Images (Max 5)</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="form-input"
                    accept="image/*"
                    multiple
                    style={{ padding: '12px' }}
                  />
                  <small style={{ color: '#718096', fontSize: '14px' }}>
                    Supported formats: JPG, PNG, GIF. Max size: 5MB per image.
                  </small>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{
                display: 'flex',
                gap: '12px',
                paddingTop: '24px',
                borderTop: '1px solid #e2e8f0'
              }}>
                <button
                  type="button"
                  onClick={() => navigate('/events')}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        marginRight: '8px'
                      }}></div>
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Create Event
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;