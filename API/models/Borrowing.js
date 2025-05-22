// src/models/Borrowing.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js'; // Using .js for consistency
import User from './User.js';         // << NEW: Import User
import Book from './Book.js';         // << NEW: Import Book

class Borrowing extends Model {}

Borrowing.init({
  borrowing_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // --- NEW: Define user_id foreign key ---
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: User, // Can be User model or 'Users' table name
      key: 'user_id'
    }
  },
  // --- NEW: Define book_id foreign key (was copy_id) ---
  book_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Book, // Can be Book model or 'Books' table name
      key: 'book_id'
    }
  },
  borrow_date: {
    type: DataTypes.DATE, // Maps to TIMESTAMP
    defaultValue: DataTypes.NOW
  },
  due_date: {
    type: DataTypes.DATEONLY, // Maps to DATE
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE, // Maps to TIMESTAMP
    allowNull: true       // Default allowNull is true, explicit for clarity
  },
  fine_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  extended_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'Borrowing',
  tableName: 'Borrowings',
  timestamps: false, // Your DDL doesn't have standard createdAt/updatedAt for Borrowings
  indexes: [         // << NEW: Add indexes matching your DDL
    { fields: ['user_id'] },
    { fields: ['book_id'] },
    { fields: ['due_date'] },
    { fields: ['return_date'] }
  ]
});

export default Borrowing;
