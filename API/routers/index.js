// src/routes/index.js
import express from 'express';
import userRoutes from './userRoutes';

const router = express.Router();

// API routes
router.use('/api/users', userRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Catch-all route for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

export default router;