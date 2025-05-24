import express from 'express';
import userController from '../controllers/UserController.js'; // Assuming UserController.js exists in ../controllers/
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'; // Assuming authMiddleware.js exists

const router = express.Router();

// --- Public & General User Routes ---

/**
 * @route GET /user/status
 * @desc Check user login status
 * @access Public
 */
router.get('/status', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false, message: 'User not authenticated' });
  }
});

/**
 * @route GET /user/profile
 * @desc Get current user profile (based on session)
 * @access Private (requires authentication)
 */
router.get('/profile', requireAuth, userController.getProfile);

/**
 * @route POST /user/signup
 * @desc Register a new user
 * @access Public
 */
router.post('/signup', userController.signup);

/**
 * @route POST /user/login
 * @desc Authenticate user and establish session
 * @access Public
 */
router.post('/login', userController.login);

/**
 * @route POST /user/logout
 * @desc Logout user and clear session
 * @access Private (requires authentication)
 */
router.post('/logout', requireAuth, userController.logout);


router.patch('/change-password', requireAuth, userController.changePassword);

// --- Admin User Management Routes ---
// These should be protected by requireAuth and requireRole('admin')

/**
 * @route GET /user/ (Admin)
 * @desc Get all users
 * @access Private/Admin
 */
router.get('/', requireAuth, requireRole('admin'), userController.getAllUsers);

/**
 * @route POST /user/ (Admin)
 * @desc Admin creates a new user
 * @access Private/Admin
 */
router.post('/', requireAuth, requireRole('admin'), userController.createUser);

/**
 * @route GET /user/admin-check (Example admin-only check, if needed separately)
 * @desc Example admin-only route
 * @access Private/Admin
 */
router.get('/admin-check', requireAuth, requireRole('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin access granted',
    user: req.session.user
  });
});

// --- Dynamic routes for specific user (MUST come AFTER more specific static/root routes) ---

/**
 * @route GET /user/:id
 * @desc Get a specific user's profile by their ID (can be used by admin or user for self)
 * @access Private (further checks might be in controller)
 */
router.get('/:id', requireAuth, userController.getProfileById); // Renamed to avoid confusion with /profile for self

/**
 * @route PUT /user/:id (Admin)
 * @desc Admin updates a user
 * @access Private/Admin
 */
router.put('/:id', requireAuth, requireRole('admin'), userController.updateUser);

/**
 * @route DELETE /user/:id (Admin)
 * @desc Admin deletes a user
 * @access Private/Admin
 */
router.delete('/:id', requireAuth, requireRole('admin'), userController.deleteUser);


export default router;
