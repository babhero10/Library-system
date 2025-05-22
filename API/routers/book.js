import express from 'express';
import BookController from '../controllers/BookController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

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
bookRouter.post('/', BookController.createBook);
bookRouter.put('/:id', BookController.updateBook);
bookRouter.patch('/:id', BookController.updateBook);
bookRouter.delete('/:id', BookController.deleteBook);

export default bookRouter;
