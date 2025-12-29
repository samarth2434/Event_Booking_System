import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '32px',
            color: '#2d3748'
          }}>
            My Profile
          </h1>

          <div className="card">
            <div className="card-body">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={32} color="white" />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: '#2d3748'
                  }}>
                    {user?.name}
                  </h2>
                  <p style={{ color: '#718096' }}>
                    {user?.role === 'admin' ? 'Administrator' : 'Event Enthusiast'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <Mail size={20} color="#718096" />
                  <span style={{ color: '#2d3748' }}>{user?.email}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <Phone size={20} color="#718096" />
                  <span style={{ color: '#2d3748' }}>{user?.phone || 'Not provided'}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0'
                }}>
                  <Calendar size={20} color="#718096" />
                  <span style={{ color: '#2d3748' }}>
                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;