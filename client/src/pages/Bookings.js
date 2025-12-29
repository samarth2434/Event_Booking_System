import React from 'react';
import { Ticket } from 'lucide-react';

const Bookings = () => {
  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '32px',
          color: '#2d3748'
        }}>
          My Bookings
        </h1>

        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: '#718096'
        }}>
          <Ticket size={64} style={{ margin: '0 auto 24px', opacity: 0.5 }} />
          <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>No Bookings Yet</h3>
          <p style={{ marginBottom: '24px' }}>
            You haven't booked any events yet. Start exploring amazing events!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bookings;