// src/pages/ReservationPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ReservationPage.css';
// import calendarIcon from '../assets/calendar.png'; // You removed this import, make sure it's not needed or re-add if it is
import defaultLibraryImage from '../assets/image.png'; // Default image for the page background half

// Helper function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ReservationPage = () => {
  const query = useQuery();
  const bookId = query.get('bookId');
  const bookTitle = query.get('title');
  const bookCoverUrl = query.get('cover'); // Get the cover image URL

  const [reserveDate, setReserveDate] = useState('');
  const [reserveDateError, setReserveDateError] = useState('');

  useEffect(() => {
    if (bookId && bookTitle) {
      console.log('Reserving book - ID:', bookId, 'Title:', bookTitle, 'Cover:', bookCoverUrl);
    } else {
      console.log('No book information passed to reservation page.');
    }
  }, [bookId, bookTitle, bookCoverUrl]);

  const handleReserve = (e) => {
    e.preventDefault();
    setReserveDateError('');

    if (!bookId) {
      setReserveDateError('Cannot make a reservation without book information. Please go back and select a book.');
      return;
    }
    if (!reserveDate) {
      setReserveDateError('Reserve date is required.');
      return;
    }

    const selectedDate = new Date(reserveDate);
    const selectedDateUTC = new Date(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate());
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    if (selectedDateUTC < todayUTC) {
      setReserveDateError('Reserve date cannot be in the past.');
      return;
    }

    console.log('Reservation Submitted:', {
      bookId,
      bookTitle,
      bookCoverUrl, // Optionally include cover in submitted data
      reserveDate,
    });
    alert(`Reservation for "${bookTitle}" on ${reserveDate} submitted! (Check console)`);
  };

  return (
    <div className="reservation-container">
      <div className="reservation-image-half">
        <img
          src={defaultLibraryImage} // This is the background image for the left half
          alt="Library background"
          className="library-image-display"
        />
      </div>

      <div className="reservation-form-half">
        <div className="reservation-form-content">
          <h1 className="reservation-title">Confirm Reservation</h1> {/* Changed title slightly */}

          {/* Display the book cover and title if available */}
          {bookId && bookTitle && ( // Ensure all necessary info is present
            <div className="book-details-preview">
              {bookCoverUrl && ( // Only display image if URL is present
                <img 
                  src={bookCoverUrl} 
                  alt={`Cover of ${bookTitle}`} 
                  className="book-cover-preview" 
                />
              )}
              <h2 className="book-title-preview">{bookTitle}</h2>
              {/* You could add author or other small details here too */}
            </div>
          )}
          
          {!bookId && (
            <p className="error-message centered-error"> {/* Added a class for potentially different styling */}
              No book selected. Please return to select a book.
            </p>
          )}

          {bookId && ( // Only show form elements if a book is selected
            <>
              <div className="input-group">
                <label htmlFor="reserveDate" className="label-text">Select Reserve Date:</label>
                <div className="input-box">
                  {/* If you re-add calendar icon, import it and uncomment the img tag
                  <img 
                    src={calendarIcon} 
                    alt="" 
                    className="input-icon" 
                  /> 
                  */}
                  <input
                    type="date"
                    id="reserveDate"
                    value={reserveDate}
                    onChange={(e) => setReserveDate(e.target.value)}
                    className="date-input" // Adjust padding-left if icon is removed/re-added
                    aria-required="true"
                    aria-invalid={!!reserveDateError}
                    aria-describedby={reserveDateError ? "reserveDateErrorDesc" : undefined}
                  />
                </div>
                {reserveDateError && (
                  <div
                    id="reserveDateErrorDesc"
                    className="error-message"
                    role="alert"
                  >
                    {reserveDateError}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="reserve-button"
                onClick={handleReserve}
                disabled={!bookId}
              >
                Confirm & Reserve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
