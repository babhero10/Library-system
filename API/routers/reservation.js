// src/routes/userRoutes.js
import express from 'express';
import userController from '../controllers/ReservationController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
  .post(requireAuth, (req, res) => {
  })



