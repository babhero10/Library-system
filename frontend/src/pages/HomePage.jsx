// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import { getAllBooks, API_BASE_URL } from '../services/apiService'; // Import API_BASE_URL
import '../styles/HomePage.css';

// Helper function to construct full image URLs
const constructFullImageUrl = (relativePathFromServer) => {
  if (!relativePathFromServer) {
    return `${process.env.PUBLIC_URL}/default-book-cover.png`;
  }
  if (relativePathFromServer.startsWith('http://') || relativePathFromServer.startsWith('https://')) {
    return relativePathFromServer;
  }
  const pathSegment = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
  return `${API_BASE_URL}${pathSegment}`;
};

const LoadingIndicator = () => <p className="loading-message">Loading books, please wait...</p>;
const ErrorMessage = ({ message }) => <p className="error-message api-error-message">{message}</p>;

function HomePage() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  // State to hold books grouped by genre: { "Science Fiction": [book1, book2], "Romance": [book3, book4], ... }
  const [booksByGenre, setBooksByGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooksAndCategorize = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getAllBooks(1, 200); // Fetch more books to have enough for various genres
        
        if (result.success && result.data && Array.isArray(result.data.books)) {
          const processedBooks = result.data.books.map(book => ({
            id: book.book_id,
            imageSrc: constructFullImageUrl(book.cover_image_url),
            title: book.title,
            bookPathId: String(book.book_id),
            // Crucially, use the genre name from your API response
            genre: book.genre_name_display || "Uncategorized", // Fallback for books without a genre display name
            // author: book.author_name_display, // If you need author
          }));
          
          // --- "Trending Now" Logic ---
          // For example, take the first 10-15 books as trending, or implement more complex logic
          const shuffledForTrending = [...processedBooks].sort(() => 0.5 - Math.random());
          setTrendingBooks(shuffledForTrending.slice(0, 12)); // Show 12 trending books

          // --- Dynamic Genre Categorization ---
          const genresMap = {};
          processedBooks.forEach(book => {
            const genreName = book.genre; // This should be a string like "Science Fiction"
            if (genreName) {
              if (!genresMap[genreName]) {
                genresMap[genreName] = [];
              }
              // Add book to genre list, but avoid duplicates if a book appears multiple times
              // and limit the number of books per genre for display on homepage
              if (genresMap[genreName].length < 10) { // Show up to 10 books per genre list
                 // Check for duplicates by ID within this specific genre list
                if (!genresMap[genreName].find(b => b.id === book.id)) {
                    genresMap[genreName].push(book);
                }
              }
            }
          });
          setBooksByGenre(genresMap);

        } else {
          setError(result.error || 'Could not fetch books data or data format is incorrect.');
          setTrendingBooks([]);
          setBooksByGenre({});
        }
      } catch (err) {
        console.error("HomePage: Failed to fetch books:", err);
        setError(err.message || 'An error occurred while loading books.');
        setTrendingBooks([]);
        setBooksByGenre({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksAndCategorize();
  }, []);

  if (isLoading) {
    return (
      <div className="page-container homepage-container">
        <main className="homepage-content">
          <LoadingIndicator />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container homepage-container">
        <main className="homepage-content">
          <ErrorMessage message={error} />
        </main>
      </div>
    );
  }

  const noBooksInCategories = Object.keys(booksByGenre).every(genre => booksByGenre[genre].length === 0);
  const noBooksToShow = trendingBooks.length === 0 && noBooksInCategories;

  if (noBooksToShow && !isLoading) {
    return (
      <div className="page-container homepage-container">
        <main className="homepage-content">
          <p className="info-message">No books available at the moment. Please check back later.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container homepage-container">
      <main className="homepage-content">
        {/* Trending Now Section (remains curated or first N books) */}
        {trendingBooks.length > 0 && (
          <BookList
            title="Trending Now"
            books={trendingBooks}
            listId="trending"
          />
        )}

        {/* Dynamically Rendered BookLists for Each Genre */}
        {Object.entries(booksByGenre)
          // Optional: Filter out genres with too few books for display if desired
          // .filter(([genreName, booksInGenre]) => booksInGenre.length > 2) 
          .map(([genreName, booksInGenre]) => {
            if (booksInGenre.length === 0) return null; // Don't render list if no books for this genre
            return (
              <BookList
                key={genreName} // Use genre name as key (ensure it's unique)
                title={genreName} // Display the genre name as the title
                books={booksInGenre}
                listId={`genre-${genreName.toLowerCase().replace(/\s+/g, '-')}`} // Create a unique ID for Swiper
              />
            );
        })}
      </main>
    </div>
  );
}

export default HomePage;
