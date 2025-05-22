// src/routes/borrowing.js
import express from 'express';
import BorrowingController from '../controllers/BorrowingController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new borrowing
router.post('/', requireRole('admin'), BorrowingController.create);

// Get all borrowings (admin might see all, user might see their own - requires more logic or separate routes)
// For simplicity, this route gets all. Add filters in query params.
router.get('/', requireRole('admin'), BorrowingController.getAll);

// Get a specific borrowing by ID
router.get('/:id', requireRole('admin'), BorrowingController.getById);

// Update a borrowing (e.g., extend due date, add notes - typically admin)
router.put('/:id', requireRole('admin'), BorrowingController.update);

// Mark a book as returned (and potentially calculate fine)
router.patch('/:id/return', requireRole('admin'), BorrowingController.markAsReturned);

// Delete a borrowing (typically admin)
router.delete('/:id', requireRole('admin'), BorrowingController.delete);

export default router;
