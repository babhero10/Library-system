import sequelize from '../config/db.js';
import User from './User.js';
import Author from './Author.js';
import Genre from './Genre.js'; // Make sure Genre model is correctly defined with genre_id as PK
import Book from './Book.js';
import Borrowing from './Borrowing.js';
import Reservation from './Reservation.js';
// Import BookGenre if you plan to use it for many-to-many, though not directly causing this error
// import BookGenre from './BookGenre.js';


// --- Define Associations ---

// User associations
User.hasMany(Borrowing, { foreignKey: 'user_id', onDelete: 'RESTRICT' });
Borrowing.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Reservation, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

// Author and Book (One-to-Many)
Author.hasMany(Book, { foreignKey: 'author_id', onDelete: 'RESTRICT' });
Book.belongsTo(Author, { foreignKey: 'author_id', as: 'Author' }); // Added 'as' for consistency if used in BookService


// --- Book and Genre Associations (UPDATED) ---

// 1. Book's Main/Required Genre (One-to-Many: Genre can be the main genre for many Books)
// This uses the `genre_id` foreign key in the `Books` table.
Genre.hasMany(Book, {
  foreignKey: 'genre_id',
  sourceKey: 'genre_id',      // Explicitly state the source key on Genre model
  as: 'MainGenreBooks',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});
Book.belongsTo(Genre, {
  foreignKey: 'genre_id',     // This is the foreign key in the Book model
  targetKey: 'genre_id',      // <<<< THIS IS THE FIX: Explicitly state the target key on Genre model
  as: 'MainGenre',
});

// If you intend to use the BookGenre join table for a many-to-many relationship:
// Book.belongsToMany(Genre, {
//   through: BookGenre,
//   foreignKey: 'book_id',    // FK in BookGenre pointing to Book
//   otherKey: 'genre_id',     // FK in BookGenre pointing to Genre
//   as: 'AllGenres'           // Example alias for the collection of genres
// });
// Genre.belongsToMany(Book, {
//   through: BookGenre,
//   foreignKey: 'genre_id',   // FK in BookGenre pointing to Genre
//   otherKey: 'book_id',      // FK in BookGenre pointing to Book
//   as: 'BooksWithThisGenre' // Example alias
// });


// --- Book and Borrowing Associations ---
Book.hasMany(Borrowing, {
  foreignKey: 'book_id',
  onDelete: 'RESTRICT'
});
Borrowing.belongsTo(Book, {
  foreignKey: 'book_id'
});

// Book and Reservation (One-to-Many)
Book.hasMany(Reservation, { foreignKey: 'book_id', onDelete: 'CASCADE' });
Reservation.belongsTo(Book, {
  foreignKey: 'book_id'
});


// --- Sync and Export ---
const db = {
  sequelize,
  User,
  Author,
  Genre,
  Book,
  Borrowing,
  Reservation,
  // BookGenre, // Add if defined and used
};

db.syncModels = async (options = {}) => {
  try {
    await User.sync(options);
    await Author.sync(options);
    await Genre.sync(options);
    await Book.sync(options);
    // await BookGenre.sync(options); // Sync join table if used
    await Borrowing.sync(options);
    await Reservation.sync(options);

    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the models:', error);
  }
};

export default db;
