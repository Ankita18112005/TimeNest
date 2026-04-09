import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { format, isToday, isTomorrow, isBefore, isAfter, startOfToday } from 'date-fns';
import { Calendar, Clock, User, XCircle, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { user, allBookings, cancelBooking, addFreeEvent } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('upcoming'); // 'past', 'tomorrow', 'upcoming'
  const [showAddModal, setShowAddModal] = useState(false);
  const [freeEventData, setFreeEventData] = useState({ title: '', date: '', time: '' });

  useEffect(() => {
    if (!user || (!user.isAdmin && user.email !== 'user@admin.com')) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const today = startOfToday();

  const filteredBookings = allBookings.filter(b => {
    const bDate = new Date(b.date);
    if (filter === 'past') return isBefore(bDate, today);
    if (filter === 'tomorrow') return isTomorrow(bDate);
    if (filter === 'upcoming') return isAfter(bDate, today) || isToday(bDate);
    return true;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAddFreeEvent = (e) => {
    e.preventDefault();
    addFreeEvent({
      userName: freeEventData.title || 'Free Slot',
      userEmail: 'admin-manual',
      duration: 1,
      date: new Date(freeEventData.date).toISOString(),
      time: freeEventData.time,
    });
    setShowAddModal(false);
    setFreeEventData({ title: '', date: '', time: '' });
  };

  return (
    <div className="container fade-in">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Sessions Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage all booked sessions across the platform</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ display: 'flex', gap: '0.5rem' }}>
          <Plus size={20} /> Add Free Event
        </button>
      </div>

      <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {['past', 'tomorrow', 'upcoming'].map(tab => (
          <button
            key={tab}
            className={`btn ${filter === tab ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(tab)}
            style={{ textTransform: 'capitalize' }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="booking-list">
        {filteredBookings.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Calendar size={48} opacity={0.2} style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ color: 'var(--text-secondary)' }}>No sessions found for this category.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {booking.isManual ? <span className="status-badge" style={{ background: '#3b82f620', color: '#3b82f6' }}>Manual Event</span> : null}
                  {booking.userName}
                  {booking.status === 'Cancelled' ? <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>(Cancelled)</span> : null}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {booking.userEmail}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {format(new Date(booking.date), 'MMM d, yyyy')}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {booking.time} ({booking.duration}h)</span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ display: 'flex', gap: '0.25rem', padding: '0.5rem 1rem' }} onClick={() => alert('Reschedule flow triggered (Mock)')}>
                  <Clock size={16} /> Reschedule
                </button>
                {booking.status !== 'Cancelled' && (
                  <button 
                    className="btn btn-outline" 
                    style={{ display: 'flex', gap: '0.25rem', padding: '0.5rem 1rem', borderColor: '#ef4444', color: '#ef4444' }}
                    onClick={() => cancelBooking(booking.id)}
                  >
                    <XCircle size={16} /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Add Free Event</h3>
            <form onSubmit={handleAddFreeEvent}>
              <div className="input-group">
                <label className="input-label">Event Title / Name</label>
                <input type="text" className="input-field" required value={freeEventData.title} onChange={e => setFreeEventData({...freeEventData, title: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Date</label>
                <input type="date" className="input-field" required value={freeEventData.date} onChange={e => setFreeEventData({...freeEventData, date: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Time</label>
                <input type="time" className="input-field" required value={freeEventData.time} onChange={e => setFreeEventData({...freeEventData, time: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
