// src/models/Author.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Author extends Model {}

Author.init({
  author_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  ol_author_key: {
    type: DataTypes.STRING(50),
    unique: true
  },
  author_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  biography: {
    type: DataTypes.TEXT
  },
  author_image_url: {
    type: DataTypes.STRING(512)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
  // DDL constraint: uq_author_name_bio UNIQUE (author_name(191), biography(191))
  // Sequelize handles composite unique keys in indexes option below.
}, {
  sequelize,
  modelName: 'Author',
  tableName: 'Authors',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['author_name', 'biography'], // For uq_author_name_bio
      name: 'uq_author_name_bio' // Optional: name the index
    }
  ]
});

export default Author;
