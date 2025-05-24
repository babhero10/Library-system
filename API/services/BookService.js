// src/services/BookService.js
import Book from '../models/Book.js';
import Genre from '../models/Genre.js';
import Author from '../models/Author.js';
import { Op } from 'sequelize';

class BookService {
  static async createBook(bookData) {
    try {
      const book = await Book.create(bookData);
      return { success: true, data: book };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields && error.fields.ol_work_key) {
          return { success: false, error: 'Book with this OpenLibrary work key already exists' };
        }
        return { success: false, error: `A unique constraint was violated: ${error.errors.map(e => e.message).join(', ')}` };
      }
      // For other errors, let the controller handle based on the re-thrown error
      console.error('Error in BookService.createBook:', error);
      throw error;
    }
  }

  static async getAllBooks(page = 1, limit = 10, search = '') {
    try {
      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      let whereClause = {};
      const includeClauses = [
        { model: Genre, as: 'MainGenre', attributes: ['name'] },
        { model: Author, as: 'Author', attributes: ['author_name'] }
      ];

      if (search && search.trim()) {
        const searchTerm = `%${search.trim()}%`;
        whereClause = {
          [Op.or]: [
            { title: { [Op.like]: searchTerm } },
            { description: { [Op.like]: searchTerm } },
            { language: { [Op.like]: searchTerm } },
            { '$MainGenre.name$': { [Op.like]: searchTerm } },
            { '$Author.author_name$': { [Op.like]: searchTerm } }
          ]
        };
      }

      const { count, rows } = await Book.findAndCountAll({
        where: whereClause,
        include: includeClauses,
        limit: parseInt(limit, 10),
        offset: offset,
        order: [['created_at', 'DESC']],
        distinct: true
      });

      const booksWithDetails = rows.map(bookInstance => {
        const book = bookInstance.get({ plain: true });
        book.genre_name_display = book.MainGenre ? book.MainGenre.name : null;
        book.author_name_display = book.Author ? book.Author.author_name : null;
        delete book.MainGenre;
        delete book.Author;
        return book;
      });

      return {
        success: true, // Keep this structure if controller expects it
        data: {
          books: booksWithDetails,
          totalBooks: count,
          totalPages: Math.ceil(count / parseInt(limit, 10)),
          currentPage: parseInt(page, 10)
        }
      };
    } catch (error) {
      console.error('Error in BookService.getAllBooks:', error);
      throw error; // Re-throw for controller to handle
    }
  }

  static async getBookById(bookId) {
    try {
      const bookInstance = await Book.findByPk(bookId, {
        include: [
          { model: Genre, as: 'MainGenre', attributes: ['name'] },
          { model: Author, as: 'Author', attributes: ['author_name', 'author_id'] }
        ]
      });
      if (!bookInstance) {
        throw new Error('Book not found');
      }
      const book = bookInstance.get({ plain: true });
      book.genre_name_display = book.MainGenre ? book.MainGenre.name : null;
      book.author_name_display = book.Author ? book.Author.author_name : null;
      return { success: true, data: book }; // Keep success structure
    } catch (error)      {
      console.error(`Error in BookService.getBookById for ID ${bookId}:`, error);
      throw error;
    }
  }

  static async getBookByOLKey(olWorkKey) {
    try {
      const bookInstance = await Book.findOne({
        where: { ol_work_key: olWorkKey },
        include: [ /* ... includes ... */ ]
      });
      if (!bookInstance) throw new Error('Book not found by OL key');
      // ... map data ...
      const book = bookInstance.get({ plain: true }); // Example mapping
      book.genre_name_display = book.MainGenre ? book.MainGenre.name : null;
      book.author_name_display = book.Author ? book.Author.author_name : null;
      delete book.MainGenre;
      delete book.Author;
      return { success: true, data: book };
    } catch (error) {
      console.error(`Error in getBookByOLKey for key ${olWorkKey}:`, error);
      throw error;
    }
  }

  static async updateBook(bookId, updateData) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) throw new Error('Book not found for update');
      updateData.updated_at = new Date();
      await book.update(updateData);
      return this.getBookById(bookId); // This will return { success: true, data: ... }
    } catch (error) {
      console.error(`Error in updateBook for ID ${bookId}:`, error);
      throw error;
    }
  }

  static async deleteBook(bookId) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) throw new Error('Book not found for deletion');
      await book.destroy();
      return { success: true, message: 'Book deleted successfully' };
    } catch (error) {
      console.error(`Error in deleteBook for ID ${bookId}:`, error);
      throw error;
    }
  }

  static async searchBooks(searchParams) {
    try {
      const {
        name, category, categoryType, language,
        year, startYear, endYear,
        page = 1, limit = 10
      } = searchParams;

      console.log("Backend BookService.searchBooks received params:", searchParams);

      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const whereClause = {};
      
      const includeClauses = [
        { model: Genre, as: 'MainGenre', attributes: ['name'], required: false },
        { model: Author, as: 'Author', attributes: ['author_name'], required: false }
      ];

      if (name && name.trim()) {
        whereClause.title = { [Op.like]: `%${name.trim()}%` };
      }

      if (category && category.trim() && categoryType) {
        const categorySearchTerm = `%${category.trim()}%`;
        if (categoryType === 'genre') {
          const genreInclude = includeClauses.find(inc => inc.as === 'MainGenre');
          if (genreInclude) {
            genreInclude.where = { name: { [Op.like]: categorySearchTerm } };
            genreInclude.required = true;
          }
        } else if (categoryType === 'author') {
          const authorInclude = includeClauses.find(inc => inc.as === 'Author');
          if (authorInclude) {
            authorInclude.where = { author_name: { [Op.like]: categorySearchTerm } };
            authorInclude.required = true;
          }
        }
      }

      if (language && language.trim()) {
        whereClause.language = { [Op.like]: language.trim() }; 
        console.log("Backend: Applying language filter:", whereClause.language);
      }

      if (year && !isNaN(year)) {
        whereClause.publication_year = parseInt(year, 10);
      } else {
        if (startYear && !isNaN(startYear) && endYear && !isNaN(endYear)) {
          whereClause.publication_year = { [Op.between]: [parseInt(startYear, 10), parseInt(endYear, 10)] };
        } else if (startYear && !isNaN(startYear)) {
          whereClause.publication_year = { [Op.gte]: parseInt(startYear, 10) };
        } else if (endYear && !isNaN(endYear)) {
          whereClause.publication_year = { [Op.lte]: parseInt(endYear, 10) };
        }
      }

      const { count, rows } = await Book.findAndCountAll({
        where: whereClause,
        include: includeClauses,
        limit: parseInt(limit, 10),
        offset: offset,
        order: [['title', 'ASC']],
        distinct: true
      });

      const booksWithDetails = rows.map(bookInstance => {
        const book = bookInstance.get({ plain: true });
        book.genre_name_display = book.MainGenre ? book.MainGenre.name : null;
        book.author_name_display = book.Author ? book.Author.author_name : null;
        delete book.MainGenre;
        delete book.Author;
        return book;
      });

      return {
        success: true,
        data: {
          books: booksWithDetails,
          totalBooks: count,
          totalPages: Math.ceil(count / parseInt(limit, 10)),
          currentPage: parseInt(page, 10),
          // ***** CORRECTED THIS PART *****
          searchCriteria: { 
            name: name || null,  // Ensure undefined becomes null for consistent JSON
            category: category || null, 
            categoryType: categoryType || null, 
            language: language || null, // Now language is included
            year: year || null, 
            startYear: startYear || null, 
            endYear: endYear || null 
          }
        }
      };
    } catch (error) {
      console.error('Error in BookService.searchBooks:', error);
      if (error.original && error.original.sqlMessage) {
          throw new Error(`Database Error: ${error.original.sqlMessage}`);
      }
      throw new Error(error.message || 'Failed to search books due to a server error.');
    }
  }

  static async getAllGenres() {
    try {
      const genres = await Genre.findAll({
        attributes: ['name'],
        where: { name: { [Op.not]: null, [Op.ne]: '' } },
        order: [['name', 'ASC']],
        group: ['name'], raw: true
      });
      const uniqueGenres = genres.map(genre => genre.name);
      return { success: true, data: uniqueGenres };
    } catch (error) {
      console.error('Error in getAllGenres:', error);
      throw new Error(error.message || 'Failed to fetch genres.');
    }
  }
}

export default BookService;
