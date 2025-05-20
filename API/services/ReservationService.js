// src/services/userService.js
import Reservation from '../models/Reservation.js';

class ReservationService {
  async makeReservation() {
    try {

      const newRes = await Reservation.create({
        user_id: 42,
        book_id: 123,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // one week from now
      });
      console.log('Reservation created:', newRes.toJSON());
    } catch (err) {
      console.error('Error making reservation:', err);
    }
  }
}

export default new ReservationService();
