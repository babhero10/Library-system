// src/models/Reservation.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Reservation extends Model {}

Reservation.init({
  reservation_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // user_id, book_id, copy_assigned_id will be added by associations
  reservation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'available', 'fulfilled', 'cancelled', 'expired']]
    }
  },
  notification_sent_at: {
    type: DataTypes.DATE
  },
  expires_at: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Reservation',
  tableName: 'Reservations',
  timestamps: false
});

export default Reservation;
