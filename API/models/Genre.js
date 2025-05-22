// src/models/BookGenre.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
// No need to import Book and Genre here for definition,
// but associations in index.js will link them.

class BookGenre extends Model {}

BookGenre.init({
  book_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    references: {
      model: 'Books', // Table name as string
      key: 'book_id'
    },
    onDelete: 'CASCADE', // Matches SQL
    onUpdate: 'CASCADE'
  },
  genre_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    references: {
      model: 'Genres', // Table name as string
      key: 'genre_id'
    },
    onDelete: 'CASCADE', // Matches SQL
    onUpdate: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'BookGenre',
  tableName: 'BookGenres',
  timestamps: false // Your SQL schema for BookGenres does not have timestamps
});

export default BookGenre;
