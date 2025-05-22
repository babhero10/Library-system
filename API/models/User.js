// src/models/User.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {
  // The comparePassword method will now also likely move to the service,
  // or the service will fetch the hash and do the comparison.
  // For simplicity, let's assume the service handles comparison if it handles hashing.
}

User.init({
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: 'unique_email_constraint',
      msg: 'Email address already in use!',
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },
  // No more virtual 'password' field. The service will expect 'password_hash'.
  // Or, the service will take a 'password' and convert it to 'password_hash' before calling User.create()
  password_hash: { // Actual DB field
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: {
        args: [['admin', 'user']],
        msg: 'Role must be either admin or user',
      },
    },
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    // MariaDB's `ON UPDATE CURRENT_TIMESTAMP` will handle updates at DB level
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false, // We defined created_at and updated_at manually
  // NO HOOKS related to password hashing here anymore
  hooks: {},
  defaultScope: { // Still good to exclude password_hash by default
    attributes: { exclude: ['password_hash'] },
  },
  scopes: {
    withPassword: {
      attributes: {},
    },
  },
});

export default User;
