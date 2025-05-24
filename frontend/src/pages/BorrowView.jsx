import React, { useState, useEffect, useCallback } from 'react';
import '../styles/AdminPage.css'; // Your existing CSS file

const API_BASE_URL_BORROW = 'http://localhost:8000/borrow'; // API endpoint for borrowings

// Helper function to handle API responses
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

// API call functions (keep these as they are)
const getAllBorrowingsAPI = async () => {
  const response = await fetch(`${API_BASE_URL_BORROW}/`, { credentials: 'include' });
  return handleApiResponse(response);
};

const createBorrowingAPI = async (borrowData) => {
  const response = await fetch(`${API_BASE_URL_BORROW}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(borrowData),
    credentials: 'include',
  });
  return handleApiResponse(response);
};

const markAsReturnedAPI = async (borrowId, returnDate) => {
  const response = await fetch(`${API_BASE_URL_BORROW}/${borrowId}/return`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ return_date: returnDate || new Date().toISOString().split('T')[0] }),
    credentials: 'include',
  });
  return handleApiResponse(response);
};


const BorrowView = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    book_id: '',
    due_date: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [borrowList, setBorrowList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBorrowings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllBorrowingsAPI();
      if (data && typeof data.borrowings !== 'undefined' && Array.isArray(data.borrowings)) {
        setBorrowList(data.borrowings.map(b => {
          // Check explicit is_returned flag from backend OR if return_date is present
          const isReturned = b.is_returned === true || !!b.return_date;
          return {
            id: b.borrowing_id,
            userId: b.user_id,
            bookId: b.book_id,
            userName: b.User ? b.User.full_name : 'N/A',
            bookTitle: b.Book ? b.Book.title : 'N/A',
            borrowDate: b.borrow_date ? new Date(b.borrow_date).toLocaleDateString() : 'N/A',
            dueDate: b.due_date ? new Date(b.due_date).toLocaleDateString() : 'N/A',
            is_returned: isReturned, // Use the derived/explicit value
            return_date: b.return_date ? new Date(b.return_date).toLocaleDateString() : null
          };
        }));
      } else {
        console.warn("Fetched borrowings, but data structure is not as expected:", data);
        if (Array.isArray(data)) { // Fallback if API returns array directly
            setBorrowList(data.map(b => ({
                id: b.borrowing_id,
                userId: b.user_id,
                bookId: b.book_id,
                userName: b.User ? b.User.full_name : 'N/A',
                bookTitle: b.Book ? b.Book.title : 'N/A',
                borrowDate: b.borrow_date ? new Date(b.borrow_date).toLocaleDateString() : 'N/A',
                dueDate: b.due_date ? new Date(b.due_date).toLocaleDateString() : 'N/A',
                is_returned: b.is_returned === true || !!b.return_date,
                return_date: b.return_date ? new Date(b.return_date).toLocaleDateString() : null
            })));
        } else {
            throw new Error("Data received from server was not in the expected format for borrowings.");
        }
      }
    } catch (err) {
      console.error("Fetch Borrowings Error:", err);
      setError(err.message);
      setBorrowList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBorrowings();
  }, [fetchBorrowings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const { user_id, book_id, due_date } = formData;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user_id?.trim()) errors.user_id = 'User ID is required';
    else if (isNaN(parseInt(user_id))) errors.user_id = 'User ID must be a number';
    if (!book_id?.trim()) errors.book_id = 'Book ID is required';
    else if (isNaN(parseInt(book_id))) errors.book_id = 'Book ID must be a number';

    if (!due_date) {
      errors.due_date = 'Due date is required';
    } else {
      const due = new Date(due_date);
      const borrowDateForValidation = new Date();
      borrowDateForValidation.setHours(0,0,0,0);
      if (due < today) {
        errors.due_date = 'Due date cannot be in the past.';
      } else if (due <= borrowDateForValidation) {
        errors.due_date = 'Due date must be after today.';
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);
    setError(null);
    const submissionData = {
      ...formData,
      borrow_date: new Date().toISOString().split('T')[0]
    };
    try {
      const data = await createBorrowingAPI(submissionData);
      if (data && (data.success === true || data.borrowing || data.borrowing_id || data.id)) {
        fetchBorrowings();
        setFormData({ user_id: '', book_id: '', due_date: '' });
        setFormErrors({});
        setShowForm(false);
        alert(data.message || 'Borrowing record created successfully!');
      } else {
        console.warn("Create borrowing response not in expected success format:", data);
        throw new Error(data.message || "Failed to confirm borrowing record creation.");
      }
    } catch (err) {
      console.error("Submit Borrowing Error:", err);
      setError(err.message);
      setFormErrors({ submit: err.message });
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleReturn = async (borrowingId, currentIsReturned) => {
    if (currentIsReturned) {
      // This alert might not even be needed if the button is disabled,
      // but it's a good safeguard if the state somehow gets out of sync.
      // alert("This item is already marked as returned.");
      return; // Do nothing if already returned
    }
    if (!window.confirm(`Mark borrowing ID ${borrowingId} as returned?`)) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await markAsReturnedAPI(borrowingId);
      if (data && data.borrowing_id && data.return_date) { // Check for successful update
        fetchBorrowings();
        alert(data.message || `Borrowing ID ${borrowingId} successfully marked as returned.`);
      } else {
        console.warn("Mark as returned response not in expected success format:", data);
        throw new Error(data.message || "Failed to confirm 'mark as returned' operation from API response.");
      }
    } catch (err) {
      console.error("Mark as Returned Error:", err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="borrow-view">
      <h2>Manage Borrowings</h2>
      <button
        className="add-borrow-btn"
        onClick={() => {
          setFormErrors({});
          setFormData({ user_id: '', book_id: '', due_date: '' });
          setShowForm(!showForm);
          setError(null);
        }}
        disabled={isLoading}
      >
        {showForm ? 'Cancel Add Borrowing' : 'Add New Borrowing'}
      </button>

      {isLoading && borrowList.length === 0 && <p>Loading borrowing records...</p>}
      {isLoading && borrowList.length > 0 && <p style={{ textAlign: 'center' }}>Processing...</p>}
      {error && <p className="error-text" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {showForm && (
        <form className="borrow-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="borrow-user_id">User ID</label>
            <input id="borrow-user_id" name="user_id" value={formData.user_id} onChange={handleChange} type="number" placeholder="Enter User ID" disabled={isLoading}/>
            {formErrors.user_id && <div className="error-text">{formErrors.user_id}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="borrow-book_id">Book ID</label>
            <input id="borrow-book_id" name="book_id" value={formData.book_id} onChange={handleChange} type="number" placeholder="Enter Book ID" disabled={isLoading}/>
            {formErrors.book_id && <div className="error-text">{formErrors.book_id}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="borrow-due_date">Due Date</label>
            <input id="borrow-due_date" name="due_date" value={formData.due_date} onChange={handleChange} type="date" disabled={isLoading}/>
            {formErrors.due_date && <div className="error-text">{formErrors.due_date}</div>}
          </div>
          {formErrors.submit && <div className="error-text">{formErrors.submit}</div>}
          <button type="submit" className="add-borrow-btn" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Borrowing"}
          </button>
        </form>
      )}
      <div className="borrow-table">
        <div className="borrow-header">
          <div className="borrow-cell">Borrow ID</div>
          <div className="borrow-cell">User (ID: Name)</div>
          <div className="borrow-cell">Book (ID: Title)</div>
          <div className="borrow-cell">Borrow Date</div>
          <div className="borrow-cell">Due Date</div>
          <div className="borrow-cell">Status</div> {/* Changed header from "Returned" to "Status" */}
          <div className="borrow-cell">Return Date</div>
        </div>

        {!isLoading && borrowList.length === 0 && !error && (
          <div className="borrow-row-empty" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', background: '#fff' }}>
            No borrowing records found.
          </div>
        )}
        {borrowList.map((b) => (
          <div key={b.id} className="borrow-row">
            <div className="borrow-cell" data-label="Borrow ID">{b.id}</div>
            <div className="borrow-cell" data-label="User (ID: Name)">{b.userId} ({b.userName})</div>
            <div className="borrow-cell" data-label="Book (ID: Title)">{b.bookId} ({b.bookTitle})</div>
            <div className="borrow-cell" data-label="Borrow Date">{b.borrowDate}</div>
            <div className="borrow-cell" data-label="Due Date">{b.dueDate}</div>
            {/* ====== MODIFIED CELL FOR RETURN STATUS/ACTION ====== */}
            <div className="borrow-cell borrow-status-action-cell" data-label="Status">
              {b.is_returned ? (
                <button className="action-button returned-status-button" disabled>
                  Returned
                </button>
              ) : (
                <button
                  className="action-button mark-returned-action-button"
                  onClick={() => handleToggleReturn(b.id, b.is_returned)}
                  disabled={isLoading}
                >
                  Mark Returned
                </button>
              )}
            </div>
            {/* ==================================================== */}
            <div className="borrow-cell" data-label="Return Date">{b.return_date || (b.is_returned ? 'N/A' : 'Pending')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowView;
