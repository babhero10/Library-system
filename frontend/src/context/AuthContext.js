// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// Import your API service functions with their correct names
import {
  checkUserStatus, // Assuming this is exported from apiService.js
  loginAPI,        // Assuming this is exported from apiService.js
  logoutAPI        // Assuming this is exported from apiService.js
} from '../services/apiService'; // Ensure this path is correct

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Holds the user object or null
  const [isLoading, setIsLoading] = useState(true);    // True while checking initial auth status

  // Function to fetch and set user status
  // useCallback is used here to memoize the function so it doesn't change on every render
  // unless its dependencies change (which are none in this case, so it's stable).
  const fetchUserStatus = useCallback(async () => {
    setIsLoading(true); // Indicate loading when this function is called
    try {
      const data = await checkUserStatus(); // Call the API service function
      if (data && data.loggedIn && data.user) {
        setCurrentUser(data.user); // API confirms user is logged in and provides user data
      } else {
        setCurrentUser(null); // User is not logged in or data is malformed
      }
    } catch (error) {
      // Error could be network issue or API returning an error status
      console.error('AuthContext: Error fetching user status:', error.message);
      setCurrentUser(null); // Assume not logged in on error
    } finally {
      setIsLoading(false); // Finished loading/checking status
    }
  }, []); // Empty dependency array means this function is created once

  // Check user status on initial app load
  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]); // fetchUserStatus is stable due to useCallback

  // Login function
  const login = async (email, password) => {
    try {
      const data = await loginAPI(email, password); // Call the API service function
      if (data && data.user) { // Backend login was successful and returned user data
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        // This case could mean login was "successful" (e.g., 200 OK) but API didn't return user
        // or returned a specific message.
        setCurrentUser(null); // Ensure user is not set if login wasn't fully successful
        return { success: false, message: data.message || "Login successful but no user data received." };
      }
    } catch (error) {
      // Error thrown by loginAPI (e.g., wrong credentials, server error)
      console.error('AuthContext: Login error:', error.message);
      setCurrentUser(null);
      return { success: false, message: error.message || 'An error occurred during login.' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutAPI(); // Call the API service function
      // API call successful (e.g., session destroyed on backend)
    } catch (error) {
      // Error during API call to logout endpoint
      console.error('AuthContext: Logout error:', error.message);
      // We will still clear the user on the client-side for UX consistency
    } finally {
      setCurrentUser(null); // Always clear user state on client after logout attempt
    }
  };

  // The value provided to consuming components
  const value = {
    currentUser,
    isLoading, // Components can use this to show loading UIs
    login,
    logout,
    refreshUserStatus: fetchUserStatus, // Expose function to manually re-check status
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Loading Application...</div>} 
      {/* Or a more sophisticated loading spinner. 
          This ensures children are only rendered after initial auth check. 
          Alternatively, always render children and let them handle isLoading individually.
      */}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
