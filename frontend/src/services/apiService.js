// src/services/apiService.js

// Basic configuration for your API.
// This is used for constructing full URLs if your frontend makes direct calls
// to a backend on a different origin (e.g., http://localhost:8000)
// and your backend is configured for CORS.
// If you are using a proxy in package.json (e.g., "proxy": "http://localhost:8000"),
// then API_BASE_URL should be relative (e.g., '/api' or just '').
export const API_BASE_URL = 'http://localhost:8000'; // No trailing slash

// Helper for handling API responses and errors
const handleResponse = async (response) => {
  // If the response is not OK (status code outside 200-299 range)
  if (!response.ok) {
    let errorData;
    try {
      // Attempt to parse error details from the response body if it's JSON
      errorData = await response.json();
    } catch (e) {
      // If parsing fails or response body is not JSON, use statusText
      errorData = { message: response.statusText || `HTTP error! Status: ${response.status}` };
    }
    // Throw an error that can be caught by the calling function
    throw new Error(errorData.message || `An unexpected error occurred. Status: ${response.status}`);
  }

  // Handle responses that might not have a JSON body but indicate success
  // e.g., 204 No Content (often used for DELETE or successful logout without data)
  const contentType = response.headers.get("content-type");
  if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
    // For 204 No Content or non-JSON responses, return a success indicator or the raw response.
    // This allows calling functions to know the operation was successful even without a body.
    return { success: true, status: response.status, data: null }; // data: null or {}
  }

  // If response is OK and has JSON content, parse and return it
  return response.json();
};

// --- Authentication Related API Calls ---

export const checkUserStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/user/status`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Crucial for HttpOnly session cookies
  });
  return handleResponse(response); // Expects { loggedIn: boolean, user?: object }
};

export const loginAPI = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  return handleResponse(response); // Expects { user: object, message?: string } or error
};

export const logoutAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/user/logout`, {
    method: 'POST', // Or GET, depending on your backend
    credentials: 'include',
  });
  return handleResponse(response); // Will return { success: true, status: 20x } or throw error
};

// --- User/Account Related API Calls ---
export const signupUser = async (userData) => {
  // userData: { name, email, password, phoneNumber, dateOfBirth }
  // Ensure field names match backend expectations.
  const response = await fetch(`${API_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    // credentials: 'include', // If signup auto-logins and sets a session cookie
  });
  return handleResponse(response); // Expects { user: object, message?: string } or error
};

// --- Book Related API Calls ---
export const getAllBooks = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_BASE_URL}/book?page=${page}&limit=${limit}`, {
    // credentials: 'include', // If book list depends on user session
  });
  return handleResponse(response); // Expects { data: { books: [], ...pagination } }
};

export const getBookById = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/book/${bookId}`, {
    // credentials: 'include',
  });
  return handleResponse(response); // Expects book object or error
};

export const searchBooks = async (searchQuery, page = 1, limit = 10) => {
  // Example API: /book/search?q=query&page=1&limit=10
  // Adjust endpoint and parameters based on your backend's search API design.
  const queryParams = new URLSearchParams({
    q: searchQuery,
    page: page.toString(),
    limit: limit.toString(),
  });
  const response = await fetch(`${API_BASE_URL}/book/search?${queryParams.toString()}`, {
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

export const getBooksByAuthor = async (authorId, page = 1, limit = 10) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  const response = await fetch(`${API_BASE_URL}/author/${authorId}/books?${queryParams.toString()}`, {
    // credentials: 'include',
  });
  return handleResponse(response);
};

// --- Reservation Related API Calls ---
export const createReservation = async (reservationData) => {
  // reservationData: { bookId, reserveDate }
  // Backend will get userId from session.
  const response = await fetch(`${API_BASE_URL}/reserve`, { // Endpoint was /reservation in your file, ensure consistency
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservationData),
    credentials: 'include', // Crucial for session-based auth
  });
  return handleResponse(response);
};

// --- Genre Related API Calls (Example, if needed separately) ---
export const getAllGenres = async () => {
  const response = await fetch(`${API_BASE_URL}/book/meta/genres`, { // From your BookController
    // credentials: 'include',
  });
  return handleResponse(response); // Expects { success: true, data: ['Genre1', 'Genre2'] }
};


// Add more API functions as your application grows:
// - Fetching user's reservations
// - Updating user profile
// - Admin panel functions (if any from frontend)
// - etc.
