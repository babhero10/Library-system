import React, { useState } from 'react';
import '../styles/ReservationPage.css';
import calendarIcon from '../assets/calendar.png';
import libraryImage from '../assets/library.jpg'; // or any reservation-related image

const ReservationPage = () => {
  const [ReserveDate, setReserveDate] = useState('');
  const [ReserveDateError, setReserveDateError] = useState('');


  const handleReserve = () => {
 
    // Reset error states
    setReserveDateError('');
 
    // Check if borrow date and return date are not empty
    if (!ReserveDate) {
      if (!ReserveDate) setReserveDateError('Reserve date is required.');
      return;
    }

      // If all checks pass, clear the error and proceed with reservation logic
    console.log('Reserved:', {ReserveDate});
    // Handle reservation logic here
  };

  return (
    <div className="reservation-container">
      <div className="reservation-image">
        <img src={libraryImage} alt="Library" />
      </div>

      <div className="reservation-form">
        <h1 className="reservation-title">Library System</h1>

        {/* Borrow Date */}
        <label className="label-text borrow-label">Reserve Date:</label>
        <div className="input-box">
          <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
          <input
            type="date"
            value={ReserveDate}
            onChange={(e) => setReserveDate(e.target.value)}
            className="date-input"
            placeholder="Choose your borrow date"
          />
        </div>
        {ReserveDateError && <div className="error-message">{ReserveDateError}</div>}

        {/* Return Date */}        
        <button className="reserve-button" onClick={handleReserve}>Reserve</button>
      </div>
    </div>
  );
};

export default ReservationPage;
