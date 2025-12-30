import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email });
      const result = await login(formData);
      console.log('Login result:', result);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'pulse 4s infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'pulse 6s infinite'
      }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '450px',
          margin: '0 auto'
        }}>
          <div className="card" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
          }}>
            <div className="card-body" style={{ padding: '50px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)'
                }}>
                  <Mail size={32} color="white" />
                </div>
                
                <h1 style={{
                  fontSize: '2.25rem',
                  fontWeight: '800',
                  marginBottom: '8px',
                  color: '#2d3748'
                }}>
                  Welcome Back
                </h1>
                <p style={{ 
                  color: '#718096',
                  fontSize: '16px'
                }}>
                  Sign in to your EventHub account
                </p>
              </div>

              <form onSubmit={onSubmit}>
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
                      placeholder="Enter your password"
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
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div style={{
                  textAlign: 'center',
                  paddingTop: '24px',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <p style={{ color: '#718096', marginBottom: '16px' }}>
                    Don't have an account?
                  </p>
                  <Link 
                    to="/register" 
                    className="btn btn-outline"
                    style={{
                      width: '100%',
                      color: '#667eea',
                      borderColor: '#667eea'
                    }}
                  >
                    Create Account
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Enhanced Demo Credentials */}
          <div className="card" style={{ 
            marginTop: '32px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div className="card-body" style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                </div>
                Demo Credentials
              </h3>
              <div style={{ fontSize: '14px', color: '#718096' }}>
                <div style={{ 
                  marginBottom: '12px',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                  borderRadius: '8px',
                  color: '#2d3748'
                }}>
                  <strong>Admin:</strong> admin@eventhub.com / admin123
                </div>
                <div style={{ 
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  color: 'white'
                }}>
                  <strong>User:</strong> user@eventhub.com / user123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;