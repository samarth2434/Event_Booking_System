import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, phone, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await register({ name, email, phone, password });
      if (result.success) {
        toast.success('Registration successful! Welcome to EventHub!');
        navigate('/');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 0'
    }}>
      <div className="container">
        <div style={{
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div className="card">
            <div className="card-body" style={{ padding: '40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#2d3748'
                }}>
                  Join EventHub
                </h1>
                <p style={{ color: '#718096' }}>
                  Create your account to start booking amazing events
                </p>
              </div>

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} style={{ marginRight: '8px' }} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Mail size={16} style={{ marginRight: '8px' }} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone size={16} style={{ marginRight: '8px' }} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Lock size={16} style={{ marginRight: '8px' }} />
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={onChange}
                      className="form-input"
                      placeholder="Create a password (min. 6 characters)"
                      required
                      style={{ paddingRight: '48px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#718096'
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Lock size={16} style={{ marginRight: '8px' }} />
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onChange}
                      className="form-input"
                      placeholder="Confirm your password"
                      required
                      style={{ paddingRight: '48px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#718096'
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{
                    width: '100%',
                    marginBottom: '24px'
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div style={{
                  textAlign: 'center',
                  paddingTop: '24px',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <p style={{ color: '#718096', marginBottom: '16px' }}>
                    Already have an account?
                  </p>
                  <Link 
                    to="/login" 
                    className="btn btn-outline"
                    style={{
                      width: '100%',
                      color: '#667eea',
                      borderColor: '#667eea'
                    }}
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;