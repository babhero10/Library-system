import React, { useState } from 'react';
import '../styles/AdminPage.css';
import ReservationView from './ReservationView';
import BooksView from './BooksView';
import UsersView from './UsersView';
import BorrowView from './BorrowView';

const AdminPage = () => {
  const [selectedView, setSelectedView] = useState('reservations');

  return (
    <div className="admin-page">
      <div className="admin-categories-cards">
        <div className="category-card" onClick={() => setSelectedView('books')}>
          <div className="card-img books-icon" />
          <div className="card-label">Books</div>
        </div>
        <div className="category-card" onClick={() => setSelectedView('users')}>
          <div className="card-img users-icon" />
          <div className="card-label">Users</div>
        </div>
        <div className="category-card" onClick={() => setSelectedView('reservations')}>
          <div className="card-img reservations-icon" />
          <div className="card-label">Reservations</div>
        </div>
        <div className="category-card" onClick={() => setSelectedView('borrow')}>
          <div className="card-img borrow-icon" />
          <div className="card-label">Borrow</div>
        </div>
      </div>

      <div className="admin-content">
        {selectedView === 'reservations' && <ReservationView />}
        {selectedView === 'books' && <BooksView />}
        {selectedView === 'users' && <UsersView />}
        {selectedView === 'borrow' && <BorrowView />}
      </div>
    </div>
  );
};

export default AdminPage;