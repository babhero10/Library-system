import React, { useState, useEffect, useCallback } from 'react';
import '../styles/AdminPage.css'; // Your existing CSS file

const API_BASE_URL_RESERVATION = 'http://localhost:8000/reserve'; // From server.js: app.use('/reserve', reserveRouter);

// Helper function to handle API responses (can be shared)
const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorData = { message: `HTTP error! Status: ${response.status}` };
    try {
      const text = await response.text();
      if (text && response.headers.get("content-type")?.includes("application/json")) {
        errorData = JSON.parse(text);
      } else if (text) {
        errorData.message = text;
      }
    } catch (e) {
      console.warn("Could not parse error response as JSON. Status:", response.status, "Response text:", errorData.message);
    }
    throw new Error(errorData.message || `An unexpected error occurred. Status: ${response.status}`);
  }
  if (response.status === 204) return { success: true, message: "Operation successful (No Content)" };
  return response.json();
};

// API call functions for Reservations
const getAllReservationsAPI = async (queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = queryString ? `${API_BASE_URL_RESERVATION}/?${queryString}` : `${API_BASE_URL_RESERVATION}/`;
  const response = await fetch(url, { credentials: 'include' });
  return handleApiResponse(response);
};

const updateReservationStatusAPI = async (reservationId, newStatus) => {
  const response = await fetch(`${API_BASE_URL_RESERVATION}/${reservationId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newStatus }), // Backend expects { newStatus: '...' }
    credentials: 'include',
  });
  return handleApiResponse(response);
};


const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Optional: for pagination if you implement it fully
  // const [paginationInfo, setPaginationInfo] = useState({ totalItems: 0, totalPages: 0, currentPage: 1 });
  // const [currentPage, setCurrentPage] = useState(1);
  // const PAGE_SIZE = 10; // Example

  const fetchReservations = useCallback(async (/* page = 1 */) => {
    setIsLoading(true);
    setError(null);
    try {
      // const queryParams = { page, pageSize: PAGE_SIZE, sortBy: 'reservation_date', sortOrder: 'DESC' };
      const data = await getAllReservationsAPI(/* queryParams */); // Pass queryParams for pagination

      // Backend returns { totalItems, totalPages, currentPage, reservations: [] } OR just [reservations]
      // This handles both cases by checking for the .reservations property first.
      let reservationList = [];
      if (data && Array.isArray(data.reservations)) {
        reservationList = data.reservations;
        // setPaginationInfo({ totalItems: data.totalItems, totalPages: data.totalPages, currentPage: data.currentPage });
      } else if (Array.isArray(data)) { // If API directly returns array of reservations
        reservationList = data;
        // setPaginationInfo({ totalItems: data.length, totalPages: 1, currentPage: 1 }); // Basic pagination for this case
      } else {
        console.warn("Fetched reservations, but data structure is not as expected:", data);
        throw new Error("Data received from server was not in the expected format for reservations.");
      }

      setReservations(reservationList.map(res => ({
        id: res.reservation_id,
        bookId: res.book_id,
        userId: res.user_id,
        // Display associated data if available (from include in backend)
        bookTitle: res.Book ? res.Book.title : 'N/A',
        userName: res.User ? res.User.full_name : 'N/A', // Assuming username, adjust if full_name
        reserveDate: res.reservation_date ? new Date(res.reservation_date).toLocaleDateString() : 'N/A',
        status: res.status, // Status should come directly from backend
        expiresAt: res.expires_at ? new Date(res.expires_at).toLocaleDateString() : 'N/A',
      })));

    } catch (err) {
      console.error("Fetch Reservations Error:", err);
      setError(err.message);
      setReservations([]);
    } finally {
      setIsLoading(false);
    }
  }, [/*currentPage, PAGE_SIZE*/]); // Add dependencies if using them for pagination

  useEffect(() => {
    fetchReservations(/*currentPage*/);
  }, [fetchReservations /*, currentPage*/]);

  const handleStatusChange = async (reservationId, newStatus) => {
    // Optimistic UI update (optional, but can make UI feel faster)
    // const originalReservations = [...reservations];
    // setReservations((prev) =>
    //   prev.map((res) => res.id === reservationId ? { ...res, status: newStatus } : res)
    // );

    setIsLoading(true); // Indicate an operation is in progress
    setError(null);
    try {
      const updatedReservation = await updateReservationStatusAPI(reservationId, newStatus);
      // If API returns the updated reservation, you can use it.
      // Otherwise, just refetch or update based on success.
      if (updatedReservation && (updatedReservation.success === true || updatedReservation.reservation_id)) {
        // Refetch to get the most accurate state, including any server-side logic (like expires_at changes)
        fetchReservations(/*currentPage*/);
        alert(`Reservation ${reservationId} status updated to ${newStatus}.`);
      } else {
        throw new Error(updatedReservation.message || "Failed to update reservation status or unexpected response.");
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      setError(`Failed to update status for reservation ${reservationId}: ${err.message}`);
      alert(`Error updating status: ${err.message}`);
      // Revert optimistic update if it failed
      // setReservations(originalReservations);
      fetchReservations(); // Or refetch to be sure
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for future "Add Reservation" functionality if needed from admin panel
  // const [showAddForm, setShowAddForm] = useState(false);
  // const [newReservationData, setNewReservationData] = useState({ book_id: '', user_id: '', reservation_date: '' });

  return (
    <div className="reservations-view"> {/* Your existing wrapper class */}
      <h2>Manage Reservations</h2>
      {/* Add New Reservation button and form can be added here later if needed */}
      {/* <button className="add-reservation-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel Add' : 'Add New Reservation'}
      </button> */}
      {/* {showAddForm && ( ... form JSX ... )} */}

      {isLoading && reservations.length === 0 && <p>Loading reservations...</p>}
      {isLoading && reservations.length > 0 && <p style={{ textAlign: 'center' }}>Processing...</p>}
      {error && <p className="error-text" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className="reservations-table"> {/* Your existing table class */}
        <div className="reservations-header"> {/* Your existing header class */}
          <div className="reservations-cell">Res ID</div>
          <div className="reservations-cell">Book (ID: Title)</div>
          <div className="reservations-cell">User (ID: Name)</div>
          <div className="reservations-cell">Reserve Date</div>
          <div className="reservations-cell">Status</div>
          <div className="reservations-cell">Expires At</div>
          {/* Add Actions cell if other actions are needed */}
        </div>

        {!isLoading && reservations.length === 0 && !error && (
          <div className="reservations-row-empty" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', background: '#fff' }}>
            No reservations found.
          </div>
        )}
        {reservations.map((res) => (
          <div key={res.id} className="reservations-row"> {/* Your existing row class */}
            <div className="reservations-cell" data-label="Res ID">{res.id}</div>
            <div className="reservations-cell" data-label="Book (ID: Title)">{res.bookId} ({res.bookTitle})</div>
            <div className="reservations-cell" data-label="User (ID: Name)">{res.userId} ({res.userName})</div>
            <div className="reservations-cell" data-label="Reserve Date">{res.reserveDate}</div>
            <div className="reservations-cell" data-label="Status">
              <select
                value={res.status}
                onChange={(e) => handleStatusChange(res.id, e.target.value)}
                className="status-dropdown" // Your existing class for the dropdown
                disabled={isLoading || ['fulfilled', 'expired', 'cancelled'].includes(res.status.toLowerCase())} // Disable if terminal status
              >
                <option value="pending">Pending</option>
                <option value="available">Available</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="reservations-cell" data-label="Expires At">{res.expiresAt}</div>
          </div>
        ))}
      </div>
      {/* Basic Pagination Example (Optional)
      {paginationInfo.totalPages > 1 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1 || isLoading}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {paginationInfo.totalPages}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(paginationInfo.totalPages, p + 1))} disabled={currentPage === paginationInfo.totalPages || isLoading}>
            Next
          </button>
        </div>
      )}
      */}
    </div>
  );
};

export default ReservationView;
