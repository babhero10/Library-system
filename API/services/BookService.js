// src/services/BookService.js
import Book from '../models/Book.js';
import Genre from '../models/Genre.js';
import Author from '../models/Author.js';
import { Op } from 'sequelize';

class BookService {
  static async createBook(bookData) {
    try {
      const book = await Book.create(bookData);
      // To return with full details, you could call getBookById:
      // const detailedBook = await this.getBookById(book.book_id);
      // return detailedBook; // This would be { success: true, data: { ... } }
      return { success: true, data: book }; // Returns basic created book
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields && error.fields.ol_work_key) {
          return { success: false, error: 'Book with this OpenLibrary work key already exists' };
        }
        return { success: false, error: `A unique constraint was violated: ${error.errors.map(e => e.message).join(', ')}` };
      }
      return { success: false, error: error.message };
    }
  }

  static async getAllBooks(page = 1, limit = 10, search = '') {
    try {
      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      let whereClause = {};
      const includeClauses = [
        {
          model: Genre,
          as: 'MainGenre',
          attributes: ['name'] // 'name' is the model attribute (maps to 'genre_name' in DB)
        },
        {
          model: Author,
          as: 'Author',
          attributes: ['author_name'] // Requesting 'author_name' directly
        }
      ];

      if (search && search.trim()) {
        const searchTerm = `%${search.trim()}%`;
        whereClause = {
          [Op.or]: [
            { title: { [Op.like]: searchTerm } },
            { description: { [Op.like]: searchTerm } },
            { language: { [Op.like]: searchTerm } },
            { '$MainGenre.name$': { [Op.like]: searchTerm } }, // Search by Genre's model attribute 'name'
            { '$Author.author_name$': { [Op.like]: searchTerm } } // Search by Author's model attribute 'author_name'
          ]
        };
      }

      const { count, rows } = await Book.findAndCountAll({
        where: whereClause,
        include: includeClauses,
        limit: parseInt(limit, 10),
        offset: offset,
        order: [['created_at', 'DESC']],
        distinct: true // Important with includes and complex where/limits
      });

      const booksWithDetails = rows.map(bookInstance => {
        const book = bookInstance.get({ plain: true });
        book.genre_name_display = book.MainGenre ? book.MainGenre.name : null; // Using the 'name' attribute from Genre model
        book.author_name_display = book.Author ? book.Author.author_name : null; // Using 'author_name' from Author model
        // Original IDs are already on 'book' (book.genre_id, book.author_id)
        delete book.MainGenre; // Clean up nested object
        delete book.Author;    // Clean up nested object
        return book;
      });

      return {
        success: true,
        data: {
          books: booksWithDetails,
          totalBooks: count,
          totalPages: Math.ceil(count / parseInt(limit, 10)),
          currentPage: parseInt(page, 10)
        }
      };
    } catch (error) {
      console.error('Error in getAllBooks:', error);
      return { success: false, error: error.message };
    }
  }

  static async getBookById(bookId) {
    try {
      const bookInstance = await Book.findByPk(bookId, {
        include: [
          {
            model: Genre,
            as: 'MainGenre',
            attributes: ['name'] // Genre model attribute 'name'
          },
          {
            model: Author,
            as: 'Author',
            attributes: ['author_name', 'author_id'] // Author model attribute 'author_name' + its ID
          }
        ]
      });

      if (!bookInstance) {
        return { success: false, error: 'Book not found' };
      }

      const book = bookInstance.get({ plain: true });
      book.genre_name_display = book.MainGenre ? book.MainGenre.name : null;
      book.author_name_display = book.Author ? book.Author.author_name : null;
      // Retain Author object if you want more details like author_id from the join
      // If you only want the name, you can delete book.Author after extracting the name.
      // delete book.MainGenre;
      // delete book.Author; // Or just extract what you need and delete
      return { success: true, data: book };
    } catch (error)      {
      console.error(`Error in getBookById for ID ${bookId}:`, error);
      return { success: false, error: error.message };
    }
  }

  static async getBookByOLKey(olWorkKey) {
    try {
      const bookInstance = await Book.findOne({
        where: { ol_work_key: olWorkKey },
        include: [
          {
            model: Genre,
            as: 'MainGenre',
            attributes: ['name']
          },
          {
            model: Author,
            as: 'Author',
            attributes: ['author_name']
          }
        ]
      });

      if (!bookInstance) {
        return { success: false, error: 'Book not found' };
      }

      const book = bookInstance.get({ plain: true });
      book.genre_name_display = book.MainGenre ? book.MainGenre.name : null;
      book.author_name_display = book.Author ? book.Author.author_name : null;
      delete book.MainGenre;
      delete book.Author;

      return { success: true, data: book };
    } catch (error) {
      console.error(`Error in getBookByOLKey for key ${olWorkKey}:`, error);
      return { success: false, error: error.message };
    }
  }

  static async updateBook(bookId, updateData) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return { success: false, error: 'Book not found' };
      }

      // Explicitly only allow certain fields to be updated if necessary
      // const allowedUpdates = { title: updateData.title, description: updateData.description, ... };
      // await book.update(allowedUpdates);

      updateData.updated_at = new Date(); // Manually set updated_at if not auto-managed by Sequelize for every update
      await book.update(updateData);

      // Re-fetch to get included associations
      return this.getBookById(bookId);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields && error.fields.ol_work_key) {
          return { success: false, error: 'Book with this OpenLibrary work key already exists' };
        }
        return { success: false, error: `A unique constraint was violated: ${error.errors.map(e => e.message).join(', ')}` };
      }
      console.error(`Error in updateBook for ID ${bookId}:`, error);
      return { success: false, error: error.message };
    }
  }

  static async deleteBook(bookId) {
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return { success: false, error: 'Book not found' };
      }
      await book.destroy();
      return { success: true, message: 'Book deleted successfully' };
    } catch (error) {
      console.error(`Error in deleteBook for ID ${bookId}:`, error);
      return { success: false, error: error.message };
    }
  }

  static async searchBooks(searchParams) {
    try {
      const {
        name, // Book title
        category, // Either language or genre_name or author_name value
        categoryType, // 'language', 'genre', or 'author'
        year,
        startYear,
        endYear,
        page = 1,
        limit = 10
      } = searchParams;

      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const whereClause = {};
      const includeClauses = [];

      // Always include MainGenre and Author to allow filtering and display
      const mainGenreInclude = {
        model: Genre,
        as: 'MainGenre',
        attributes: ['name'],
        required: false // Default to LEFT JOIN
      };
      includeClauses.push(mainGenreInclude);

      const authorInclude = {
        model: Author,
        as: 'Author',
        attributes: ['author_name'],
        required: false // Default to LEFT JOIN
      };
      includeClauses.push(authorInclude);

      if (name && name.trim()) {
        whereClause.title = { [Op.like]: `%${name.trim()}%` };
      }

      if (category && category.trim() && categoryType) {
        const categorySearchTerm = `%${category.trim()}%`;
        if (categoryType === 'genre') {
          mainGenreInclude.where = { name: { [Op.like]: categorySearchTerm } }; // Filter on Genre model's 'name' attribute
          mainGenreInclude.required = true; // Change to INNER JOIN
        } else if (categoryType === 'language') {
          whereClause.language = { [Op.like]: categorySearchTerm };
        } else if (categoryType === 'author') {
          authorInclude.where = { author_name: { [Op.like]: categorySearchTerm } }; // Filter on Author model's 'author_name'
          authorInclude.required = true; // Change to INNER JOIN
        }
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
        order: [['title', 'ASC']], // Or any other preferred order
        distinct: true // Important for counts with required includes
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
          searchCriteria: { name, category, categoryType, year, startYear, endYear }
        }
      };
    } catch (error) {
      console.error('Error in searchBooks:', error);
      return { success: false, error: error.message };
    }
  }

  static async getAllGenres() {
    try {
      const genres = await Genre.findAll({
        attributes: ['name'], // 'name' is the model attribute (maps to 'genre_name' in DB)
        where: {
          name: { // Querying based on the model attribute 'name'
            [Op.not]: null,
            [Op.ne]: ''
          }
        },
        order: [['name', 'ASC']], // Order by model attribute 'name'
        raw: true // Get plain objects directly
      });
      // 'raw: true' means genres is already an array of { name: '...' }
      const uniqueGenres = genres.map(genre => genre.name);
      return {
        success: true,
        data: uniqueGenres
      };
    } catch (error) {
      console.error('Error in getAllGenres:', error);
      return { success: false, error: error.message };
    }
  }
}

export default BookService;
