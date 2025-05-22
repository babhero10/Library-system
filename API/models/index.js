// src/models/index.js
import sequelize from '../config/db.js';
import User from './User.js';
import Author from './Author.js';
import Genre from './Genre.js';
import Book from './Book.js';
import Borrowing from './Borrowing.js';
import Reservation from './Reservation.js';
import Notification from './Notification.js';

// --- Define Associations ---

// User associations (Borrowing part is correct, others unchanged)
User.hasMany(Borrowing, { foreignKey: 'user_id', onDelete: 'RESTRICT' });
Borrowing.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Reservation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Notification, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id' });


// Author and Book (One-to-Many) (Unchanged)
Author.hasMany(Book, { foreignKey: 'author_id', onDelete: 'RESTRICT' });
Book.belongsTo(Author, { foreignKey: 'author_id' });


// --- Book and Genre Associations (UPDATED) ---

// 1. Book's Main/Required Genre (One-to-Many: Genre can be the main genre for many Books)
// This uses the `genre_id` foreign key in the `Books` table.
Genre.hasMany(Book, {
  foreignKey: 'genre_id',     // Changed from primary_genre_id
  as: 'MainGenreBooks',       // Alias
  onDelete: 'RESTRICT',       // Matches SQL FK constraint for Books.genre_id
  onUpdate: 'CASCADE'
});
Book.belongsTo(Genre, {
  foreignKey: 'genre_id',     // Changed from primary_genre_id
  as: 'MainGenre',            // Alias to fetch the main genre of a book
  // `allowNull: false` for this foreign key is defined in the Book model.
});

// --- Book and Borrowing Associations (NEW/UPDATED) ---
// One Book can have many Borrowings
Book.hasMany(Borrowing, {
  foreignKey: 'book_id',
  onDelete: 'RESTRICT' // Matches your SQL FK constraint for Borrowings.book_id
});
// One Borrowing belongs to one Book
Borrowing.belongsTo(Book, {
  foreignKey: 'book_id'
});
// --- End Book and Borrowing Associations ---


// Book and Reservation (One-to-Many) (Unchanged)
Book.hasMany(Reservation, { foreignKey: 'book_id', onDelete: 'CASCADE' });
Reservation.belongsTo(Book, { foreignKey: 'book_id' });


// Notification relationships (Unchanged for these, still related to Borrowing by ID)
Reservation.hasMany(Notification, { foreignKey: 'related_reservation_id', as: 'ReservationNotifications', onDelete: 'SET NULL' });
Notification.belongsTo(Reservation, { foreignKey: 'related_reservation_id', as: 'RelatedReservation' });

Borrowing.hasMany(Notification, { foreignKey: 'related_borrowing_id', as: 'BorrowingNotifications', onDelete: 'SET NULL' });
Notification.belongsTo(Borrowing, { foreignKey: 'related_borrowing_id', as: 'RelatedBorrowing' });


// --- Sync and Export ---
const db = {
  sequelize,
  User,
  Author,
  Genre,
  Book,
  Borrowing,
  Reservation,
  Notification
};

// Optional: Function to sync all models
db.syncModels = async (options = {}) => {
  try {
    // Ensure sync order respects FKs
    await User.sync(options);
    await Author.sync(options);
    await Genre.sync(options); // Genre before Book
    await Book.sync(options);    // Book depends on Author, Genre
    await Borrowing.sync(options); // Borrowing depends on User, Book
    await Reservation.sync(options); // Reservation depends on User, Book
    await Notification.sync(options); // Notification depends on User, Reservation, Borrowing

    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the models:', error);
  }
};

export default db;
