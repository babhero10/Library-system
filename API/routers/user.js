// src/routes/userRoutes.js
import express from 'express';
import userController from '../controllers/UserController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/:id', userController.getProfile);

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

router.post('/signup', userController.signup);

export default router;
