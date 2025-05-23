import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Genre extends Model {}

Genre.init({
  genre_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: { // This is the attribute name you'll use in your JavaScript code (e.g., genre.name)
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'genre_name' // <<<< THIS IS THE FIX: Maps 'name' to 'genre_name' DB column
  }
  // Add timestamps if your Genres table has them
  // createdAt: 'created_at',
  // updatedAt: 'updated_at'
}, {
  sequelize,
  modelName: 'Genre',
  tableName: 'Genres', // Your actual table name
  timestamps: false // Adjust if you have timestamps
});

export default Genre;
