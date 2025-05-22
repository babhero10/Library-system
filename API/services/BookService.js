// src/services/BookService.js
import Book from '../models/Book.js';
import { Op } from 'sequelize';

class BookService {
  // Create a new book
  static async createBook(bookData) {
    try {
      const book = await Book.create(bookData);
      return { success: true, data: book };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, error: 'Book with this OpenLibrary work key already exists' };
      }
      return { success: false, error: error.message };
    }
  }

  // Get all books with pagination and search
  static async getAllBooks(page = 1, limit = 10, search = '') {
    try {
      const offset = (page - 1) * limit;
      const whereClause = search ? {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { language: { [Op.like]: `%${search}%` } }
        ]
      } : {};

      const { count, rows } = await Book.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']]
      });

      return {
        success: true,
        data: {
          books: rows,
          totalBooks: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page)
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get book by ID
  static async getBookById(bookId) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return { success: false, error: 'Book not found' };
      }
      return { success: true, data: book };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get book by OpenLibrary work key
  static async getBookByOLKey(olWorkKey) {
    try {
      const book = await Book.findOne({ where: { ol_work_key: olWorkKey } });
      if (!book) {
        return { success: false, error: 'Book not found' };
      }
      return { success: true, data: book };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update book
  static async updateBook(bookId, updateData) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return { success: false, error: 'Book not found' };
      }

      // Update the updated_at field
      updateData.updated_at = new Date();
      
      await book.update(updateData);
      return { success: true, data: book };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, error: 'Book with this OpenLibrary work key already exists' };
      }
      return { success: false, error: error.message };
    }
  }

  // Delete book
  static async deleteBook(bookId) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return { success: false, error: 'Book not found' };
      }

      await book.destroy();
      return { success: true, message: 'Book deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Search books with flexible filtering - handles all search scenarios
  static async searchBooks(searchParams) {
    try {
      const { 
        name,           // Book title/name
        category,       // Either language or genre value
        categoryType,   // 'language' or 'genre' to specify which category
        year,           // Publication year
        startYear,      // For year range filtering
        endYear,        // For year range filtering
        page = 1, 
        limit = 10 
      } = searchParams;
      
      const offset = (page - 1) * limit;
      const whereClause = {};
      
      // Search by book name/title
      if (name && name.trim()) {
        whereClause.title = { [Op.like]: `%${name.trim()}%` };
      }
      
      // Search by category (language or genre)
      if (category && category.trim() && categoryType) {
        if (categoryType === 'genre') {
          whereClause.genre = { [Op.like]: `%${category.trim()}%` };
        }
        // Note: language field removed from schema, but keeping structure for future
      }

      // Search by specific year
      if (year && !isNaN(year)) {
        whereClause.publication_year = parseInt(year);
      }

      // Search by year range (overrides specific year if both provided)
      if (startYear && endYear && !isNaN(startYear) && !isNaN(endYear)) {
        whereClause.publication_year = {
          [Op.between]: [parseInt(startYear), parseInt(endYear)]
        };
      }

      const { count, rows } = await Book.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['title', 'ASC']]
      });

      return {
        success: true,
        data: {
          books: rows,
          totalBooks: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
          searchCriteria: {
            name: name || null,
            category: category || null,
            categoryType: categoryType || null,
            year: year || null,
            yearRange: (startYear && endYear) ? { startYear, endYear } : null
          }
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get all unique genres for dropdown
  static async getAllGenres() {
    try {
      const genres = await Book.findAll({
        attributes: ['genre'],
        where: {
          genre: { [Op.not]: null }
        },
        group: ['genre'],
        order: [['genre', 'ASC']]
      });

      const uniqueGenres = genres
        .map(book => book.genre)
        .filter(genre => genre && genre.trim())
        .sort();

      return {
        success: true,
        data: uniqueGenres
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default BookService;
