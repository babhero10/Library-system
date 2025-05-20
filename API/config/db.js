// src/config/db.js
import { Sequelize } from 'sequelize';
//require('dotenv').config(); // If you use a .env file for credentials

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Specify MariaDB dialect
    logging: console.log, // Set to false in production or use a custom logger
    dialectOptions: {
      // MariaDB specific options if needed
      //timezone: 'Etc/GMT-0', // Or your preferred timezone for TIMESTAMP interpretation if necessary
                           // MariaDB TIMESTAMPs are stored as UTC and converted.
                           // Setting a session timezone can affect how they are retrieved by Sequelize.
                           // 'Etc/GMT-0' effectively tells Sequelize to treat them as UTC for consistency.
                               options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    define: {
      // underscored: true, // If you prefer snake_case for auto-generated columns like createdAt, updatedAt
      timestamps: false    // We are defining created_at and updated_at manually as per your DDL
    }
  }
);

export default sequelize;
