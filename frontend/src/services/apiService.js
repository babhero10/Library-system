// src/services/apiService.js

// Basic configuration for your API
// Adjust '/api' if your backend is on a different port during development
// and you haven't set up a proxy in package.json.
// If proxied, '/api' will correctly hit your backend.
const API_BASE_URL = 'http://localhost:8000'; 

// Helper for handling API responses and errors
const handleResponse = async (response) => {
  // If the response is not OK (status code 200-299), try to parse error from JSON body
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json(); // Try to get error message from backend
    } catch (e) {
      // If response is not JSON or empty, use statusText
      errorData = { message: response.statusText || `HTTP error! status: ${response.status}` };
    }
    // Throw an error with the message from backend or a generic one
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  // If response is OK, parse and return the JSON data
  return response.json();
};

// --- Authentication Related API Calls ---
// (These might be in AuthContext directly or called from there)

// Example: Check User Status (if you keep it here instead of AuthContext)
export const checkUserStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/user/status`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important for session cookies
  });
  return handleResponse(response);
};

// Example: Login User (if you keep it here instead of AuthContext)
export const loginAPI = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, { // Adjust your API endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Important for session cookies
  });
  return handleResponse(response); // Assumes login returns user data or success message
};

// Example: Logout User (if you keep it here instead of AuthContext)
export const logoutAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/user/logout`, { // Adjust your API endpoint
    method: 'POST',
    credentials: 'include', // Important for session cookies
  });
  // Logout might not return JSON, or might return a simple success message
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText || `HTTP error! status: ${response.status}` };
    }
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return { success: true, message: "Logged out successfully" }; // Or whatever your API returns
};


// --- User/Account Related API Calls ---
export const signupUser = async (userData) => {
  // userData should be an object like:
  // { name: "Full Name", email: "test@example.com", password: "...", phoneNumber: "...", dateOfBirth: "..." }
  // Ensure field names match what your backend API expects for signup.
  const response = await fetch(`${API_BASE_URL}/user/signup`, { // Adjust your API endpoint for signup
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    // credentials: 'include', // Usually not needed for signup itself,
                              // but if signup auto-logins and sets a session, then yes.
  });
  return handleResponse(response); // Assumes signup returns user data or success message
};


// --- Book Related API Calls ---
export const getBookById = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/book/${bookId}`, {
    // credentials: 'include', // If book details depend on user session (e.g., personalized recommendations)
  });
  return handleResponse(response);
};

export const searchBooks = async (query) => {
  // Example: /api/books?search=yourquery or /api/search/books?q=yourquery
  // Adjust the endpoint based on your API design
  const response = await fetch(`${API_BASE_URL}/book/search?q=${encodeURIComponent(query)}`, {
    // credentials: 'include',
  });
  return handleResponse(response);
};


// --- Author Related API Calls ---
export const getAuthorById = async (authorId) => {
  const response = await fetch(`${API_BASE_URL}/author/${authorId}`, {
    // credentials: 'include',
  });
  return handleResponse(response);
};

export const getBooksByAuthor = async (authorId) => {
  const response = await fetch(`${API_BASE_URL}/author/${authorId}/books`, {
    // credentials: 'include',
  });
  return handleResponse(response);
};


// --- Reservation Related API Calls ---
export const createReservation = async (reservationData) => {
  // reservationData might include { bookId, userId (from session), reserveDate }
  const response = await fetch(`${API_BASE_URL}/reservation`, { // Adjust endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`, // If using token-based auth
    },
    body: JSON.stringify(reservationData),
    credentials: 'include', // Crucial if using session cookies for auth
  });
  return handleResponse(response);
};

// Add more API functions as needed (e.g., fetching all books, updating user profile, etc.)
