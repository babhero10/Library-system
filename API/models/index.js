// src/models/index.js
import sequelize from '../config/db'; // Your Sequelize instance
import User from './User';
import Author from './Author';
import Genre from './Genre';
import Book from './Book';
import BookCopy from './BookCopy';
import Borrowing from './Borrowing';
import Reservation from './Reservation';
import Notification from './Notification';

// --- Define Associations ---

// User associations
User.hasMany(Borrowing, { foreignKey: 'user_id' });
Borrowing.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });


// Author and Book (Many-to-Many)
Author.belongsToMany(Book, {
  through: 'BookAuthors', // Name of the junction table
  foreignKey: 'author_id', // Foreign key in BookAuthors that points to Author
  otherKey: 'book_id',     // Foreign key in BookAuthors that points to Book
  timestamps: false        // Junction table has no timestamps
});
Book.belongsToMany(Author, {
  through: 'BookAuthors',
  foreignKey: 'book_id',
  otherKey: 'author_id',
  timestamps: false
});


// Genre and Book (Many-to-Many)
Genre.belongsToMany(Book, {
  through: 'BookGenres',
  foreignKey: 'genre_id',
  otherKey: 'book_id',
  timestamps: false
});
Book.belongsToMany(Genre, {
  through: 'BookGenres',
  foreignKey: 'book_id',
  otherKey: 'genre_id',
  timestamps: false
});


// Book and BookCopy (One-to-Many)
Book.hasMany(BookCopy, { foreignKey: 'book_id' });
BookCopy.belongsTo(Book, { foreignKey: 'book_id' });


// BookCopy and Borrowing (One-to-Many, a copy can be borrowed multiple times over history)
BookCopy.hasMany(Borrowing, { foreignKey: 'copy_id' });
Borrowing.belongsTo(BookCopy, { foreignKey: 'copy_id' });


// BookCopy and Reservation (One-to-One or One-to-Many for assigned copy)
// A reservation can have one copy assigned to it (when status is 'available')
BookCopy.hasOne(Reservation, { foreignKey: 'copy_assigned_id', as: 'AssignedReservation' }); // A copy can be assigned to one reservation at a time
Reservation.belongsTo(BookCopy, { foreignKey: 'copy_assigned_id', as: 'AssignedCopy' }); // A reservation is for one assigned copy

// Book and Reservation (One-to-Many: A book title can have many reservations)
Book.hasMany(Reservation, { foreignKey: 'book_id' });
Reservation.belongsTo(Book, { foreignKey: 'book_id' });


// Notification relationships (Optional, makes querying easier)
Reservation.hasMany(Notification, { foreignKey: 'related_reservation_id', as: 'ReservationNotifications' });
Notification.belongsTo(Reservation, { foreignKey: 'related_reservation_id', as: 'RelatedReservation' });

Borrowing.hasMany(Notification, { foreignKey: 'related_borrowing_id', as: 'BorrowingNotifications' });
Notification.belongsTo(Borrowing, { foreignKey: 'related_borrowing_id', as: 'RelatedBorrowing' });


// --- Sync and Export ---
const db = {
  sequelize, // The Sequelize instance
  User,
  Author,
  Genre,
  Book,
  BookCopy,
  Borrowing,
  Reservation,
  Notification
};

// Optional: Function to sync all models (useful for development)
// In production, you might use migrations instead.
db.syncModels = async (options = {}) => {
  try {
    await sequelize.sync(options);

    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the models:', error);
  }
};

export default db;
