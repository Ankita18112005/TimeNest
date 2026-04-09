import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

const AdminPayments = () => {
  const { user, payments } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (!user.isAdmin && user.email !== 'user@admin.com')) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container fade-in">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Payments Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Overview of revenue and transaction history.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '50%' }}>
            <DollarSign size={32} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Total Revenue</p>
            <h2 style={{ margin: 0 }}>${totalRevenue.toLocaleString()}</h2>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '1rem', borderRadius: '50%' }}>
            <TrendingUp size={32} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Monthly Growth</p>
            <h2 style={{ margin: 0 }}>+15.2%</h2>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '1rem', borderRadius: '50%' }}>
            <Users size={32} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Paying Clients</p>
            <h2 style={{ margin: 0 }}>{new Set(payments.map(p => p.clientName)).size}</h2>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Transactions</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Transaction ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Client</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>#{payment.id}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{payment.clientName}</td>
                  <td style={{ padding: '1rem' }}>{payment.date}</td>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>${payment.amount}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="status-badge">{payment.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
