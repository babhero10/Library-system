// src/models/Genre.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Genre extends Model {}

Genre.init({
  genre_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  genre_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
  // created_at is not in your DDL for Genres, if you want it, add it.
}, {
  sequelize,
  modelName: 'Genre',
  tableName: 'Genres',
  timestamps: false // No created_at/updated_at in DDL for this table
});

export default Genre;
