// src/controllers/AuthorController.js
import AuthorService from '../services/AuthorService.js';
import multer from 'multer'; // For checking MulterError instances
import path from 'path';    // For constructing image paths if deleting files
import fs from 'fs/promises'; // For deleting files
import { fileURLToPath } from 'url';

// For __dirname in ES Modules (if needed for path construction, though relative paths from project root are better)
const __filename = fileURLToPath(import.meta.url);
const __controllerDirname = path.dirname(__filename); // Directory of this controller file

// Helper to construct image file system path (assuming images are served from /images at project root)
// And your controller is in src/controllers, images in project_root/images
// So, ../../images from src/controllers
const IMAGES_BASE_PATH = path.resolve(__controllerDirname, '../../images'); 

class AuthorController {
  // Create a new author (Admin only)
  static async createAuthor(req, res) {
    try {
      const authorData = { ...req.body }; // Clone body to modify

      // Validate required fields
      if (!authorData.author_name || authorData.author_name.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Author name is required.',
        });
      }
      // Convert birth_year and death_year to integers if they exist
      if (authorData.birth_year) authorData.birth_year = parseInt(authorData.birth_year, 10);
      if (authorData.death_year) authorData.death_year = parseInt(authorData.death_year, 10);


      // Handle image upload
      if (req.file) {
        // The image is served from '/images/authors/' route, so the URL will be /images/authors/filename
        // MulterMiddleware saves to project_root/images/authors/
        authorData.author_image_url = `/images/authors/${req.file.filename}`;
      } else {
        // Path to a default author image served by your static middleware
        authorData.author_image_url = '/images/authors/default-author.png'; 
      }

      const result = await AuthorService.createAuthor(authorData);

      if (result.success) {
        return res.status(201).json(result);
      } else {
        const statusCode = result.error.includes('already exists') || result.error.includes('violates unique constraint') ? 409 : 400;
        return res.status(statusCode).json(result);
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

  // Get all authors
  static async getAllAuthors(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await AuthorService.getAllAuthors(page, limit, search);
      if (result.success) return res.status(200).json(result);
      return res.status(400).json(result); // Or 500 depending on service error type
    } catch (error) {
      console.error('Error in AuthorController.getAllAuthors:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  // Get author by ID
  static async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ success: false, error: 'Invalid author ID format' });
      }
      const result = await AuthorService.getAuthorById(id);
      if (result.success) return res.status(200).json(result);
      return res.status(404).json(result); // Author not found
    } catch (error) {
      console.error('Error in AuthorController.getAuthorById:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  // --- NEW METHOD to get books by author ---
  static async getBooksByAuthor(req, res) {
    try {
      const { id } = req.params; // Author ID
      const { page = 1, limit = 10 } = req.query;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ success: false, error: 'Invalid author ID format' });
      }

      const result = await AuthorService.getBooksByAuthorId(id, page, limit);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        const statusCode = result.error.includes('Author not found') ? 404 : 400;
        return res.status(statusCode).json(result);
      }
    } catch (error) {
      console.error(`Error in AuthorController.getBooksByAuthor for author ID ${req.params.id}:`, error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }


  // Update author (Admin only)
  static async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ success: false, error: 'Invalid author ID format' });
      }

      delete updateData.author_id; // Cannot change primary key
      delete updateData.created_at; // Should not be manually updatable
      
      if (updateData.birth_year) updateData.birth_year = parseInt(updateData.birth_year, 10);
      if (updateData.death_year) updateData.death_year = parseInt(updateData.death_year, 10);


      // Handle image update: if new image uploaded, delete old one.
      if (req.file) {
        const oldAuthorResult = await AuthorService.getAuthorById(id); // Get current author data
        updateData.author_image_url = `/images/authors/${req.file.filename}`;
        if (oldAuthorResult.success && oldAuthorResult.data.author_image_url && oldAuthorResult.data.author_image_url !== '/images/authors/default-author.png') {
          const oldImageFileName = path.basename(oldAuthorResult.data.author_image_url);
          const oldImagePath = path.join(IMAGES_BASE_PATH, 'authors', oldImageFileName); // IMAGES_BASE_PATH/authors/filename.jpg
          try { 
            await fs.unlink(oldImagePath); 
            console.log("Successfully deleted old author image:", oldImagePath);
          } catch (e) { 
            console.warn("Old author image not found or could not be deleted:", oldImagePath, e.message); 
          }
        }
      } else if (updateData.hasOwnProperty('author_image_url') && (updateData.author_image_url === '' || updateData.author_image_url === null)) {
        // Client explicitly wants to remove the image
        const oldAuthorResult = await AuthorService.getAuthorById(id);
        if (oldAuthorResult.success && oldAuthorResult.data.author_image_url && oldAuthorResult.data.author_image_url !== '/images/authors/default-author.png') {
           const oldImageFileName = path.basename(oldAuthorResult.data.author_image_url);
           const oldImagePath = path.join(IMAGES_BASE_PATH, 'authors', oldImageFileName);
            try { 
                await fs.unlink(oldImagePath); 
                console.log("Successfully deleted author image:", oldImagePath);
            } catch (e) { 
                console.warn("Author image not found or could not be deleted for removal:", oldImagePath, e.message); 
            }
        }
        updateData.author_image_url = '/images/authors/default-author.png'; // Set to default or null
      }


      const result = await AuthorService.updateAuthor(id, updateData);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        const statusCode = result.error === 'Author not found' ? 404 : (result.error.includes('already exists') || result.error.includes('violates unique constraint') ? 409 : 400);
        return res.status(statusCode).json(result);
      }
    } catch (error) {
      console.error('Error in AuthorController.updateAuthor:', error);
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: `File upload error: ${error.message}` });
      } else if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.status(500).json({ success: false, error: 'Internal server error during author update' });
    }
  }

  // Delete author (Admin only)
  static async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ success: false, error: 'Invalid author ID format' });
      }
      
      // Fetch author details first to get image URL for deletion
      const authorDetails = await AuthorService.getAuthorById(id);

      const result = await AuthorService.deleteAuthor(id);

      if (result.success) {
        // If author was deleted and had an image (not default), try to delete it
        if (authorDetails.success && authorDetails.data.author_image_url && authorDetails.data.author_image_url !== '/images/authors/default-author.png') {
          const imageFileName = path.basename(authorDetails.data.author_image_url);
          const imagePath = path.join(IMAGES_BASE_PATH, 'authors', imageFileName); // IMAGES_BASE_PATH/authors/filename.jpg
          try { 
            await fs.unlink(imagePath); 
            console.log("Successfully deleted author image file:", imagePath);
          } catch (e) { 
            console.warn("Author image file not found or could not be deleted:", imagePath, e.message); 
          }
        }
        return res.status(200).json(result); // Or status 204 if no content
      } else {
        const statusCode = result.error === 'Author not found' ? 404 : (result.error.includes('Cannot delete author') ? 400 : 500);
        return res.status(statusCode).json(result);
      }
    } catch (error) {
      console.error('Error in AuthorController.deleteAuthor:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  // Search authors
  static async searchAuthors(req, res) {
    try {
      const { name, page = 1, limit = 10 } = req.query;
      const result = await AuthorService.searchAuthors({ name, page, limit });
      if (result.success) return res.status(200).json(result);
      return res.status(400).json(result);
    } catch (error) {
      console.error('Error in AuthorController.searchAuthors:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

export default AuthorController;
