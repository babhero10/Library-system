import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // User object or null
  const [isLoading, setIsLoading] = useState(true);    // To check initial status

  // Check user status on initial app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // IMPORTANT: Configure fetch to send credentials (cookies)
        const response = await fetch('/user/status', { // Adjust API path
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Crucial for HttpOnly session cookies
        });

        if (response.ok) {
          const data = await response.json();
          if (data.loggedIn && data.user) {
            setCurrentUser(data.user); // Assuming API returns { loggedIn: true, user: {...} }
          } else {
            setCurrentUser(null);
          }
        } else {
          // Handle non-OK responses (e.g., server error)
          setCurrentUser(null);
          console.error('Failed to fetch user status:', response.statusText);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    // API call to /api/login (adjust path)
    // On success, your HTTP-Only cookie is set by the server.
    // Then, call checkLoginStatus or directly set user if API returns user data on login.
    try {
      const response = await fetch('/user/login', { // Adjust API path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Send cookies with the request
      });

      if (response.ok) {
        const data = await response.json(); // Assuming login returns user data
        if (data.user) {
          setCurrentUser(data.user);
          return { success: true };
        } else {
          // If login successful but no user data, refetch status
          // await checkLoginStatus(); // or trigger a re-check
          // For now, let's assume login returns the user
           return { success: false, message: data.message || "Login successful but no user data returned." };
        }
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login.' };
    }
  };

  const logout = async () => {
    // API call to /api/logout (adjust path)
    // This API endpoint should clear the HTTP-Only session cookie.
    try {
      await fetch('/user/logout', { // Adjust API path
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setCurrentUser(null); // Clear user state on client-side regardless
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    // You might add a function here to refetch user status if needed
    // refreshUserStatus: checkLoginStatus (if you rename checkLoginStatus)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
