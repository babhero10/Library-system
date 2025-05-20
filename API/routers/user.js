// src/routes/userRoutes.js
import express from 'express';
import userController from '../controllers/UserController.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
const router = express.Router();

/**
 * @route POST /api/users/signup
 * @desc Register a new user
 * @access Public
 */
router.post('/signup', userController.signup);

/**
 * @route POST /api/users/login
 * @desc Authenticate user and get token
 * @access Public
 */
router.post('/login', userController.login);

/**
 * @route POST /api/users/logout
 * @desc Logout user and clear session
 * @access Private
 */
router.post('/logout', requireAuth, userController.logout);

/**
 * @route GET /api/users/profile
 * @desc Get current user profile
 * @access Private
 */
router.get('/profile', requireAuth, userController.getProfile);

/**
 * @route GET /api/users/admin
 * @desc Example admin-only route
 * @access Private/Admin
 */
router.get('/admin', requireAuth, requireRole('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin access granted',
    user: req.session.user
  });
});
router.post('/signup', async (req, res) => {
  const { full_name, email, password, date_of_birth, phone_number, role } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Full name, email, and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password_hash: hashedPassword,
      date_of_birth,
      phone_number,
      role: role || 'user',
    });

    req.session.user = {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    console.log('User registered successfully:', user.full_name);

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;