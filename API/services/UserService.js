// src/services/userService.js
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class UserService {
  /**
   * Create a new user account
   * @param {Object} userData - User data including password
   * @returns {Promise<Object>} - Created user object (without password)
   */
async signup(userData) {
  try {
    const { password } = userData; // extract password

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user with hashed password
    const user = await User.create({
      full_name: userData.full_name,
      email: userData.email,
      password_hash,
      date_of_birth: userData.date_of_birth,
      phone_number: userData.phone_number,
      role: userData.role || 'user', // Default to 'user' if not specified
    });

    // Return user without sensitive data
    return user;
    } catch (error) {
      // Handle specific errors, such as duplicate email
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Email address is already registered');
      }
      
      // Handle validation errors
      if (error.name === 'SequelizeValidationError') {
        throw new Error(error.errors[0].message);
      }
      
      throw error;
    }
  }

  /**
   * Authenticate a user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User object if authenticated
   */
  async login(email, password) {
    try {
      // Use the withPassword scope to include the password_hash field
      const user = await User.scope('withPassword').findOne({
        where: { email, is_active: true }
      });

      // If user not found or account is inactive
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Compare password with stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Return user without password_hash (using default scope)
      return await User.findByPk(user.user_id);
    } catch (error) {
      throw error;
    }
  }
/**
 * Get user by ID
 * @param {number} userId
 * @returns {Promise<Object|null>} - User object or null if not found
 */
async getUserById(userId) {
  const user = await User.findByPk(userId);
  return user;
}

  /**
   * Get user profile by ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>} - User object
   */
 async getProfile(req, res) {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: no user session found' });
    }
    const userId = req.session.user.user_id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        date_of_birth: user.date_of_birth,
        phone_number: user.phone_number,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('getProfile error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


}

export default new UserService();
