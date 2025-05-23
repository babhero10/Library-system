// src/routers/author.js
import express from 'express';
import AuthorController from '../controllers/AuthorController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // For author image uploads

const authorRouter = express.Router();

// --- Public Routes ---
// Search for authors
authorRouter.get('/search', AuthorController.searchAuthors);

// Get a list of all authors (paginated)
authorRouter.get('/', AuthorController.getAllAuthors);

// Get details for a specific author by ID
authorRouter.get('/:id', AuthorController.getAuthorById);

// Get all books by a specific author ID (paginated)
// This route should be public if anyone can view an author's books.
authorRouter.get('/:id/books', AuthorController.getBooksByAuthor);


// --- Protected Routes ---
// All routes below this line will require authentication first
authorRouter.use(requireAuth);

// --- Admin-Only Routes ---
// All routes below this line will require authentication AND 'admin' role
authorRouter.use(requireRole('admin'));

// Create a new author (admin only)
// 'author_image' must match the 'name' attribute of the file input in your frontend form
authorRouter.post('/', upload.single('author_image'), AuthorController.createAuthor);

// Update an existing author (admin only)
authorRouter.patch('/:id', upload.single('author_image'), AuthorController.updateAuthor);

// Delete an author (admin only)
authorRouter.delete('/:id', AuthorController.deleteAuthor);

export default authorRouter;
