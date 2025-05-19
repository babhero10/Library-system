// src/models/BookCopy.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class BookCopy extends Model {}

BookCopy.init({
  copy_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // book_id will be added by association
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'available',
    validate: {
      isIn: [['available', 'borrowed', 'reserved', 'maintenance', 'damaged', 'lost']]
    }
  },
  condition_notes: {
    type: DataTypes.TEXT
  },
  added_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW // Sequelize will use current date part
  }
}, {
  sequelize,
  modelName: 'BookCopy',
  tableName: 'BookCopies',
  timestamps: false
});

export default BookCopy;
