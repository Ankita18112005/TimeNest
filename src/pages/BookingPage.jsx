import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const BookingPage = () => {
  const [duration, setDuration] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const today = startOfToday();

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      navigate('/checkout', { 
        state: { 
          date: selectedDate, 
          time: selectedTime, 
          duration 
        } 
      });
    }
  };

  return (
    <div className="container fade-in">
      <div className="booking-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1>Book a Session</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Select duration, date and time for your session with me</p>
        </div>

        <div className="duration-selector">
          <button 
            className={`duration-btn ${duration === 1 ? 'active' : ''}`}
            onClick={() => setDuration(1)}
          >
            <Clock size={24} />
            1 Hour Session
          </button>
          <button 
            className={`duration-btn ${duration === 2 ? 'active' : ''}`}
            onClick={() => setDuration(2)}
          >
            <Clock size={24} />
            2 Hour Session
          </button>
        </div>

        <div className="calendar-section">
          {/* Calendar Box */}
          <div className="calendar-wrapper card">
            <div className="calendar-header">
              <button onClick={handlePrevMonth} className="calendar-nav-btn"><ChevronLeft /></button>
              <h3 style={{ margin: 0 }}>{format(currentDate, 'MMMM yyyy')}</h3>
              <button onClick={handleNextMonth} className="calendar-nav-btn"><ChevronRight /></button>
            </div>
            
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              
              {/* Fill empty spaces before 1st day of month */}
              {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {daysInMonth.map((date, i) => {
                const isDisabled = isBefore(date, today);
                const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
                
                return (
                  <div 
                    key={i} 
                    className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }
                    }}
                  >
                    {format(date, 'd')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots Box */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
            </h3>
            
            {selectedDate ? (
              <div className="time-slots">
                {timeSlots.map(time => (
                  <button 
                    key={time}
                    className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Please select a date from the calendar to see available times.
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', maxWidth: '300px', padding: '1rem' }}
            disabled={!selectedDate || !selectedTime}
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
