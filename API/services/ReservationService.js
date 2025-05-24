// src/services/ReservationService.js
import Reservation from '../models/Reservation.js';
import User from '../models/User.js';
import Book from '../models/Book.js';

// Define constants for better readability and maintainability
const PICKUP_EXPIRY_DAYS = 2; // User has X days to pick up a book once 'available'
const PENDING_RESERVATION_EXPIRY_DAYS = 1; // 'pending' reservation expires if not processed in X day(s)

class ReservationService {
  async makeReservation(reserveRequest) {
    try {
      const reservationDateInput = reserveRequest.reservation_date;
      const reservationDate = new Date(reservationDateInput);

      const today = new Date();
      today.setHours(0,0,0,0); // Compare dates only
      if (reservationDate < today) {
        throw new Error('Reservation date cannot be in the past.');
      }

      const newRes = await Reservation.create({
        user_id: reserveRequest.user_id,
        book_id: reserveRequest.book_id,
        reservation_date: reservationDate,
        expires_at: new Date(
          reservationDate.getFullYear(),
          reservationDate.getMonth(),
          reservationDate.getDate() + PENDING_RESERVATION_EXPIRY_DAYS, // Adds days to the user's chosen date
          0, 0, 0, 0
        ),
        status: 'pending'
      });

      console.log('Reservation created:', newRes.toJSON());

      return newRes.toJSON(); // Return plain object
    } catch (err) {
      console.error('Error making reservation:', err.message);
      if (err.name === 'SequelizeValidationError') {
        // Transform Sequelize's validation error into a more generic error message
        const messages = err.errors.map(e => e.message).join(', ');
        throw new Error(`Validation Error: ${messages}`);
      }
      throw err; // Re-throw other unexpected errors
    }
  }

  async checkReservationStatus(reserveInfo) {
    const { reservation_id } = reserveInfo;
    try {
      const reservation = await Reservation.findByPk(reservation_id);
      if (!reservation) {
        // Throw an error if not found, controller will handle 404
        throw new Error(`Reservation with ID ${reservation_id} not found.`);
      }
      return reservation.toJSON(); // Return plain object
    } catch (err) {
      // If it's the "not found" error from above, re-throw it.
      // Otherwise, log and re-throw other database errors.
      if (!err.message.includes('not found')) {
          console.error('Error checking reservation status:', err.message);
      }
      throw err;
    }
  }

  async updateStatus(reservation_id, newStatus) {
    try {
      const reservation = await Reservation.findByPk(reservation_id);
      if (!reservation) {
        throw new Error(`Reservation with ID ${reservation_id} not found for status update.`);
      }

      const oldStatus = reservation.status;

      if (oldStatus === newStatus) {
        console.warn(`Reservation ${reservation_id} is already in '${newStatus}' status.`);
        return reservation.toJSON(); // Or throw an error if this shouldn't happen
      }

      // --- LOGIC FOR STATUS TRANSITIONS ---
      if (oldStatus === 'pending' && newStatus === 'available') {
        const now = new Date();
        reservation.expires_at = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + PICKUP_EXPIRY_DAYS,
          23, 59, 59, 999
        );
        reservation.notification_sent_at = now;
        console.log(`Reservation ${reservation_id} 'available'. Pickup expires: ${reservation.expires_at.toISOString()}`);
      } else if (oldStatus === 'available') {
        if (newStatus === 'fulfilled') {
          reservation.expires_at = null;
          console.log(`Reservation ${reservation_id} 'fulfilled'.`);
        } else if (newStatus === 'expired' || newStatus === 'cancelled') {
          reservation.expires_at = null; // Or keep expires_at if 'expired' for record
          console.log(`Reservation ${reservation_id} (was 'available') now '${newStatus}'.`);
        } else if (newStatus === 'pending') {
            const originalReservationDate = new Date(reservation.reservation_date);
            reservation.expires_at = new Date(
                originalReservationDate.getFullYear(),
                originalReservationDate.getMonth(),
                originalReservationDate.getDate() + PENDING_RESERVATION_EXPIRY_DAYS,
                0, 0, 0, 0
            );
            reservation.notification_sent_at = null;
            console.warn(`Reservation ${reservation_id} from 'available' to 'pending'. Expires_at reset.`);
        }
      } else if (newStatus === 'cancelled') {
        reservation.expires_at = null;
        console.log(`Reservation ${reservation_id} (was '${oldStatus}') now 'cancelled'.`);
      }
      // Add more specific transitions as needed

      reservation.status = newStatus;
      await reservation.save(); // This can throw SequelizeValidationError
      console.log(`Reservation ${reservation_id} status updated: '${oldStatus}' -> '${newStatus}'.`);
      return reservation.toJSON();

    } catch (err) {
      console.error('Error updating reservation status:', err.message);
      if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(e => e.message).join(', ');
        throw new Error(`Validation Error updating status: ${messages}`);
      }
      // Re-throw "not found" or other errors
      throw err;
    }
  }

  async changeReservationDate(reservation_id, newReservationDateString) {
    try {
      const reservation = await Reservation.findByPk(reservation_id);
      if (!reservation) {
        throw new Error(`Reservation with ID ${reservation_id} not found for date change.`);
      }

      if (reservation.status !== 'pending') {
        // Business rule violation
        throw new Error(`Cannot change reservation date. Reservation ${reservation_id} status is '${reservation.status}', must be 'pending'.`);
      }

      const newReservationDate = new Date(newReservationDateString);
      if (isNaN(newReservationDate.getTime())) {
        throw new Error('Invalid new_reservation_date format. Please use a valid date string.');
      }

      const today = new Date();
      today.setHours(0,0,0,0);
      if (newReservationDate < today) {
        // Business rule: Prevent setting to past date (optional, adjust as needed)
        // For this example, let's throw. Could also be a warning.
        throw new Error('New reservation date cannot be in the past.');
      }

      reservation.reservation_date = newReservationDate;
      reservation.expires_at = new Date(
        newReservationDate.getFullYear(),
        newReservationDate.getMonth(),
        newReservationDate.getDate() + PENDING_RESERVATION_EXPIRY_DAYS,
        0, 0, 0, 0
      );

      await reservation.save(); // This can throw SequelizeValidationError
      console.log(`Reservation ${reservation_id} date changed to ${newReservationDate.toISOString()}. New expires_at: ${reservation.expires_at.toISOString()}`);
      return reservation.toJSON();

    } catch (err) {
      console.error('Error changing reservation date:', err.message);
      if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(e => e.message).join(', ');
        throw new Error(`Validation Error changing date: ${messages}`);
      }
      // Re-throw "not found", business rule, or other errors
      throw err;
    }
  }

  async getAllReservations(queryParams = {}) {
    try {
      const { user_id, book_id, status, sortBy, sortOrder = 'ASC', page, pageSize } = queryParams;
      const where = {};
      const order = [];

      if (user_id) {
        where.user_id = parseInt(user_id, 10);
        if (isNaN(where.user_id)) throw new Error('Invalid user_id filter.');
      }
      if (book_id) {
        where.book_id = parseInt(book_id, 10);
        if (isNaN(where.book_id)) throw new Error('Invalid book_id filter.');
      }
      if (status) {
        where.status = status;
      }

      if (sortBy) {
        // Basic sort validation (ensure sortBy is a valid column name)
        const allowedSortFields = ['reservation_date', 'status', 'expires_at', 'reservation_id'];
        if (allowedSortFields.includes(sortBy)) {
          order.push([sortBy, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
        } else {
            console.warn(`Invalid sortBy field: ${sortBy}. Ignoring sort.`);
        }
      } else {
        // Default sort
        order.push(['reservation_date', 'DESC']);
      }

      const queryOptions = {
        where,
        order,
        include: [
          { model: User, attributes: ['user_id', 'full_name'] },
          { model: Book, attributes: ['book_id', 'title'] }
        ]
      };

      // Pagination
      const pageNum = parseInt(page, 10);
      const limit = parseInt(pageSize, 10);
      const offset = (pageNum && limit && pageNum > 0 && limit > 0) ? (pageNum - 1) * limit : undefined;

      if (limit && offset !== undefined) {
        queryOptions.limit = limit;
        queryOptions.offset = offset;

        const { count, rows } = await Reservation.findAndCountAll(queryOptions);
        return {
          totalItems: count,
          totalPages: limit > 0 ? Math.ceil(count / limit) : 1,
          currentPage: pageNum || 1,
          reservations: rows.map(r => r.toJSON())
        };
      } else {
        // No pagination, just get all matching
        const reservations = await Reservation.findAll(queryOptions);
        return reservations.map(r => r.toJSON()); // Return array of plain objects
      }

    } catch (err) {
      console.error('Error getting all reservations:', err.message);
      throw err;
    }
  }
}

export default new ReservationService();
