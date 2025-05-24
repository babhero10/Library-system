// src/controllers/userController.js
import UserService from '../services/UserService.js';

class UserController { // Renamed from AuthController for broader scope
  /**
   * Handle user signup
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async signup(req, res) {
    try {
      const { fullName, email, password, birthDate, phone, role } = req.body; // Match frontend keys

      if (!fullName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full name, email, and password are required'
        });
      }

      const user = await UserService.signup({
        full_name: fullName, // Map to backend convention
        email,
        password,
        date_of_birth: birthDate,
        phone_number: phone,
        role
      });

      req.session.auth = true;
      req.session.user = {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        roles: [user.role]
      };

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(400).json({
        success: false,
        message: error.message || 'Failed to register user'
      });
    }
  }

  /**
   * Handle user login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      const user = await UserService.login(email, password);

      req.session.auth = true;
      req.session.user = {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        roles: [user.role]
      };

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(401).json({
        success: false,
        message: error.message || 'Authentication failed'
      });
    }
  }

  /**
   * Handle user logout
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async logout(req, res) {
    try {
      req.session.destroy(err => {
        if (err) {
          console.error('Logout session destroy error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to logout due to server error'
          });
        }
        res.clearCookie('sessionId'); // Use your actual session cookie name
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to logout'
      });
    }
  }

  /**
   * Get the current user's profile (based on session)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProfile(req, res) { // This is for /user/profile (current user)
    try {
      if (!req.session.user || !req.session.user.user_id) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }
      const userId = req.session.user.user_id;
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User profile not found' });
      }

      return res.status(200).json({
        success: true,
        user: { // Ensure you send consistent field names to frontend
          id: user.user_id, // or user_id
          fullName: user.full_name,
          email: user.email,
          birthDate: user.date_of_birth,
          phone: user.phone_number,
          role: user.role,
          createdAt: user.created_at
        }
      });
    } catch (error) {
      console.error('GetProfile (current user) error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error retrieving profile' });
    }
  }

  /**
   * Get a specific user's profile by ID (for /user/:id)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProfileById(req, res) { // This is for /user/:id
    try {
      const userId = req.params.id;
      if (!userId || isNaN(parseInt(userId))) { // Basic validation
        return res.status(400).json({ success: false, message: 'Valid User ID is required' });
      }

      const user = await UserService.getUserById(parseInt(userId));

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({
        success: true,
        user: { // Map to frontend preferred names
          id: user.user_id,
          fullName: user.full_name,
          email: user.email,
          birthDate: user.date_of_birth, // Ensure format is good for frontend
          phone: user.phone_number,
          role: user.role,
          isActive: user.is_active, // Important for admin view
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      });
    } catch (error) {
      console.error('Get profile by ID error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error retrieving user' });
    }
  }


  // --- Admin User Management Controllers ---

  /**
   * Get all users (Admin)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllUsers(req, res) {
    try {
      // Add query params for pagination, filtering, sorting later if needed
      // const { page = 1, limit = 10, sortBy = 'full_name', sortOrder = 'ASC', search = '' } = req.query;
      // const queryOptions = {
      //   limit: parseInt(limit),
      //   offset: (parseInt(page) - 1) * parseInt(limit),
      //   order: [[sortBy, sortOrder.toUpperCase()]],
      //   // where: search ? { full_name: { [Op.iLike]: `%${search}%` } } : {} // Example search
      // };

      const users = await UserService.getAllUsers(/* queryOptions */);
      const formattedUsers = users.map(user => ({ // Map to frontend preferred names
        id: user.user_id,
        fullName: user.full_name,
        email: user.email,
        birthDate: user.date_of_birth,
        phone: user.phone_number,
        role: user.role,
        isActive: user.is_active,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }));
      return res.status(200).json({
        success: true,
        users: formattedUsers
        // Add pagination info if implementing: totalPages, currentPage, totalUsers
      });
    } catch (error) {
      console.error('GetAllUsers error:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve users' });
    }
  }

  /**
   * Create a new user (Admin)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createUser(req, res) {
    try {
      // Match frontend keys: fullName, email, password, birthDate, phone, role
      const { fullName, email, password, birthDate, phone, role, isActive } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full name, email, and password are required for creating a user.'
        });
      }
      // Add more validation as needed (e.g., password strength, email format on backend too)

      const newUser = await UserService.createUserByAdmin({
        full_name: fullName,
        email,
        password,
        date_of_birth: birthDate,
        phone_number: phone,
        role: role || 'user',
        is_active: isActive !== undefined ? isActive : true
      });

      return res.status(201).json({
        success: true,
        message: 'User created successfully by admin.',
        user: { // Map to frontend preferred names
          id: newUser.user_id,
          fullName: newUser.full_name,
          email: newUser.email,
          role: newUser.role,
          isActive: newUser.is_active
        }
      });
    } catch (error) {
      console.error('Admin CreateUser error:', error);
      return res.status(400).json({ // Could be 400 for validation, 500 for other
        success: false,
        message: error.message || 'Failed to create user.'
      });
    }
  }

  /**
   * Update a user (Admin)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      // Frontend sends: fullName, email, password (optional), birthDate, phone, role, isActive
      const { fullName, email, password, birthDate, phone, role, isActive } = req.body;

      if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ success: false, message: 'Valid User ID is required in path.' });
      }

      const updateData = {
        full_name: fullName,
        email,
        date_of_birth: birthDate,
        phone_number: phone,
        role,
        is_active: isActive
      };

      // Only include password if provided and not empty
      if (password && password.trim() !== '') {
        updateData.password = password;
      }

      // Remove undefined fields so they don't overwrite existing data with null/undefined
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);


      const updatedUser = await UserService.updateUserByAdmin(parseInt(userId), updateData);

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found or no changes made.' });
      }

      return res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        user: { // Map to frontend preferred names
            id: updatedUser.user_id,
            fullName: updatedUser.full_name,
            email: updatedUser.email,
            role: updatedUser.role,
            isActive: updatedUser.is_active
        }
      });
    } catch (error) {
      console.error('Admin UpdateUser error:', error);
      return res.status(400).json({ // Could be 400 for validation, 404, or 500
        success: false,
        message: error.message || 'Failed to update user.'
      });
    }
  }

  /**
   * Delete a user (Admin)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ success: false, message: 'Valid User ID is required.' });
      }

      const success = await UserService.deleteUserByAdmin(parseInt(userId));

      if (!success) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      return res.status(200).json({ success: true, message: 'User deleted (deactivated) successfully.' });
    } catch (error) {
      console.error('Admin DeleteUser error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete user.'
      });
    }
  }
    /**
   * Handle user changing their own password
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // User ID should come from the authenticated session
      if (!req.session.user || !req.session.user.user_id) {
        return res.status(401).json({ success: false, message: 'Authentication required.' });
      }
      const userId = req.session.user.user_id;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
      }
      // Add any other validation for newPassword strength if desired (e.g., length)
      if (newPassword.length < 6) { // Example: Consistent with frontend validation
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
      }
      if (currentPassword === newPassword) {
        return res.status(400).json({ success: false, message: 'New password cannot be the same as the current password.' });
      }

      // Call the service to perform the password change
      await UserService.changeUserPassword(userId, currentPassword, newPassword);

      // Password changed successfully.
      // It's a good security practice to destroy the current session,
      // forcing the user to log in again with the new password.
      req.session.destroy(err => {
        if (err) {
          console.error('Session destruction failed after password change:', err);
          // Even if session destruction fails, password was changed.
          // Inform user, but this is a server-side hiccup.
          return res.status(200).json({ 
            success: true, 
            message: 'Password updated successfully, but failed to clear session. Please log out and log in again.' 
          });
        }
        res.clearCookie('sessionId'); // Ensure this matches your session cookie name
        return res.status(200).json({ 
          success: true, 
          message: 'Password updated successfully. Please log in again.' 
        });
      });

    } catch (error) {
      console.error('Change Password Controller Error:', error);
      // The UserService.changeUserPassword should throw specific errors
      // (e.g., for incorrect current password, user not found)
      // We can check for a statusCode property on the error if the service sets it
      const statusCode = error.statusCode || 400; // Default to 400 if not specified
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to change password due to an unexpected error.'
      });
    }
  }
}


export default new UserController();
