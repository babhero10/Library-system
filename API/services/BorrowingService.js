// src/services/BorrowingService.js
import db from '../models/index.js';
import { Op } from 'sequelize';

const { Borrowing, Book, User } = db;

class BorrowingService {
  /**
   * Create a new borrowing record.
   * Checks if the book is available before creating the borrowing.
   * @param {object} borrowingData - Data for the new borrowing.
   * @param {number} borrowingData.user_id - ID of the user borrowing the book.
   * @param {number} borrowingData.book_id - ID of the book to be borrowed.
   * @param {string} borrowingData.due_date - Due date in 'YYYY-MM-DD' format.
   * @param {string} [borrowingData.notes] - Optional notes for the borrowing.
   * @returns {Promise<object>} The created borrowing object.
   * @throws {Error} If user or book not found, or book not available.
   */
  static async createBorrowing(borrowingData) {
    const { user_id, book_id, due_date, notes } = borrowingData;

    // Validate user and book existence
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    const book = await Book.findByPk(book_id);
    if (!book) {
      throw new Error('Book not found');
    }

    // Check book availability
    const activeBorrowingsCount = await Borrowing.count({
      where: {
        book_id: book_id,
        return_date: null, // Only count books that haven't been returned
      },
    });

    if (activeBorrowingsCount >= book.target_stock_count) {
      throw new Error('Book not available for borrowing at the moment.');
    }

    // Due date must be provided
    if (!due_date) {
        throw new Error('Due date is required.');
    }

    const newBorrowing = await Borrowing.create({
      user_id,
      book_id,
      due_date, // Expecting YYYY-MM-DD string, Sequelize handles conversion
      notes,
      // borrow_date will be set by DB default or Sequelize default
    });

    return newBorrowing.toJSON();
  }

  /**
   * Get all borrowings with optional filtering and pagination.
   * @param {object} options - Filtering and pagination options.
   * @param {number} [options.page=1] - Current page number.
   * @param {number} [options.limit=10] - Items per page.
   * @param {number} [options.user_id] - Filter by user ID.
   * @param {number} [options.book_id] - Filter by book ID.
   * @param {boolean} [options.is_returned] - Filter by return status (true for returned, false for not returned).
   * @returns {Promise<object>} An object containing borrowings list and pagination details.
   */
  static async getAllBorrowings(options = {}) {
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (options.user_id) {
      whereClause.user_id = options.user_id;
    }
    if (options.book_id) {
      whereClause.book_id = options.book_id;
    }
    if (options.is_returned !== undefined) {
      whereClause.return_date = options.is_returned ? { [Op.ne]: null } : { [Op.is]: null };
    }

    const { count, rows } = await Borrowing.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, attributes: ['user_id', 'full_name', 'email'] },
        { model: Book, attributes: ['book_id', 'title'] },
      ],
      limit,
      offset,
      order: [['borrow_date', 'DESC']],
    });

    return {
      borrowings: rows.map(b => b.toJSON()),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  /**
   * Get a specific borrowing by its ID.
   * @param {number} borrowingId - The ID of the borrowing.
   * @returns {Promise<object|null>} The borrowing object or null if not found.
   */
  static async getBorrowingById(borrowingId) {
    const borrowing = await Borrowing.findByPk(borrowingId, {
      include: [
        { model: User, attributes: ['user_id', 'full_name', 'email'] },
        { model: Book, attributes: ['book_id', 'title', 'cover_image_url'] },
      ],
    });
    return borrowing ? borrowing.toJSON() : null;
  }

  /**
   * Update an existing borrowing.
   * @param {number} borrowingId - The ID of the borrowing to update.
   * @param {object} updateData - Data to update.
   * @param {string} [updateData.due_date] - New due date.
   * @param {string} [updateData.return_date] - Return date (timestamp).
   * @param {number} [updateData.fine_amount] - Fine amount.
   * @param {string} [updateData.notes] - Updated notes.
   * @returns {Promise<object|null>} The updated borrowing object or null if not found.
   * @throws {Error} If trying to update a non-existent borrowing.
   */
  static async updateBorrowing(borrowingId, updateData) {
    const borrowing = await Borrowing.findByPk(borrowingId);
    if (!borrowing) {
      return null; // Or throw new Error('Borrowing not found');
    }

    // Fields that can be updated
    const allowedUpdates = ['due_date', 'return_date', 'fine_amount', 'notes'];
    const updates = {};
    allowedUpdates.forEach(key => {
      if (updateData[key] !== undefined) {
        updates[key] = updateData[key];
      }
    });

    // If setting return_date, ensure it's not already set
    if (updates.return_date && borrowing.return_date) {
        // Optionally allow overriding, or throw error if already returned
        console.warn(`Borrowing ID ${borrowingId} already has a return date. Overwriting.`);
    }
    // If return_date is being set to null, it means un-returning
    if (updates.return_date === null) {
        updates.fine_amount = 0.00; // Reset fine if un-returning
    }


    await borrowing.update(updates);
    return borrowing.toJSON();
  }

  /**
   * Delete a borrowing record.
   * @param {number} borrowingId - The ID of the borrowing to delete.
   * @returns {Promise<boolean>} True if deleted, false if not found.
   */
  static async deleteBorrowing(borrowingId) {
    const borrowing = await Borrowing.findByPk(borrowingId);
    if (!borrowing) {
      return false;
    }
    await borrowing.destroy();
    return true;
  }

  /**
   * Helper service to mark a book as returned.
   * This could also calculate fines automatically.
   * @param {number} borrowingId - The ID of the borrowing.
   * @param {Date} [returnDate] - Optional return date, defaults to NOW.
   * @returns {Promise<object|null>} The updated borrowing object.
   */
  static async returnBook(borrowingId, returnDate = new Date()) {
    const borrowing = await Borrowing.findByPk(borrowingId);
    if (!borrowing) {
      throw new Error('Borrowing record not found.');
    }
    if (borrowing.return_date) {
      throw new Error('Book has already been returned.');
    }

    let fineAmount = borrowing.fine_amount || 0; // Keep existing fine or start at 0

    // Basic fine calculation: $1 per day overdue
    // Ensure due_date is a Date object for comparison
    const dueDate = new Date(borrowing.due_date);
    if (returnDate > dueDate) {
      const diffTime = Math.abs(returnDate - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fineAmount += diffDays * 1.00; // Add $1 per day overdue to any existing fine
    }

    await borrowing.update({
      return_date: returnDate,
      fine_amount: fineAmount,
    });
    return borrowing.toJSON();
  }
}

export default BorrowingService;
