// src/controllers/AuthorController.js
import AuthorService from '../services/AuthorService.js';
import multer from 'multer';

class AuthorController {
  // Create a new author (Admin only)
  static async createAuthor(req, res) {
    try {
      const authorData = req.body;

      // Validate required fields
      if (!authorData.author_name) {
        return res.status(400).json({
          success: false,
          error: 'Author name is required.',
        });
      }

      // Handle image upload
      if (req.file) {
        // req.file.filename is the name set by Multer (e.g., "author-image-timestamp-random.ext")
        // The image is served from '/images' route, so the URL will be /images/filename
        authorData.author_image_url = `/images/${req.file.filename}`;
      } else {
        authorData.author_image_url = '/images/default-author.png';
      }

      const result = await AuthorService.createAuthor(authorData);

      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Author created successfully',
        });
      } else {
        const statusCode = result.error.includes('already exists') || result.error.includes('violates unique constraint') ? 409 : 400;
        return res.status(statusCode).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      console.error('Error in AuthorController.createAuthor:', error);
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: `File upload error: ${error.message}` });
      } else if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.status(500).json({
        success: false,
        error: 'Internal server error during author creation',
      });
    }
  }

  // Get all authors with pagination and search
  static async getAllAuthors(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      
      const result = await AuthorService.getAllAuthors(page, limit, search);
      
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
      console.error('Error in AuthorController.getAllAuthors:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get author by ID
  static async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid author ID format'
        });
      }

      const result = await AuthorService.getAuthorById(id);
      
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
      console.error('Error in AuthorController.getAuthorById:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Update author (Admin only)
  static async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid author ID format',
        });
      }

      // Remove fields that shouldn't be updated directly or are handled by DB
      delete updateData.author_id;
      delete updateData.created_at;

      // Handle image update
      if (req.file) {
        updateData.author_image_url = `/images/${req.file.filename}`;
        const existingAuthor = await AuthorService.getAuthorById(id);
        if (existingAuthor.success && existingAuthor.data.author_image_url) {
          const oldImagePath = path.join(__dirname, '../../..', existingAuthor.data.author_image_url);
          try { await fs.unlink(oldImagePath); } catch (e) { console.warn("Old image not found or could not be deleted:", oldImagePath); }
        }
      } else if (updateData.author_image_url === '' || updateData.author_image_url === null) {
        updateData.author_image_url = null;
      }

      const result = await AuthorService.updateAuthor(id, updateData);

      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Author updated successfully',
        });
      } else {
        const statusCode = result.error === 'Author not found' ? 404 : (result.error.includes('already exists') || result.error.includes('violates unique constraint') ? 409 : 400);
        return res.status(statusCode).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      console.error('Error in AuthorController.updateAuthor:', error);
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: `File upload error: ${error.message}` });
      } else if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.status(500).json({
        success: false,
        error: 'Internal server error during author update',
      });
    }
  }

  // Delete author (Admin only)
  static async deleteAuthor(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid author ID format',
        });
      }
      
      const authorResult = await AuthorService.getAuthorById(id);

      const result = await AuthorService.deleteAuthor(id);

      if (result.success) {
        if (authorResult.success && authorResult.data.author_image_url) {
          const imagePath = path.join(__dirname, '../../..', authorResult.data.author_image_url);
          try { await fs.unlink(imagePath); } catch (e) { console.warn("Image not found or could not be deleted:", imagePath); }
        }
        return res.status(200).json({
          success: true,
          message: result.message,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      console.error('Error in AuthorController.deleteAuthor:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  // Search authors
  static async searchAuthors(req, res) {
    try {
      const { 
        name, 
        page = 1, 
        limit = 10 
      } = req.query;

      const searchParams = { 
        name, 
        page: parseInt(page), 
        limit: parseInt(limit) 
      };
      
      const result = await AuthorService.searchAuthors(searchParams);
      
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
      console.error('Error in AuthorController.searchAuthors:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

export default AuthorController;
