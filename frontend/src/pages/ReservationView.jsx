import React, { useState } from 'react';
import '../styles/AdminPage.css';

const ReservationView = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      bookId: 186,
      userId: 1,
      reserveDate: '2025-05-20',
      status: 'Pending',
      expiresAt: '2025-05-22'
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((res) => res.id === id ? { ...res, status: newStatus } : res)
    );
  };

  return (
    <div className="reservations-view">
      <div className="reservations-table">
        <div className="reservations-header">
          <div className="reservations-cell">Reservation ID</div>
          <div className="reservations-cell">Book ID</div>
          <div className="reservations-cell">User ID</div>
          <div className="reservations-cell">Reserve Date</div>
          <div className="reservations-cell">Status</div>
          <div className="reservations-cell">Expires At</div>
        </div>
        {reservations.map((res) => (
          <div key={res.id} className="reservations-row">
            <div className="reservations-cell">{res.id}</div>
            <div className="reservations-cell">{res.bookId}</div>
            <div className="reservations-cell">{res.userId}</div>
            <div className="reservations-cell">{res.reserveDate}</div>
            <div className="reservations-cell">
              <select
                value={res.status}
                onChange={(e) => handleStatusChange(res.id, e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending">Pending</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Expired">Expired</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="reservations-cell">{res.expiresAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationView;
