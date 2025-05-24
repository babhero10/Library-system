// src/services/userService.js
import bcrypt from 'bcrypt'; // Use bcryptjs consistently if that's what you have installed
import User from '../models/User.js'; // Assuming this is your Sequelize User model
import { Op } from 'sequelize'; // For more complex queries if needed

class UserService {
  /**
   * Create a new user account (typically for public signup)
   * @param {Object} userData - User data including password
   * @returns {Promise<Object>} - Created user object (without password_hash)
   */
  async signup(userData) {
    try {
      const { password, role, ...otherData } = userData;

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        ...otherData,
        password_hash,
        role: role || 'user', // Default to 'user' if not specified
        is_active: true, // New users are active by default
      });

      // Return user using default scope (which should exclude password_hash)
      return await User.findByPk(user.user_id);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Email address is already registered');
      }
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        throw new Error(`Validation failed: ${messages}`);
      }
      console.error('UserService.signup error:', error);
      throw new Error('Failed to register user due to a server error.');
    }
  }

  /**
   * Authenticate a user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User object if authenticated (without password_hash)
   */
  async login(email, password) {
    try {
      const user = await User.scope('withPassword').findOne({
        where: { email, is_active: true }
      });

      if (!user) {
        throw new Error('Invalid email or password, or account is inactive.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
      }

      // Return user using default scope
      return await User.findByPk(user.user_id);
    } catch (error) {
      console.error('UserService.login error:', error);
      if (error.message.startsWith('Invalid email or password')) {
        throw error;
      }
      throw new Error('Authentication failed due to a server error.');
    }
  }

  /**
   * Get user by ID
   * @param {number} userId
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user; // Sequelize returns null if not found
    } catch (error) {
      console.error(`UserService.getUserById error for ID ${userId}:`, error);
      throw new Error('Failed to retrieve user due to a server error.');
    }
  }

  // --- Admin Specific User Management Methods ---

  /**
   * Get all users (for admin)
   * @param {object} queryOptions - Optional query parameters (e.g., for pagination, filtering)
   * @returns {Promise<Array<Object>>} - Array of user objects
   */
  async getAllUsers(queryOptions = {}) {
    try {
      // Example: queryOptions could include { limit, offset, sortBy, sortOrder, search }
      // For simplicity, just fetching all active users for now.
      // Ensure your default scope for User model excludes password_hash.
      const users = await User.findAll({
        where: { is_active: true }, // Or remove this if admins should see inactive users too
        order: [['full_name', 'ASC']], // Example ordering
        ...queryOptions // Spread any pagination/filtering options
      });
      return users;
    } catch (error) {
      console.error('UserService.getAllUsers error:', error);
      throw new Error('Failed to retrieve users due to a server error.');
    }
  }

  /**
   * Create a user (by admin)
   * @param {Object} userData - User data including password
   * @returns {Promise<Object>} - Created user object (without password_hash)
   */
  async createUserByAdmin(userData) {
    try {
      const { password, role, ...otherData } = userData;

      if (!password) {
        throw new Error('Password is required when creating a user.');
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        ...otherData,
        password_hash,
        role: role || 'user',
        is_active: userData.is_active !== undefined ? userData.is_active : true, // Admin can set active status
      });

      return await User.findByPk(user.user_id);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Email address is already registered.');
      }
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        throw new Error(`Validation failed: ${messages}`);
      }
      console.error('UserService.createUserByAdmin error:', error);
      throw new Error('Failed to create user due to a server error.');
    }
  }

  /**
   * Update a user (by admin)
   * @param {number} userId - ID of the user to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} - Updated user object or null if not found
   */
  async updateUserByAdmin(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return null; // Or throw new Error('User not found');
      }

      const { password, ...otherUpdateData } = updateData;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        otherUpdateData.password_hash = await bcrypt.hash(password, salt);
      }

      // Prevent changing certain fields if necessary, e.g., email if it's a primary identifier.
      // For simplicity, allowing all here.
      await user.update(otherUpdateData);

      // Re-fetch to ensure we get the instance with default scope (no password_hash)
      return await User.findByPk(userId);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.fields.email) {
        throw new Error('Email address is already in use by another account.');
      }
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        throw new Error(`Validation failed: ${messages}`);
      }
      console.error(`UserService.updateUserByAdmin error for ID ${userId}:`, error);
      throw new Error('Failed to update user due to a server error.');
    }
  }

  /**
   * Delete a user (by admin - soft delete by default)
   * @param {number} userId - ID of the user to delete
   * @returns {Promise<boolean>} - True if deleted, false if not found
   */
  async deleteUserByAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return false;
      }

      // Soft delete:
      await user.update({ is_active: false });
      // Or, for hard delete:
      // await user.destroy();

      return true;
    } catch (error) {
      console.error(`UserService.deleteUserByAdmin error for ID ${userId}:`, error);
      throw new Error('Failed to delete user due to a server error.');
    }
  }
    /**
   * Change a user's password
   * @param {number} userId - The ID of the user
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The new password to set
   * @returns {Promise<void>}
   * @throws {Error} If current password doesn't match, user not found, or DB error
   */
  async changeUserPassword(userId, currentPassword, newPassword) {
    try {
      // Fetch user with their password hash
      const user = await User.scope('withPassword').findByPk(userId);

      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404; // Custom property for controller
        throw error;
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isPasswordValid) {
        const error = new Error('Incorrect current password.');
        error.statusCode = 400; // Bad request due to incorrect credential
        throw error;
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password_hash = newPasswordHash;
      user.updated_at = new Date(); // Manually update if not automatically handled on every save by Sequelize
      await user.save();

      // No explicit return needed on success, or could return true
      return; 

    } catch (error) {
      // If it's one of our custom errors, re-throw it for the controller
      if (error.statusCode) {
        throw error;
      }
      // For other unexpected (e.g., database) errors
      console.error(`UserService.changeUserPassword error for user ID ${userId}:`, error);
      const serviceError = new Error('Failed to update password due to a server issue.');
      serviceError.statusCode = 500;
      throw serviceError;
    }
  }
}

// In src/services/userService.js (or similar)
// const API_BASE_URL = 'http://localhost:8000'; // Your main API base



export default new UserService();
