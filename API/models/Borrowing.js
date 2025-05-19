// src/models/Borrowing.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Borrowing extends Model {}

Borrowing.init({
  borrowing_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // user_id and copy_id will be added by associations
  borrow_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  due_date: {
    type: DataTypes.DATEONLY, // DATE in SQL
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE // TIMESTAMP NULL in SQL
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
  // DDL constraint uq_active_borrowing_copy was removed for MariaDB direct DDL simplicity.
  // Application logic would handle this.
}, {
  sequelize,
  modelName: 'Borrowing',
  tableName: 'Borrowings',
  timestamps: false
});

export default Borrowing;
