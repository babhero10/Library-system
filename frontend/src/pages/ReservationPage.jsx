import React, { useState } from 'react';
import '../styles/ReservationPage.css';
import calendarIcon from '../assets/calendar.png';
import libraryImage from '../assets/library.jpg';

const ReservationPage = () => {
  const [ReserveDate, setReserveDate] = useState('');
  const [ReserveDateError, setReserveDateError] = useState('');

  const handleReserve = () => {
    // Reset error states
    setReserveDateError('');

    // Check if reserve date is empty
    if (!ReserveDate) {
      setReserveDateError('Reserve date is required.');
      return;
    }

    // Validate reserve date is today or in the future
    const selectedDate = new Date(ReserveDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Clear time part

    if (selectedDate < today) {
      setReserveDateError('Reserve date cannot be in the past.');
      return;
    }

    // If all checks pass
    console.log('Reserved:', { ReserveDate });
    // Proceed with reservation logic here (e.g., send to backend)
  };

  return (
    <div className="reservation-container">
      <div className="reservation-image">
        <img src={libraryImage} alt="Library" />
      </div>

      <div className="reservation-form">
        <h1 className="reservation-title">Library System</h1>

        <label className="label-text borrow-label">Reserve Date:</label>
        <div className="input-box">
          <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
          <input
            type="date"
            value={ReserveDate}
            onChange={(e) => setReserveDate(e.target.value)}
            className="date-input"
            placeholder="Choose your reserve date"
          />
        </div>
        {ReserveDateError && <div className="error-message">{ReserveDateError}</div>}

        <button className="reserve-button" onClick={handleReserve}>Reserve</button>
      </div>
    </div>
  );
};

export default ReservationPage;
