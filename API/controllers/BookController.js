// src/controllers/BookController.js
import BookService from '../services/BookService.js';
import multer from 'multer'; // Import multer to check for MulterError instances
// import fs from 'fs/promises'; // If you want to delete old images on update
// import path from 'path'; // If you want to delete old images on update

class BookController {
  // Create a new book (Admin only)
  static async createBook(req, res) {
    try {
      const bookData = req.body; // Text fields from the form

      // Validate required fields (example, adjust as needed)
      if (!bookData.title || !bookData.author_id || !bookData.genre_id) {
        return res.status(400).json({
          success: false,
          error: 'Title, Author ID, and Genre ID are required.',
        });
      }
      // Convert numeric fields if they come as strings from multipart/form-data
      if (bookData.author_id) bookData.author_id = parseInt(bookData.author_id, 10);
      if (bookData.genre_id) bookData.genre_id = parseInt(bookData.genre_id, 10);
      if (bookData.publication_year) bookData.publication_year = parseInt(bookData.publication_year, 10);
      if (bookData.target_stock_count) bookData.target_stock_count = parseInt(bookData.target_stock_count, 10);


      // Handle image upload
      if (req.file) {
        // req.file.filename is the name set by Multer (e.g., "cover-image-timestamp-random.ext")
        // The image is served from '/images' route, so the URL will be /images/filename
        bookData.cover_image_url = `/images/${req.file.filename}`;
      } else {
        bookData.cover_image_url = '/images/default-cover.png';
      }

      const result = await BookService.createBook(bookData);

      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Book created successfully',
        });
      } else {
        const statusCode = result.error.includes('already exists') || result.error.includes('violates unique constraint') ? 409 : 400;
        return res.status(statusCode).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      console.error('Error in BookController.createBook:', error);
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json({ success: false, error: `File upload error: ${error.message}` });
      } else if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.status(500).json({
        success: false,
        error: 'Internal server error during book creation',
      });
    }
  }

  // Get all books with pagination and search (no changes needed for image upload)
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
        return res.status(400).json({ // Or 500 if it's a server-side BookService issue
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error in BookController.getAllBooks:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get book by ID (no changes needed for image upload)
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(parseInt(id))) { // Ensure id is a number
        return res.status(400).json({
          success: false,
          error: 'Invalid book ID format'
        });
      }

      const result = await BookService.getBookById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(404).json({ // Not found
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error in BookController.getBookById:', error);
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

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid book ID format',
        });
      }

      // Convert numeric fields if they come as strings
      Object.keys(updateData).forEach(key => {
        if (['author_id', 'genre_id', 'publication_year', 'target_stock_count'].includes(key) && updateData[key] !== null && updateData[key] !== undefined) {
          updateData[key] = parseInt(updateData[key], 10);
          if (isNaN(updateData[key])) {
            // Handle cases where parsing results in NaN, e.g., by deleting the key or sending an error
            // For now, let's assume valid numbers are sent or they are intentionally omitted
            delete updateData[key]; 
          }
        }
      });


      // Remove fields that shouldn't be updated directly or are handled by DB
      delete updateData.book_id;
      delete updateData.created_at;

      // Handle image update
      if (req.file) {
        updateData.cover_image_url = `/images/${req.file.filename}`;
        const existingBook = await BookService.getBookById(id);
        if (existingBook.success && existingBook.data.cover_image_url) {
          const oldImagePath = path.join(__dirname, '../../..', existingBook.data.cover_image_url); // Adjust path as needed
          try { await fs.unlink(oldImagePath); } catch (e) { console.warn("Old image not found or could not be deleted:", oldImagePath); }
        }
      } else if (updateData.cover_image_url === '' || updateData.cover_image_url === null) {
        updateData.cover_image_url = null;
      }


      const result = await BookService.updateBook(id, updateData);

      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Book updated successfully',
        });
      } else {
        const statusCode = result.error === 'Book not found' ? 404 : (result.error.includes('already exists') || result.error.includes('violates unique constraint') ? 409 : 400);
        return res.status(statusCode).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      console.error('Error in BookController.updateBook:', error);
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: `File upload error: ${error.message}` });
      } else if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.status(500).json({
        success: false,
        error: 'Internal server error during book update',
      });
    }
  }

  // Delete book (Admin only) - no changes for image upload, but consider deleting image file if it exists
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid book ID format',
        });
      }
      
      const bookResult = await BookService.getBookById(id);

      const result = await BookService.deleteBook(id);

      if (result.success) {
        if (bookResult.success && bookResult.data.cover_image_url) {
          const imagePath = path.join(__dirname, '../../..', bookResult.data.cover_image_url); // Adjust path
          try { await fs.unlink(imagePath); } catch (e) { console.warn("Image not found or could not be deleted:", imagePath); }
        }
        return res.status(200).json({
          success: true,
          message: result.message,
        });
      } else {
        return res.status(404).json({ // Not found
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      console.error('Error in BookController.deleteBook:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // searchBooks and getAllGenres methods remain unchanged from your provided code.
  // ... (searchBooks and getAllGenres methods from your original code) ...
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
      
      if (category && categoryType && !['genre'].includes(categoryType)) {
        return res.status(400).json({
          success: false,
          error: 'categoryType must be "genre"'
        });
      }

      if (category && !categoryType) {
        return res.status(400).json({
          success: false,
          error: 'categoryType is required when category is provided'
        });
      }

      if (year && isNaN(year)) {
        return res.status(400).json({
          success: false,
          error: 'Year must be a valid number'
        });
      }

      if ((startYear && isNaN(startYear)) || (endYear && isNaN(endYear))) {
        return res.status(400).json({
          success: false,
          error: 'Start year and end year must be valid numbers'
        });
      }


      const searchParams = { 
        name, 
        category, 
        categoryType, 
        year: year ? parseInt(year) : undefined, 
        startYear: startYear ? parseInt(startYear) : undefined, 
        endYear: endYear ? parseInt(endYear) : undefined, 
        page: parseInt(page), 
        limit: parseInt(limit) 
      };
      
      const result = await BookService.searchBooks(searchParams);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(400).json({ // Or 500
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error in BookController.searchBooks:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getAllGenres(req, res) {
    try {
      const result = await BookService.getAllGenres();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(400).json({ // Or 500
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error in BookController.getAllGenres:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

export default BookController;
