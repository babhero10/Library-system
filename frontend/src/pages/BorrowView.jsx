import React, { useState } from 'react';
import '../styles/AdminPage.css';

const BorrowView = () => {
  const [formData, setFormData] = useState({
    userId: '',
    bookId: '',
    borrowDate: '',
    dueDate: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [borrowList, setBorrowList] = useState([
    {
      id: 1,
      userId: '123',
      bookId: '456',
      borrowDate: '2025-05-20',
      dueDate: '2025-06-20',
      markedAsReturn: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    const { userId, bookId, borrowDate, dueDate } = formData;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!userId.trim()) errors.userId = 'User ID is required';
    if (!bookId.trim()) errors.bookId = 'Book ID is required';

    if (!borrowDate) {
      errors.borrowDate = 'Borrow date is required';
    } else {
      const borrow = new Date(borrowDate);
      if (borrow < today) {
        errors.borrowDate = 'Borrow date cannot be in the past';
      }
    }

    if (!dueDate) {
      errors.dueDate = 'Due date is required';
    } else {
      const due = new Date(dueDate);
      if (due < today) {
        errors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (borrowDate && dueDate) {
      const borrow = new Date(borrowDate);
      const due = new Date(dueDate);
      if (borrow >= due) {
        errors.dueDate = 'Due date must be after borrow date';
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newBorrow = {
      id: borrowList.length > 0 ? Math.max(...borrowList.map(b => b.id)) + 1 : 1,
      ...formData,
      markedAsReturn: false, // Initialize new borrow with unchecked
    };

    setBorrowList([...borrowList, newBorrow]);
    setFormData({ userId: '', bookId: '', borrowDate: '', dueDate: '' });
    setFormErrors({});
    setShowForm(false);
  };

  // Handle toggle checkbox for "Marked as Return"
  const toggleMarkedAsReturn = (id) => {
    setBorrowList(prevList =>
      prevList.map(b =>
        b.id === id ? { ...b, markedAsReturn: !b.markedAsReturn } : b
      )
    );
  };

  return (
    <div className="borrow-view">
      <div className="borrow-table">
        <div className="borrow-header">
          <div className="borrow-cell">Borrow ID</div>
          <div className="borrow-cell">User ID</div>
          <div className="borrow-cell">Book ID</div>
          <div className="borrow-cell">Borrow Date</div>
          <div className="borrow-cell">Due Date</div>
          <div className="borrow-cell">Marked as Return</div> {/* New header */}
        </div>

        {borrowList.map((b) => (
          <div key={b.id} className="borrow-row">
            <div className="borrow-cell">{b.id}</div>
            <div className="borrow-cell">{b.userId}</div>
            <div className="borrow-cell">{b.bookId}</div>
            <div className="borrow-cell">{b.borrowDate}</div>
            <div className="borrow-cell">{b.dueDate}</div>
            <div className="borrow-cell">
              <input
              
                type="checkbox"
                checked={b.markedAsReturn}
                onChange={() => toggleMarkedAsReturn(b.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="add-borrow-btn action-button"
        onClick={() => {
          setFormErrors({});
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Cancel' : 'Add Borrow'}
      </button>

      {showForm && (
        <form className="borrow-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              type="text"
              placeholder="Enter User ID"
            />
            {formErrors.userId && <div className="error-text">{formErrors.userId}</div>}
          </div>
          <div className="form-group">
            <label>Book ID</label>
            <input
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              type="text"
              placeholder="Enter Book ID"
            />
            {formErrors.bookId && <div className="error-text">{formErrors.bookId}</div>}
          </div>
          <div className="form-group">
            <label>Borrow Date</label>
            <input
              name="borrowDate"
              value={formData.borrowDate}
              onChange={handleChange}
              type="date"
            />
            {formErrors.borrowDate && <div className="error-text">{formErrors.borrowDate}</div>}
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              type="date"
            />
            {formErrors.dueDate && <div className="error-text">{formErrors.dueDate}</div>}
          </div>
          <button type="submit" className="add-borrow-btn action-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BorrowView;
