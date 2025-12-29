import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Clock, DollarSign, Users, ArrowLeft, Save, Upload, Image, Star, Tag } from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'concert',
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
    featured: false,
    tags: ''
  });

  const categories = [
    { value: 'concert', label: '🎵 Concert', color: '#e53e3e' },
    { value: 'conference', label: '💼 Conference', color: '#3182ce' },
    { value: 'workshop', label: '🛠️ Workshop', color: '#38a169' },
    { value: 'sports', label: '⚽ Sports', color: '#d69e2e' },
    { value: 'theater', label: '🎭 Theater', color: '#805ad5' },
    { value: 'festival', label: '🎉 Festival', color: '#dd6b20' },
    { value: 'other', label: '📋 Other', color: '#718096' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare form data
      const submitData = {
        ...formData,
        venue: {
          ...formData.venue,
          capacity: parseInt(formData.venue.capacity)
        },
        pricing: {
          general: parseFloat(formData.pricing.general),
          vip: formData.pricing.vip ? parseFloat(formData.pricing.vip) : 0,
          premium: formData.pricing.premium ? parseFloat(formData.pricing.premium) : 0
        },
        availableTickets: {
          general: parseInt(formData.availableTickets.general) || parseInt(formData.venue.capacity),
          vip: formData.availableTickets.vip ? parseInt(formData.availableTickets.vip) : 0,
          premium: formData.availableTickets.premium ? parseInt(formData.availableTickets.premium) : 0
        },
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      const response = await axios.post('/api/events', submitData);
      toast.success('🎉 Event created successfully!');
      navigate('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: 'calc(100vh - 140px)'
    }}>
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Enhanced Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px'
          }} className="fade-in">
            <button
              onClick={() => navigate('/admin/events')}
              className="btn btn-secondary"
              style={{
                padding: '12px 16px',
                borderRadius: '12px'
              }}
            >
              <ArrowLeft size={20} />
              Back
            </button>
            
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                <Calendar size={14} />
                Admin Panel
              </div>
              
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#2d3748',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Create New Event
              </h1>
              <p style={{
                color: '#718096',
                fontSize: '16px',
                margin: '8px 0 0 0'
              }}>
                Fill in the details to create an amazing event experience
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Event Information Card */}
            <div className="card slide-in-up" style={{ marginBottom: '32px' }}>
              <div className="card-header" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    <Calendar size={20} />
                  </div>
                  Event Information
                </h2>
              </div>
              <div className="card-body" style={{ padding: '40px' }}>
                <div className="grid grid-cols-2" style={{ gap: '24px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      <Tag size={16} style={{ marginRight: '8px' }} />
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter an exciting event title"
                      required
                      style={{
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                      required
                      style={{
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
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
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Describe your event in detail. What makes it special?"
                    required
                    style={{
                      minHeight: '120px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div className="grid grid-cols-2" style={{ gap: '24px' }}>
                  <div className="form-group">
                    <label className="form-label">Tags (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="music, live, entertainment, fun"
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
                    onMouseLeave={(e) => e.target.style.borderColor = '#e2e8f0'}
                    >
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <Star size={20} color={formData.featured ? '#ffd700' : '#718096'} />
                      <span className="form-label" style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                        Featured Event
                      </span>
                    </label>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="form-group">
                  <label className="form-label">
                    <Image size={16} style={{ marginRight: '8px' }} />
                    Event Image
                  </label>
                  <div style={{
                    border: '2px dashed #e2e8f0',
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center',
                    background: imagePreview ? 'transparent' : '#f8fafc',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {imagePreview ? (
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            borderRadius: '8px',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={48} color="#718096" style={{ marginBottom: '16px' }} />
                        <p style={{ color: '#718096', marginBottom: '16px' }}>
                          Click to upload event image or drag and drop
                        </p>
                        <p style={{ color: '#a0aec0', fontSize: '14px' }}>
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Venue & Schedule Card */}
            <div className="card slide-in-up" style={{ marginBottom: '32px', animationDelay: '0.1s' }}>
              <div className="card-header" style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    <MapPin size={20} />
                  </div>
                  Venue & Schedule
                </h2>
              </div>
              <div className="card-body" style={{ padding: '40px' }}>
                <div className="grid grid-cols-2" style={{ gap: '24px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={16} style={{ marginRight: '8px' }} />
                      Venue Name *
                    </label>
                    <input
                      type="text"
                      name="venue.name"
                      value={formData.venue.name}
                      onChange={handleChange}
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
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    name="venue.address"
                    value={formData.venue.address}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter full address"
                    required
                  />
                </div>

                <div className="grid grid-cols-4" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      <Users size={16} style={{ marginRight: '8px' }} />
                      Capacity *
                    </label>
                    <input
                      type="number"
                      name="venue.capacity"
                      value={formData.venue.capacity}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="100"
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={16} style={{ marginRight: '8px' }} />
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={16} style={{ marginRight: '8px' }} />
                      Start Time *
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={16} style={{ marginRight: '8px' }} />
                      End Time *
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Tickets Card */}
            <div className="card slide-in-up" style={{ marginBottom: '40px', animationDelay: '0.2s' }}>
              <div className="card-header" style={{
                background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
                color: 'white'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    <DollarSign size={20} />
                  </div>
                  Pricing & Tickets
                </h2>
              </div>
              <div className="card-body" style={{ padding: '40px' }}>
                <div className="grid grid-cols-3" style={{ gap: '32px' }}>
                  {/* General Tickets */}
                  <div style={{
                    padding: '24px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: '#2d3748',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        background: '#48bb78',
                        borderRadius: '50%'
                      }}></div>
                      General Tickets *
                    </h3>
                    <div className="form-group">
                      <label className="form-label">
                        <DollarSign size={16} style={{ marginRight: '8px' }} />
                        Price
                      </label>
                      <input
                        type="number"
                        name="pricing.general"
                        value={formData.pricing.general}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="50"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Available Tickets</label>
                      <input
                        type="number"
                        name="availableTickets.general"
                        value={formData.availableTickets.general}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Auto-filled from capacity"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* VIP Tickets */}
                  <div style={{
                    padding: '24px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: '#2d3748',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        background: '#f6ad55',
                        borderRadius: '50%'
                      }}></div>
                      VIP Tickets
                    </h3>
                    <div className="form-group">
                      <label className="form-label">
                        <DollarSign size={16} style={{ marginRight: '8px' }} />
                        Price
                      </label>
                      <input
                        type="number"
                        name="pricing.vip"
                        value={formData.pricing.vip}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="100"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Available Tickets</label>
                      <input
                        type="number"
                        name="availableTickets.vip"
                        value={formData.availableTickets.vip}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="20"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Premium Tickets */}
                  <div style={{
                    padding: '24px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #f0fff4 0%, #ffffff 100%)'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: '#2d3748',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        background: '#805ad5',
                        borderRadius: '50%'
                      }}></div>
                      Premium Tickets
                    </h3>
                    <div className="form-group">
                      <label className="form-label">
                        <DollarSign size={16} style={{ marginRight: '8px' }} />
                        Price
                      </label>
                      <input
                        type="number"
                        name="pricing.premium"
                        value={formData.pricing.premium}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="150"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Available Tickets</label>
                      <input
                        type="number"
                        name="availableTickets.premium"
                        value={formData.availableTickets.premium}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="10"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'flex-end',
              marginTop: '40px',
              animationDelay: '0.3s'
            }} className="slide-in-up">
              <button
                type="button"
                onClick={() => navigate('/admin/events')}
                className="btn btn-secondary"
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '700',
                  background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;