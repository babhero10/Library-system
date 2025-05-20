// src/config/db.js
import { Sequelize } from 'sequelize';
// require('dotenv').config(); // If you use a .env file for credentials

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_WORKBEANCH, // Specify MariaDB dialect
    logging: console.log, // Set to false in production or use a custom logger
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    define: {
      timestamps: false    // We are defining created_at and updated_at manually as per your DDL
    }
  }
);

export default sequelize;
