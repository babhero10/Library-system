import React, { useState } from 'react';
import '../styles/ReservationPage.css';
import calendarIcon from '../assets/calendar.png';
import libraryImage from '../assets/library.jpg'; // or any reservation-related image

const ReservationPage = () => {
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [borrowDateError, setBorrowDateError] = useState('');
  const [returnDateError, setReturnDateError] = useState('');

  const handleReserve = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format

    // Reset error states
    setBorrowDateError('');
    setReturnDateError('');

    // Check if borrow date and return date are not empty
    if (!borrowDate || !returnDate) {
      if (!borrowDate) setBorrowDateError('Borrow date is required.');
      if (!returnDate) setReturnDateError('Return date is required.');
      return;
    }

    // Check if borrow date is not before today
    if (borrowDate < today) {
      setBorrowDateError('Borrow date cannot be in the past.');
      return;
    }

    // Check if return date is not before borrow date
    if (returnDate <= borrowDate) {
      setReturnDateError('Return date must be after the borrow date.');
      return;
    }

    // Check if return date is not before today
    if (returnDate < today) {
      setReturnDateError('Return date cannot be in the past.');
      return;
    }

    // If all checks pass, clear the error and proceed with reservation logic
    console.log('Reserved:', { borrowDate, returnDate });
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
        <label className="label-text borrow-label">Borrow Date:</label>
        <div className="input-box">
          <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
          <input
            type="date"
            value={borrowDate}
            onChange={(e) => setBorrowDate(e.target.value)}
            className="date-input"
            min={new Date().toISOString().split('T')[0]} // Min date set to today's date
            placeholder="Choose your borrow date"
          />
        </div>
        {borrowDateError && <div className="error-message">{borrowDateError}</div>}

        {/* Return Date */}
        <label className="label-text return-label">Return Date:</label>
        <div className="input-box return-box">
          <img src={calendarIcon} alt="Calendar" className="calendar-icon return-icon" />
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="date-input"
            min={new Date().toISOString().split('T')[0]} // Min date set to today's date
            placeholder="Choose your return date"
          />
        </div>
        {returnDateError && <div className="error-message">{returnDateError}</div>}

        <button className="reserve-button" onClick={handleReserve}>Reserve</button>
      </div>
    </div>
  );
};

export default ReservationPage;
