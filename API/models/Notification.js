// src/models/Notification.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Notification extends Model {}

Notification.init({
  notification_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // user_id, related_reservation_id, related_borrowing_id by associations
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['reservation_available', 'due_date_reminder', 'overdue_alert', 'general_announcement']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'sent', 'read', 'failed']]
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  sent_at: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Notification',
  tableName: 'Notifications',
  timestamps: false
});

export default Notification;
