// src/models/Book.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Book extends Model {}

Book.init({
  book_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  ol_work_key: {
    type: DataTypes.STRING(50),
    unique: true
  },
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
    // Rely on DB's ON UPDATE CURRENT_TIMESTAMP
  }
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'Books',
  timestamps: false
});

export default Book;
