// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import { getAllBooks, API_BASE_URL } from '../services/apiService'; // Import API_BASE_URL
import '../styles/HomePage.css';

// Helper function to construct full image URLs using the imported API_BASE_URL
// This function assumes API_BASE_URL does NOT have a trailing slash.
const constructFullImageUrl = (relativePathFromServer) => {
  if (!relativePathFromServer) {
    return '/default-book-cover.png'; // Path to a default cover in your frontend's public folder
  }
  // If the path from server somehow already became a full URL (less likely with your setup)
  if (relativePathFromServer.startsWith('http://') || relativePathFromServer.startsWith('https://')) {
    return relativePathFromServer;
  }
  // Ensure relativePathFromServer starts with a '/' if it doesn't, to avoid issues with path.join logic
  const pathSegment = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
  
  // API_BASE_URL is 'http://localhost:8000' (no trailing slash from apiService.js)
  return `${API_BASE_URL}${pathSegment}`; 
};

const LoadingIndicator = () => <p className="loading-message">Loading books...</p>;
const ErrorMessage = ({ message }) => <p className="error-message">{message}</p>;

function HomePage() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooksAndCategorize = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getAllBooks(1, 100); // Fetch books
        
        if (result.success && result.data && Array.isArray(result.data.books)) {
          const processedBooks = result.data.books.map(book => ({
            id: book.book_id,
            // Use the helper to construct the full URL for the image
            imageSrc: constructFullImageUrl(book.cover_image_url), 
            title: book.title,
            bookPathId: String(book.book_id),
            genre: book.genre, 
          }));
          
          // Categorization logic (same as before)
          setTrendingBooks(processedBooks.slice(0, 10));
          setFictionBooks(
            processedBooks.filter(book => 
              (typeof book.genre === 'string' && book.genre.toLowerCase().includes('fiction')) ||
              (Array.isArray(book.genre) && book.genre.some(g => typeof g === 'string' && g.toLowerCase().includes('fiction')))
            ).slice(0, 10)
          );
          setRomanceBooks(
            processedBooks.filter(book => 
              (typeof book.genre === 'string' && book.genre.toLowerCase().includes('romance')) ||
              (Array.isArray(book.genre) && book.genre.some(g => typeof g === 'string' && g.toLowerCase().includes('romance')))
            ).slice(0, 10)
          );

        } else {
          setError(result.error || 'Could not fetch books data or data format is incorrect.');
          setTrendingBooks([]); setFictionBooks([]); setRomanceBooks([]);
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setError(err.message || 'An error occurred while loading books.');
        setTrendingBooks([]); setFictionBooks([]); setRomanceBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksAndCategorize();
  }, []); // Empty dependency array, run once on mount

  // ... (Loading, Error, No Books to Show JSX remains the same) ...
  if (isLoading) { /* ... */ }
  if (error) { /* ... */ }
  const noBooksToShow = trendingBooks.length === 0 && fictionBooks.length === 0 && romanceBooks.length === 0;
  if (noBooksToShow && !isLoading) { /* ... */ }

  return (
    <div className="page-container">
      <main className="homepage-content">
        {trendingBooks.length > 0 && (
          <BookList title="Trending Now" books={trendingBooks} listId="trending" />
        )}
        {fictionBooks.length > 0 && (
          <BookList title="Fiction Favorites" books={fictionBooks} listId="fiction" />
        )}
        {romanceBooks.length > 0 && (
          <BookList title="Popular Romance" books={romanceBooks} listId="romance" />
        )}
      </main>
    </div>
  );
}

export default HomePage;
