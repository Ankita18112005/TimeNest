import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [bookings, setBookings] = useState([]);
  
  // Admin mock data
  const [allBookings, setAllBookings] = useState([
    { id: '1', userName: 'John Doe', userEmail: 'john@example.com', duration: 1, date: new Date(Date.now() - 86400000).toISOString(), time: '10:00 AM', status: 'Completed' },
    { id: '2', userName: 'Alice Smith', userEmail: 'alice@example.com', duration: 2, date: new Date(Date.now() + 86400000).toISOString(), time: '02:00 PM', status: 'Confirmed' },
    { id: '3', userName: 'Bob Johnson', userEmail: 'bob@example.com', duration: 1, date: new Date(Date.now() + 172800000).toISOString(), time: '09:00 AM', status: 'Confirmed' }
  ]);

  const [clients, setClients] = useState([
    { id: 'c1', name: 'John Doe', email: 'john@example.com', joinDate: '2026-01-15', totalSessions: 3 },
    { id: 'c2', name: 'Alice Smith', email: 'alice@example.com', joinDate: '2026-02-20', totalSessions: 1 },
    { id: 'c3', name: 'Bob Johnson', email: 'bob@example.com', joinDate: '2026-03-05', totalSessions: 5 }
  ]);

  const [payments, setPayments] = useState([
    { id: 'p1', clientName: 'John Doe', amount: 100, date: '2026-04-01', status: 'Paid' },
    { id: 'p2', clientName: 'Alice Smith', amount: 180, date: '2026-04-05', status: 'Paid' },
    { id: 'p3', clientName: 'Bob Johnson', amount: 100, date: '2026-04-08', status: 'Paid' }
  ]);

  useEffect(() => {
    // Keep theme separated from user for now, but manage it globally
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = (email) => {
    const isAdmin = email === 'user@admin.com';
    setUser({ email, name: isAdmin ? 'Admin' : email.split('@')[0], isAdmin });
  };

  const register = (email, name) => {
    setUser({ email, name });
  };

  const logout = () => {
    setUser(null);
  };

  const addBooking = (booking) => {
    const newBooking = { ...booking, id: Date.now().toString(), status: 'Confirmed' };
    setBookings(prev => [...prev, newBooking]);
    setAllBookings(prev => [...prev, newBooking]);
  };

  const cancelBooking = (id) => {
    setAllBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  const rescheduleBooking = (id, newDate, newTime) => {
    setAllBookings(prev => prev.map(b => b.id === id ? { ...b, date: newDate, time: newTime } : b));
    setBookings(prev => prev.map(b => b.id === id ? { ...b, date: newDate, time: newTime } : b));
  };

  const addFreeEvent = (eventData) => {
    const newEvent = { ...eventData, id: Date.now().toString(), status: 'Free Event', isManual: true };
    setAllBookings(prev => [...prev, newEvent]);
  };

  const value = {
    user,
    theme,
    toggleTheme,
    login,
    register,
    logout,
    bookings,
    addBooking,
    allBookings,
    clients,
    payments,
    cancelBooking,
    rescheduleBooking,
    addFreeEvent
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
