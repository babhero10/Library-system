// src/controllers/BorrowingController.js
import BorrowingService from '../services/BorrowingService.js';

class BorrowingController {
  static async create(req, res) {
    try {
      // Ensure user_id, book_id, due_date are provided
      const { user_id, book_id, due_date, notes } = req.body;
      if (!user_id || !book_id || !due_date) {
        return res.status(400).json({ error: 'user_id, book_id, and due_date are required.' });
      }
      
      const borrowingData = { user_id, book_id, due_date, notes };
      const newBorrowing = await BorrowingService.createBorrowing(borrowingData);
      res.status(201).json(newBorrowing);
    } catch (error) {
      if (error.message.includes('not found') || error.message.includes('not available')) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('required')) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error creating borrowing:', error);
      res.status(500).json({ error: 'Failed to create borrowing record.' });
    }
  }

  static async getAll(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        user_id: req.query.user_id,
        book_id: req.query.book_id,
        is_returned: req.query.is_returned !== undefined ? req.query.is_returned === 'true' : undefined,
      };
      const result = await BorrowingService.getAllBorrowings(options);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching borrowings:', error);
      res.status(500).json({ error: 'Failed to fetch borrowings.' });
    }
  }

  static async getById(req, res) {
    try {
      const borrowingId = parseInt(req.params.id, 10);
      if (isNaN(borrowingId)) {
        return res.status(400).json({ error: 'Invalid borrowing ID format.' });
      }
      const borrowing = await BorrowingService.getBorrowingById(borrowingId);
      if (!borrowing) {
        return res.status(404).json({ error: 'Borrowing record not found.' });
      }
      res.status(200).json(borrowing);
    } catch (error) {
      console.error('Error fetching borrowing by ID:', error);
      res.status(500).json({ error: 'Failed to fetch borrowing record.' });
    }
  }

  static async update(req, res) {
    try {
      const borrowingId = parseInt(req.params.id, 10);
      if (isNaN(borrowingId)) {
        return res.status(400).json({ error: 'Invalid borrowing ID format.' });
      }
      
      const updateData = req.body; // e.g., { due_date, return_date, fine_amount, notes }
      const updatedBorrowing = await BorrowingService.updateBorrowing(borrowingId, updateData);
      
      if (!updatedBorrowing) {
        return res.status(404).json({ error: 'Borrowing record not found.' });
      }
      res.status(200).json(updatedBorrowing);
    } catch (error) {
      console.error('Error updating borrowing:', error);
      res.status(500).json({ error: 'Failed to update borrowing record.' });
    }
  }

  static async delete(req, res) {
    try {
      const borrowingId = parseInt(req.params.id, 10);
      if (isNaN(borrowingId)) {
        return res.status(400).json({ error: 'Invalid borrowing ID format.' });
      }
      const wasDeleted = await BorrowingService.deleteBorrowing(borrowingId);
      if (!wasDeleted) {
        return res.status(404).json({ error: 'Borrowing record not found.' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error deleting borrowing:', error);
      res.status(500).json({ error: 'Failed to delete borrowing record.' });
    }
  }

  static async markAsReturned(req, res) {
    try {
      const borrowingId = parseInt(req.params.id, 10);
      if (isNaN(borrowingId)) {
        return res.status(400).json({ error: 'Invalid borrowing ID format.' });
      }

      const { return_date } = req.body; // Optional: allow specific return date
      const returnDateObj = return_date ? new Date(return_date) : new Date();
      if (isNaN(returnDateObj.getTime())) {
          return res.status(400).json({ error: 'Invalid return_date format.' });
      }

      const updatedBorrowing = await BorrowingService.returnBook(borrowingId, returnDateObj);
      res.status(200).json(updatedBorrowing);
    } catch (error) {
      if (error.message.includes('not found') || error.message.includes('already been returned')) {
        return res.status(404).json({ error: error.message });
      }
      console.error('Error marking book as returned:', error);
      res.status(500).json({ error: 'Failed to mark book as returned.' });
    }
  }
}

export default BorrowingController;
