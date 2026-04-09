import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { Calendar, Clock, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, bookings } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container fade-in">
      <div className="dashboard-header">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Welcome, {user.name}!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your upcoming sessions and bookings.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/book')} style={{ display: 'flex', gap: '0.5rem' }}>
          <Plus size={20} />
          Book New Session
        </button>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={24} />
          Your Bookings
        </h2>

        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <Calendar size={48} opacity={0.2} style={{ margin: '0 auto 1rem auto' }} />
            <p>You don't have any bookings yet.</p>
            <button className="btn btn-outline" onClick={() => navigate('/book')} style={{ marginTop: '1rem' }}>
              Book your first session
            </button>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <div className="booking-item-details">
                  <h4>{booking.duration}-Hour Session</h4>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <Calendar size={14} />
                    {format(new Date(booking.date), 'MMMM d, yyyy')} &nbsp;•&nbsp;
                    <Clock size={14} />
                    {booking.time}
                  </p>
                </div>
                <div>
                  <span className="status-badge">{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
