// src/routers/book.js
import express from 'express';
import BookController from '../controllers/BookController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const bookRouter = express.Router();

// Public routes (accessible to anyone, no auth)
bookRouter.get('/search', BookController.searchBooks);
bookRouter.get('/meta/genres', BookController.getAllGenres);
bookRouter.get('/', BookController.getAllBooks);
bookRouter.get('/:id', BookController.getBookById);

// Protected routes
bookRouter.use(requireAuth);

// Admin-only routes
bookRouter.use(requireRole('admin'));

// Use upload.single('cover_image') for routes that handle file uploads.
// 'cover_image' must match the name attribute of the file input field in your form.
bookRouter.post('/', upload.single('cover_image'), BookController.createBook);
bookRouter.patch('/:id', upload.single('cover_image'), BookController.updateBook); // Also for updates
bookRouter.delete('/:id', BookController.deleteBook);

export default bookRouter;
