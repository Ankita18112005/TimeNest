import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Moon, Sun, User } from 'lucide-react';

const Navbar = () => {
  const { user, theme, toggleTheme, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to={user ? (user.isAdmin ? "/admin/dashboard" : "/dashboard") : "/"} className="navbar-brand">
          <Calendar size={28} color="var(--primary-accent)" />
          TimeNest
        </Link>
        <div className="navbar-nav">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {user ? (
            <>
              {user.isAdmin ? (
                <>
                  <Link to="/admin/dashboard" className="btn btn-ghost">Sessions</Link>
                  <Link to="/admin/payments" className="btn btn-ghost">Payments</Link>
                  <Link to="/admin/clients" className="btn btn-ghost">Clients</Link>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem', color: 'var(--primary-accent)', fontWeight: '600'}}>
                    <User size={18} />
                    Admin
                  </div>
                </>
              ) : (
                <Link to="/dashboard" className="btn btn-ghost" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <User size={18} />
                  {user.name}
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-outline" style={{padding: '0.5rem 1rem'}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
