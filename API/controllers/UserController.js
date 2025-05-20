// src/controllers/userController.js
import UserService from '../services/UserService.js';
class AuthController {
  /**
   * Handle user signup
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async signup(req, res) {
    try {
      // Extract user data from request body
      const { full_name, email, password, date_of_birth, phone_number, role } = req.body;
      
      // Validate required fields
      if (!full_name || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Full name, email, and password are required' 
        });
      }
      
      // Create user via service
      const user = await UserService.signup({
        full_name,
        email,
        password,
        date_of_birth,
        phone_number,
        role
      });
      
      // Set up session for the new user
      req.session.auth = true;
      req.session.user = {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        roles: [user.role] // Format expected by requireRole middleware
      };
      
      // Return success response
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
      
      // Return appropriate error response
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
      
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email and password are required' 
        });
      }
      
      // Authenticate user via service
      const user = await UserService.login(email, password);
      
      // Set up session for the authenticated user
      req.session.auth = true;
      req.session.user = {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        roles: [user.role] // Format expected by requireRole middleware
      };
      
      // Return success response
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
      
      // Return appropriate error response
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
      // Destroy the session
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Failed to logout'
          });
        }
        
        // Clear the session cookie
        res.clearCookie('connect.sid');
        
        // Return success response
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    } catch (error) {
      console.error('Logout error:', error);
      
      // Return error response
      return res.status(500).json({
        success: false,
        message: 'Failed to logout'
      });
    }
  }

  /**
   * Get the current user's profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProfile(req, res) {
    try {
    const userId = req.params.id;
    // Validate userId (optional, e.g., check if number)
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Get user profile from service
    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return user profile (exclude sensitive info like password)
    return res.status(200).json({
      success: true,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        date_of_birth: user.date_of_birth,
        phone_number: user.phone_number,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Get profile by ID error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
}

export default new AuthController();
