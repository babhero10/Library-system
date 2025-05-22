// src/controllers/reservationController.js
import reservationService from '../services/ReservationService.js';

class ReservationController {
  // POST /reservations
  async create(req, res, next) {
    try {
      const reserveRequest = req.body; // Expects { user_id, book_id, reservation_date }

      const user_id = req.session.user.user_id
      // Basic validation (more can be added with a library like Joi or express-validator)
      if (!user_id || !reserveRequest.book_id || !reserveRequest.reservation_date) {
        return res.status(400).json({ message: 'Missing required fields: user_id, book_id, reservation_date.' });
      }

      const newReservation = await reservationService.makeReservation(reserveRequest);
      res.status(201).json(newReservation);
    } catch (error) {
      console.error('Controller Error - Create Reservation:', error.message);
      if (error.message.startsWith('Invalid reservation_date format') || error.message.startsWith('Validation Error:')) {
        return res.status(400).json({ message: error.message });
      }
      // For other errors, let a generic error handler middleware deal with it, or send 500
      next(error); // Pass to Express error handler
    }
  }

  // GET /reservations/:reservation_id
  async getById(req, res, next) {
    try {
      const reservationId = parseInt(req.params.reservation_id, 10);
      if (isNaN(reservationId)) {
        return res.status(400).json({ message: 'Invalid reservation_id format. Must be a number.' });
      }

      const reservation = await reservationService.checkReservationStatus({ reservation_id: reservationId });
      // The service now throws if not found, so no need to check for null here.
      res.status(200).json(reservation);
    } catch (error) {
      console.error('Controller Error - Get Reservation By ID:', error.message);
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  // PATCH /reservations/:reservation_id/status
  async updateStatus(req, res, next) {
    try {
      const reservationId = parseInt(req.params.reservation_id, 10);
      const { newStatus } = req.body;

      if (isNaN(reservationId)) {
        return res.status(400).json({ message: 'Invalid reservation_id format. Must be a number.' });
      }
      if (!newStatus) {
        return res.status(400).json({ message: 'Missing required field: newStatus.' });
      }
      // The model already validates isIn: ['pending', 'available', ...]
      // but you could add a check here too if desired.

      const updatedReservation = await reservationService.updateStatus(reservationId, newStatus);
      res.status(200).json(updatedReservation);
    } catch (error) {
      console.error('Controller Error - Update Reservation Status:', error.message);
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith('Validation Error')) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }

  // PATCH /reservations/:reservation_id/date
  async changeDate(req, res, next) {
    try {
      const reservationId = parseInt(req.params.reservation_id, 10);
      const { newReservationDate } = req.body; // Expects a date string

      if (isNaN(reservationId)) {
        return res.status(400).json({ message: 'Invalid reservation_id format. Must be a number.' });
      }
      if (!newReservationDate) {
        return res.status(400).json({ message: 'Missing required field: newReservationDate.' });
      }

      const updatedReservation = await reservationService.changeReservationDate(reservationId, newReservationDate);
      res.status(200).json(updatedReservation);
    } catch (error) {
      console.error('Controller Error - Change Reservation Date:', error.message);
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      if (
        error.message.startsWith('Invalid new_reservation_date format') ||
        error.message.startsWith('Validation Error') ||
        error.message.includes('must be \'pending\'') || // Business rule from service
        error.message.includes('cannot be in the past') // Business rule from service
      ) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const reservations = await reservationService.getAllReservations(req.query);
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Controller Error - Get All Reservations:', error.message);
      next(error);
    }
  }
}

export default new ReservationController();
