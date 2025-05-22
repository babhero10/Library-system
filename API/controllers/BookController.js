// src/controllers/BookController.js
import BookService from '../services/BookService.js';

class BookController {
  // Create a new book (Admin only)
  static async createBook(req, res) {
    try {
      const bookData = req.body;
      
      // Validate required fields
      if (!bookData.title) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title is required' 
        });
      }

      const result = await BookService.createBook(bookData);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Book created successfully'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get all books with pagination and search
  static async getAllBooks(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      
      const result = await BookService.getAllBooks(page, limit, search);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get book by ID
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid book ID'
        });
      }

      const result = await BookService.getBookById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get book by OpenLibrary work key
  static async getBookByOLKey(req, res) {
    try {
      const { olKey } = req.params;
      
      if (!olKey) {
        return res.status(400).json({
          success: false,
          error: 'OpenLibrary work key is required'
        });
      }

      const result = await BookService.getBookByOLKey(olKey);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Update book (Admin only)
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid book ID'
        });
      }

      // Remove fields that shouldn't be updated directly
      delete updateData.book_id;
      delete updateData.created_at;

      const result = await BookService.updateBook(id, updateData);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Book updated successfully'
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Delete book (Admin only)
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid book ID'
        });
      }

      const result = await BookService.deleteBook(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Unified search for books with flexible filtering
  static async searchBooks(req, res) {
    try {
      const { 
        name, 
        category, 
        categoryType, 
        year, 
        startYear, 
        endYear, 
        page = 1, 
        limit = 10 
      } = req.query;
      
      // Validate categoryType if category is provided
      if (category && categoryType && !['genre'].includes(categoryType)) {
        return res.status(400).json({
          success: false,
          error: 'categoryType must be "genre"'
        });
      }

      // If category is provided but categoryType is missing
      if (category && !categoryType) {
        return res.status(400).json({
          success: false,
          error: 'categoryType is required when category is provided'
        });
      }

      // Validate year parameters
      if (year && isNaN(year)) {
        return res.status(400).json({
          success: false,
          error: 'Year must be a valid number'
        });
      }

      if ((startYear || endYear) && (isNaN(startYear) || isNaN(endYear))) {
        return res.status(400).json({
          success: false,
          error: 'Start year and end year must be valid numbers'
        });
      }

      const searchParams = { 
        name, 
        category, 
        categoryType, 
        year, 
        startYear, 
        endYear, 
        page, 
        limit 
      };
      
      const result = await BookService.searchBooks(searchParams);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get all available genres for dropdown
  static async getAllGenres(req, res) {
    try {
      const result = await BookService.getAllGenres();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

export default BookController;
