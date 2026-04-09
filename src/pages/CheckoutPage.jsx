import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, time, duration } = location.state || {};

  const [step, setStep] = useState(1); // 1: Details, 2: Mock PayPal
  const [formData, setFormData] = useState({ name: '', email: '', requirements: '' });

  if (!date || !time) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompletePayment = () => {
    // In a real app we'd verify payment and create booking on server
    navigate('/success', { state: { ...formData, date, time, duration } });
  };

  return (
    <div className="container fade-in">
      <div className="checkout-container">
        
        {step === 1 && (
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Complete Booking Details</h2>
            
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
              <p><strong>Session:</strong> {duration} Hour{duration > 1 ? 's' : ''}</p>
              <p><strong>Date:</strong> {format(new Date(date), 'MMMM d, yyyy')}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>

            <form onSubmit={handleProceedToPayment}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="input-field" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className="input-field" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Requirements / Pre-session notes</label>
                <textarea 
                  name="requirements" 
                  className="input-field" 
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Proceed to Payment
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="card fade-in">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Payment</h2>
            <div className="paypal-mock">
              <div className="paypal-logo">
                Pay<span>Pal</span>
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>
                Total: ${duration === 1 ? '100.00' : '180.00'} USD
              </p>
              <p>You are paying in a demo environment.</p>
              
              <button onClick={handleCompletePayment} className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem', width: '100%', maxWidth: '300px' }}>
                Complete Purchase
              </button>
              
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem' }}>
                *This is exclusively a demo interaction. No real transaction occurs.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutPage;
