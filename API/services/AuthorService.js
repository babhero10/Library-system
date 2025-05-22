// src/services/AuthorService.js
import Author from '../models/Author.js';
import { Op } from 'sequelize';

class AuthorService {
  // Create a new author
  static async createAuthor(authorData) {
    try {
      const author = await Author.create(authorData);
      return { success: true, data: author };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, error: 'Author with this combination of name and biography already exists' };
      }
      return { success: false, error: error.message };
    }
  }

  // Get all authors with pagination and search
  static async getAllAuthors(page = 1, limit = 10, search = '') {
    try {
      const offset = (page - 1) * limit;
      const whereClause = search ? {
        [Op.or]: [
          { author_name: { [Op.like]: `%${search}%` } },
          { biography: { [Op.like]: `%${search}%` } },
          { ol_author_key: { [Op.like]: `%${search}%` } }
        ]
      } : {};

      const { count, rows } = await Author.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']]
      });

      return {
        success: true,
        data: {
          authors: rows,
          totalAuthors: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page)
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get author by ID
  static async getAuthorById(authorId) {
    try {
      const author = await Author.findByPk(authorId);
      if (!author) {
        return { success: false, error: 'Author not found' };
      }
      return { success: true, data: author };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get author by OpenLibrary author key
  static async getAuthorByOLKey(olAuthorKey) {
    try {
      const author = await Author.findOne({ where: { ol_author_key: olAuthorKey } });
      if (!author) {
        return { success: false, error: 'Author not found' };
      }
      return { success: true, data: author };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update author
  static async updateAuthor(authorId, updateData) {
    try {
      const author = await Author.findByPk(authorId);
      if (!author) {
        return { success: false, error: 'Author not found' };
      }

      await author.update(updateData);
      return { success: true, data: author };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, error: 'Author with this combination of name and biography already exists' };
      }
      return { success: false, error: error.message };
    }
  }

  // Delete author
  static async deleteAuthor(authorId) {
    try {
      const author = await Author.findByPk(authorId);
      if (!author) {
        return { success: false, error: 'Author not found' };
      }

      await author.destroy();
      return { success: true, message: 'Author deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Search authors with flexible filtering
  static async searchAuthors(searchParams) {
    try {
      const { 
        name,           // Author name
        page = 1, 
        limit = 10 
      } = searchParams;
      
      const offset = (page - 1) * limit;
      const whereClause = {};
      
      // Search by author name
      if (name && name.trim()) {
        whereClause.author_name = { [Op.like]: `%${name.trim()}%` };
      }

      const { count, rows } = await Author.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['author_name', 'ASC']]
      });

      return {
        success: true,
        data: {
          authors: rows,
          totalAuthors: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
          searchCriteria: {
            name: name || null
          }
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default AuthorService;