// src/routes/reservationRoutes.js
import express from 'express';
import reservationController from '../controllers/ReservationController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new reservation
router.post(
  '/',
  requireAuth,
  reservationController.create
);

// Get all reservations (with optional query params for filtering/sorting/pagination)
// Example: GET /api/reservations?status=pending&user_id=123&sortBy=reservation_date&sortOrder=ASC&page=1&pageSize=10
router.get(
  '/',
  requireRole('admin'),
  reservationController.getAll
);

// Get a specific reservation by ID (also checks status implicitly)
router.get(
  '/:reservation_id',
  requireAuth,
  reservationController.getById
);

// Update the status of a reservation
router.patch(
  '/:reservation_id/status',
  requireRole('admin'),
  reservationController.updateStatus
);

export default router;
