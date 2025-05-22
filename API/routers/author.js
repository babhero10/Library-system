// src/routers/author.js
import express from 'express';
import AuthorController from '../controllers/AuthorController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const authorRouter = express.Router();

// Public routes (accessible to anyone, no auth)
authorRouter.get('/search', AuthorController.searchAuthors);
authorRouter.get('/', AuthorController.getAllAuthors);


// Protected routes
authorRouter.use(requireAuth);

// Admin-only routes
authorRouter.use(requireRole('admin'));

// Use upload.single('author_image') for routes that handle file uploads.
// 'author_image' must match the name attribute of the file input field in your form.
authorRouter.get('/:id', AuthorController.getAuthorById);
authorRouter.post('/', upload.single('author_image'), AuthorController.createAuthor);
authorRouter.patch('/:id', upload.single('author_image'), AuthorController.updateAuthor);
authorRouter.delete('/:id', AuthorController.deleteAuthor);

export default authorRouter;