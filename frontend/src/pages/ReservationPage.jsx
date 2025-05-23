// src/pages/ReservationPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createReservation, API_BASE_URL } from '../services/apiService'; // Ensure API_BASE_URL is exported if needed here
import { useAuth } from '../context/AuthContext'; // For currentUser, if needed for UI elements beyond ProtectedRoute
import '../styles/ReservationPage.css'; // Ensure styles are correctly defined
import defaultLibraryImage from '../assets/image.png'; // Default background for the page half

// Helper function to parse query parameters from URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Helper function to construct full image URLs if bookCoverUrl from query is relative
const constructFullImageUrl = (coverPathFromQuery) => {
  // Default image if no cover path is provided or if it's invalid
  if (!coverPathFromQuery) {
    return `${process.env.PUBLIC_URL}/default-book-cover.png`; 
  }
  // If it's already an absolute URL, use it directly
  if (coverPathFromQuery.startsWith('http://') || coverPathFromQuery.startsWith('https://')) {
    return coverPathFromQuery;
  }
  // Assuming coverPathFromQuery is like "/images/covers/b1.jpg"
  // And API_BASE_URL is "http://localhost:8000" (no trailing slash)
  const pathSegment = coverPathFromQuery.startsWith('/') ? coverPathFromQuery : `/${coverPathFromQuery}`;
  return `${API_BASE_URL}${pathSegment}`; // API_BASE_URL needs to be imported
};

// Placeholder components for UI feedback
const LoadingIndicator = ({ message }) => <p className="loading-message">{message || "Processing reservation..."}</p>;
const ErrorMessage = ({ message }) => <p className="error-message api-error-message">{message}</p>; // Use consistent error class
const SuccessMessage = ({ message }) => <p className="success-message">{message}</p>; // Use consistent success class

const ReservationPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Access currentUser, ProtectedRoute handles access restriction

  // Extract book details from URL query parameters
  const bookIdFromQuery = query.get('bookId');
  const bookTitleFromQuery = query.get('title');
  const bookCoverPathFromQuery = query.get('cover');

  // State for UI elements and form
  const [displayableBookCoverUrl, setDisplayableBookCoverUrl] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const [clientSideError, setClientSideError] = useState(''); // For form validation errors

  // State for API interaction feedback
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [apiError, setApiError] = useState('');     // Error message from API
  const [apiSuccess, setApiSuccess] = useState(''); // Success message from API

  useEffect(() => {
    // Construct the full URL for the book cover image to display
    if (bookCoverPathFromQuery) {
      setDisplayableBookCoverUrl(constructFullImageUrl(bookCoverPathFromQuery));
    } else if (bookIdFromQuery && bookTitleFromQuery) {
      // Fallback if cover URL wasn't passed (though BookPage should always send it)
      setDisplayableBookCoverUrl(`${process.env.PUBLIC_URL}/default-book-cover.png`);
    }

    // Log book info or handle missing info (though ProtectedRoute should largely cover this)
    if (bookIdFromQuery && bookTitleFromQuery) {
      console.log('ReservationPage: Preparing to reserve book - ID:', bookIdFromQuery, 'Title:', bookTitleFromQuery);
    } else {
      console.warn('ReservationPage: Book ID or Title missing from query parameters.');
      // If not loading auth state and no user, consider redirecting, though ProtectedRoute is primary
      // if (!currentUser && !authIsLoading) { navigate('/login', { replace: true }); }
    }
    // Dependency array: re-run if these query params change (e.g., navigating with new params)
  }, [bookIdFromQuery, bookTitleFromQuery, bookCoverPathFromQuery, currentUser]);


  // Client-side validation for the reservation date
  const validateForm = () => {
    setClientSideError(''); // Reset client-side error
    if (!bookIdFromQuery) {
      setClientSideError('Book information is missing. Please select a book again.');
      return false;
    }
    if (!reserveDate) {
      setClientSideError('Please select a reservation date.');
      return false;
    }
    const selected = new Date(reserveDate);
    const today = new Date();
    // Compare dates without time component to allow selecting today
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      setClientSideError('Reservation date cannot be in the past.');
      return false;
    }
    return true;
  };

  // Handle the reservation submission
  const handleReserve = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setApiError('');    // Reset API error/success messages
    setApiSuccess('');

    if (!validateForm()) { // Perform client-side validation
      return;
    }

    setIsLoading(true); // Set loading state for API call
    try {
      const reservationPayload = {
        book_id: parseInt(bookIdFromQuery, 10), // Ensure bookId is an integer
        reservation_date: reserveDate,
        // user_id will be inferred from the session on the backend
      };

      const result = await createReservation(reservationPayload); // Call the API service
      console.log("API Reservation Result in Page:", result); // Log the raw result

      // Check for explicit success flag OR presence of key data from created object
      if (result.success === true || (result && result.reservation_id)) {
        setApiSuccess(result.message || `Reservation for "${bookTitleFromQuery}" on ${reserveDate} has been confirmed!`);
        console.log('Reservation Confirmed. API Data:', result.data || result);
        setReserveDate(''); // Clear the date input on success
        // Optionally, navigate away after a short delay:
        // setTimeout(() => navigate('/my-reservations'), 3000);
      } else {
        // If not explicitly successful or doesn't look like a success object
        setApiError(result.error || result.message || 'Failed to make the reservation. Please try again.');
      }
    } catch (error) { // Catch errors thrown by apiService (e.g., network error, non-ok response)
      console.error("ReservationPage: API Call Error:", error);
      setApiError(error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  
  // Conditional rendering if critical book info is missing (after initial load attempt)
  // This state check should ideally happen after initial `useEffect` has had a chance to run,
  // so we also check `!isLoading` from the `useAuth` hook if initial auth check is also a factor.
  // For simplicity, let's assume `bookIdFromQuery` being missing after mount is the main concern here.
  const authIsLoading = useAuth().isLoading; // Get loading state from AuthContext

  if (!authIsLoading && !bookIdFromQuery) { // Check after auth loading is done
    return (
      <div className="reservation-container">
        <div className="reservation-image-half">
          <img src={defaultLibraryImage} alt="Library background" className="library-image-display" />
        </div>
        <div className="reservation-form-half">
          <div className="reservation-form-content">
            <h1 className="reservation-title">Reservation Error</h1>
            <ErrorMessage message="No book has been selected for reservation. Please go back to the book details page and click 'Borrow Book'." />
            <button onClick={() => navigate(-1)} className="reserve-button" style={{marginTop: '20px'}}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <div className="reservation-image-half">
        <img
          src={defaultLibraryImage} // Background image for the page aesthetic
          alt="Library background"
          className="library-image-display"
        />
      </div>

      <div className="reservation-form-half">
        <div className="reservation-form-content">
          <h1 className="reservation-title">Confirm Your Reservation</h1>

          {/* Display details of the book being reserved */}
          {bookTitleFromQuery && (
            <div className="book-details-preview">
              {displayableBookCoverUrl && (
                <img 
                  src={displayableBookCoverUrl} 
                  alt={`Cover of ${bookTitleFromQuery}`} 
                  className="book-cover-preview" 
                />
              )}
              <h2 className="book-title-preview">{bookTitleFromQuery}</h2>
            </div>
          )}
          
          {/* Display API feedback messages */}
          {apiError && <ErrorMessage message={apiError} />}
          {apiSuccess && <SuccessMessage message={apiSuccess} />}

          {/* Show reservation form only if a bookId is present and reservation is not yet successful */}
          {bookIdFromQuery && !apiSuccess && (
            <form onSubmit={handleReserve}>
              <div className="input-group">
                <label htmlFor="reserveDate" className="label-text">Select Reservation Date:</label>
                <div className="input-box">
                  <input
                    type="date"
                    id="reserveDate"
                    value={reserveDate}
                    onChange={(e) => { 
                      setReserveDate(e.target.value); 
                      setClientSideError(''); // Clear client error on input change
                      setApiError('');      // Clear API error on input change
                    }}
                    className="date-input"
                    aria-required="true"
                    aria-invalid={!!clientSideError || !!apiError}
                    aria-describedby={clientSideError ? "reserveDateClientError" : (apiError ? "reserveDateApiError" : undefined)}
                  />
                </div>
                {clientSideError && (
                  <div id="reserveDateClientError" className="error-message" role="alert">
                    {clientSideError}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="reserve-button"
                disabled={isLoading || !bookIdFromQuery} // Also disable if no bookId (belt-and-suspenders)
              >
                {isLoading ? 'Reserving...' : 'Confirm & Reserve'}
              </button>
            </form>
          )}

          {/* Show a button to navigate away after successful reservation */}
          {apiSuccess && (
             <button 
               onClick={() => navigate('/')} // Navigate to homepage or user's reservations page
               className="reserve-button" 
               style={{marginTop: '20px'}}
             >
               Back to Home
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
