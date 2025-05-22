// src/models/Reservation.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js'; // Ensure User model is imported
import Book from './Book.js'; // Ensure Book model is imported

class Reservation extends Model {}

Reservation.init({
  reservation_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: User, // Assumes User model is correctly defined and imported
      key: 'user_id'
    }
  },
  book_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Book, // Assumes Book model is correctly defined and imported
      key: 'book_id'
    }
  },
  reservation_date: {
    type: DataTypes.DATE, // Sequelize maps this to DATETIME/TIMESTAMP in the DB
    allowNull: false      // This is the user's intended pickup date
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'available', 'fulfilled', 'cancelled', 'expired']]
    }
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Reservation',
  tableName: 'Reservations',
  timestamps: false // Your DDL for Reservations doesn't have created_at/updated_at
});

export default Reservation;
