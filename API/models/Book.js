// src/models/Book.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js'; // Ensure .js if you're using ESM
import Author from './Author.js';
import Genre from './Genre.js';   // <<<< Make sure Genre is imported

class Book extends Model {}

Book.init({
  book_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  author_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Author,
      key: 'author_id'
    }
  },
  // --- THIS IS THE CRITICAL PART ---
  genre_id: {                       // <<<< ENSURE THIS IS DEFINED
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,               // Your DDL has genre_id as NOT NULL
    references: {
      model: Genre,                 // Reference the Genre model
      key: 'genre_id'
    }
  },
  // --- END CRITICAL PART ---
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  publication_year: {
    type: DataTypes.INTEGER
  },
  language: {
    type: DataTypes.STRING(50)
  },
  cover_image_url: {
    type: DataTypes.STRING(512)
  },
  target_stock_count: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  // ol_work_key: { ... } // If you still have this from previous versions
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'Books',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  // If you prefer camelCase in your JS model (e.g., genreId) but your
  // DB column is snake_case (genre_id), and your JSON is snake_case,
  // you might need `underscored: true` or explicit `field: 'genre_id'`.
  // However, if your JSON key is 'genre_id' and your model attribute is also 'genre_id',
  // it should work directly without `underscored: true` for this specific field.
  // underscored: true, // Uncomment if you use camelCase model attributes for snake_case DB columns
  indexes: [
    { fields: ['title'] },
    { fields: ['language'] },
    { fields: ['author_id'] },
    { fields: ['genre_id'] } // Index for the genre_id
  ]
});

export default Book;
