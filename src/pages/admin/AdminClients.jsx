import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Mail, Calendar as CalendarIcon } from 'lucide-react';

const AdminClients = () => {
  const { user, clients } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (!user.isAdmin && user.email !== 'user@admin.com')) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="container fade-in">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Registered Clients</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage all users registered in the application.</p>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Users size={24} style={{ color: 'var(--primary-accent)' }} />
          <h3 style={{ margin: 0 }}>Client Directory ({clients.length})</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {clients.map(client => (
            <div key={client.id} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', background: 'var(--bg-color)' }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>{client.name}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} /> {client.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CalendarIcon size={14} /> Joined: {client.joinDate}
                </span>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Total Sessions</span>
                <span style={{ background: 'var(--primary-accent)', color: 'white', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600' }}>
                  {client.totalSessions}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminClients;
