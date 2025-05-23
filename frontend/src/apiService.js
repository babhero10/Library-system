// frontend/src/apiService.js
import axios from 'axios';

// Define your backend API's base URL
// For development, this is your Express server's address
// For production, this will be your deployed backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // IMPORTANT: This tells axios to send cookies
});

// --- Auth Endpoints ---
export const loginUser = (credentials) => apiClient.post('/user/login', credentials);
export const registerUser = (userData) => apiClient.post('/user/signup', userData);
export const logoutUser = () => apiClient.post('/user/logout');
export const checkAuthStatus = () => apiClient.get('/user/status'); // Or '/auth/me'

// --- Book Endpoints (Example) ---
export const getBooks = () => apiClient.get('/books');
export const addBook = (bookData) => apiClient.post('/books', bookData); // Assuming this is a protected route
export const getBookById = (id) => apiClient.get(`/books/${id}`);

// --- Author Endpoints (Example) ---
export const getAuthors = () => apiClient.get('/authors');

// ... add other API functions as needed

// Optional: Interceptors for global error handling or token refresh (not directly needed for sessions)
// apiClient.interceptors.response.use(response => response, error => {
//   if (error.response && error.response.status === 401) {
//     // Handle unauthorized errors, e.g., redirect to login
//     console.error("Unauthorized, redirecting to login");
//     // window.location.href = '/login'; // Or use React Router's navigate
//   }
//   return Promise.reject(error);
// });

export default apiClient;
