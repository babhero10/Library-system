// src/services/AuthorService.js
import Author from '../models/Author.js';
import Book from '../models/Book.js';     // For fetching books by author
import Genre from '../models/Genre.js';   // For including genre details with books
import { Op } from 'sequelize';

class AuthorService {
  // Create a new author
  static async createAuthor(authorData) {
    try {
      // Ensure author_name is provided (example validation)
      if (!authorData.author_name || authorData.author_name.trim() === '') {
        return { success: false, error: 'Author name is required.' };
      }
      const author = await Author.create(authorData);
      return { success: true, data: author };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, error: `An author with similar details already exists: ${error.errors.map(e => e.message).join(', ')}` };
      }
      console.error('Error in AuthorService.createAuthor:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all authors with pagination and search
  static async getAllAuthors(page = 1, limit = 10, search = '') {
    try {
      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      let whereClause = {};

      if (search && search.trim()) {
        const searchTerm = `%${search.trim()}%`;
        whereClause = {
          [Op.or]: [
            { author_name: { [Op.like]: searchTerm } },
            { biography: { [Op.like]: searchTerm } }
          ]
        };
      }

      const { count, rows } = await Author.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit, 10),
        offset: offset,
        order: [['author_name', 'ASC']] // Example: order by name
      });

      return {
        success: true,
        data: {
          authors: rows,
          totalAuthors: count,
          totalPages: Math.ceil(count / parseInt(limit, 10)),
          currentPage: parseInt(page, 10)
        }
      };
    } catch (error) {
      console.error('Error in AuthorService.getAllAuthors:', error);
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
      console.error(`Error in AuthorService.getAuthorById for ID ${authorId}:`, error);
      return { success: false, error: error.message };
    }
  }

  // --- METHOD TO GET BOOKS BY AUTHOR ID ---
  static async getBooksByAuthorId(authorId, page = 1, limit = 10) {
    try {
      const nAuthorId = parseInt(authorId, 10);
      const nPage = parseInt(page, 10);
      const nLimit = parseInt(limit, 10);
      const offset = (nPage - 1) * nLimit;

      // Optional: First, verify the author exists
      const authorExists = await Author.findByPk(nAuthorId, { attributes: ['author_id', 'author_name'] });
      if (!authorExists) {
        return { success: false, error: 'Author not found, cannot fetch books.' };
      }

      const { count, rows } = await Book.findAndCountAll({
        where: { author_id: nAuthorId }, // Filter books by the author_id
        include: [
          {
            model: Genre,
            as: 'MainGenre', // Must match the alias defined in your Book model's association
            attributes: ['name'] // Assuming your Genre model has a 'name' field
          },
          // We don't need to include Author again here as we are filtering by author_id
        ],
        limit: nLimit,
        offset: offset,
        order: [['publication_year', 'DESC'], ['title', 'ASC']], // Example ordering
        distinct: true, // Important for accurate counts with include
      });

      // Process books to add display names for genre and author
      const booksWithDetails = rows.map(bookInstance => {
        const book = bookInstance.get({ plain: true });
        book.genre_name_display = book.MainGenre ? book.MainGenre.name : 'N/A';
        book.author_name_display = authorExists.author_name; // Use the name from the fetched author
        delete book.MainGenre; // Clean up the included object if not needed directly
        return book;
      });

      return {
        success: true,
        data: {
          author: { // Include author details in the response for context
            author_id: authorExists.author_id,
            author_name: authorExists.author_name
          },
          books: booksWithDetails,
          totalBooksByAuthor: count,
          totalPages: Math.ceil(count / nLimit),
          currentPage: nPage
        }
      };
    } catch (error) {
      console.error(`Error in AuthorService.getBooksByAuthorId for author ID ${authorId}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Update author
  static async updateAuthor(authorId, updateData) {
    try {
      const nAuthorId = parseInt(authorId, 10);
      const author = await Author.findByPk(nAuthorId);
      if (!author) {
        return { success: false, error: 'Author not found' };
      }

      // Ensure author_name is not set to empty if provided
      if (updateData.hasOwnProperty('author_name') && (!updateData.author_name || updateData.author_name.trim() === '')) {
        return { success: false, error: 'Author name cannot be empty.' };
      }
      
      updateData.updated_at = new Date(); // Manually set if not auto-managed by Sequelize for every update
      await author.update(updateData);
      return { success: true, data: author };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, error: `An author with similar details already exists: ${error.errors.map(e => e.message).join(', ')}` };
      }
      console.error(`Error in AuthorService.updateAuthor for ID ${authorId}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Delete author
  static async deleteAuthor(authorId) {
    try {
      const nAuthorId = parseInt(authorId, 10);
      const author = await Author.findByPk(nAuthorId);
      if (!author) {
        return { success: false, error: 'Author not found' };
      }

      // Optional: Check if author has books and handle accordingly (e.g., prevent deletion or reassign books)
      const booksCount = await Book.count({ where: { author_id: nAuthorId } });
      if (booksCount > 0) {
        return { success: false, error: `Cannot delete author: Author has ${booksCount} associated book(s). Please reassign or delete them first.` };
      }

      await author.destroy();
      return { success: true, message: 'Author deleted successfully' };
    } catch (error) {
      console.error(`Error in AuthorService.deleteAuthor for ID ${authorId}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Search authors
  static async searchAuthors(searchParams) {
    try {
      const { name, page = 1, limit = 10 } = searchParams;
      const nPage = parseInt(page, 10);
      const nLimit = parseInt(limit, 10);
      const offset = (nPage - 1) * nLimit;
      const whereClause = {};

      if (name && name.trim()) {
        whereClause.author_name = { [Op.like]: `%${name.trim()}%` };
      }

      const { count, rows } = await Author.findAndCountAll({
        where: whereClause,
        limit: nLimit,
        offset: offset,
        order: [['author_name', 'ASC']],
      });

      return {
        success: true,
        data: {
          authors: rows,
          totalAuthors: count,
          totalPages: Math.ceil(count / nLimit),
          currentPage: nPage,
          searchCriteria: { name }
        }
      };
    } catch (error) {
      console.error('Error in AuthorService.searchAuthors:', error);
      return { success: false, error: error.message };
    }
  }
}

export default AuthorService;
