// src/pages/BookPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, API_BASE_URL } from '../services/apiService'; // Import getBookById and API_BASE_URL
import '../styles/BookPage.css'; // Ensure this path is correct
import Header from '../components/Header'; // Assuming you have a Header

// Helper function to construct full image URLs
const constructFullImageUrl = (relativePathFromServer) => {
  if (!relativePathFromServer) {
    return `${process.env.PUBLIC_URL}/default-book-cover.png`; // Default cover
  }
  if (relativePathFromServer.startsWith('http://') || relativePathFromServer.startsWith('https://')) {
    return relativePathFromServer;
  }
  const pathSegment = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
  return `${API_BASE_URL}${pathSegment}`;
};

const LoadingIndicator = () => <div className="loading-message">Loading book details...</div>; // Added class for styling
const ErrorMessage = ({ message }) => <div className="error-message api-error-message">{message}</div>; // Added class

const BookPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams(); // Get bookId from URL (e.g., from /book/123)

  const [currentBook, setCurrentBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setError("No book ID provided in URL.");
      setIsLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getBookById(bookId);
        if (result.success && result.data) {
          // Process the fetched book data
          const bookDataFromApi = result.data;
          setCurrentBook({
            id: bookDataFromApi.book_id,
            title: bookDataFromApi.title,
            // Assuming author_name_display and potentially an author_id or slug for linking
            author: bookDataFromApi.author_name_display || "Unknown Author", 
            // You might need an author_id from API to construct authorSlug for navigation
            // authorSlug: bookDataFromApi.author_slug || String(bookDataFromApi.author_id || '').toLowerCase().replace(/\s+/g, '-'),
            authorId: bookDataFromApi.author_id, // If your API provides author_id
            publishYear: bookDataFromApi.publication_year,
            // Use genre_name_display for the genre string
            genre: bookDataFromApi.genre_name_display || "N/A", 
            language: bookDataFromApi.language || "N/A",
            description: bookDataFromApi.description,
            coverImage: constructFullImageUrl(bookDataFromApi.cover_image_url),
            // Store original relative path if needed for sending back to reservation page
            originalCoverPath: bookDataFromApi.cover_image_url 
          });
        } else {
          setError(result.error || `Book with ID ${bookId} not found.`);
          setCurrentBook(null);
        }
      } catch (err) {
        console.error(`BookPage: Failed to fetch book ${bookId}:`, err);
        setError(err.message || "An error occurred while loading book details.");
        setCurrentBook(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]); // Re-fetch if bookId changes

  const handleAuthorClick = () => {
    if (currentBook && currentBook.authorId) { // Navigate using authorId
      navigate(`/author/${currentBook.authorId}`);
    } else if (currentBook && currentBook.author) {
        console.warn("Author ID not available for navigation, attempting navigation with author name (slug would be better).")
        // Fallback if only name is available, less reliable
        // navigate(`/author/${currentBook.author.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const handleBorrowClick = () => {
    if (currentBook) {
      // Pass the original relative cover path (if available) or the full URL
      const coverParam = currentBook.originalCoverPath || currentBook.coverImage;
      navigate(
        `/reserve?bookId=${currentBook.id}&title=${encodeURIComponent(currentBook.title)}&cover=${encodeURIComponent(coverParam)}`
      );
      console.log(`Navigating to reserve ${currentBook.title} (ID: ${currentBook.id})`);
    }
  };

  if (isLoading) {
    return (
      <div className="bp-page-container">
        <Header /> {/* Assuming Header doesn't rely on book data */}
        <main className="bp-main-content-area">
          <div className="bp-content-card" style={{ textAlign: 'center', padding: '40px' }}>
            <LoadingIndicator />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bp-page-container">
        <Header />
        <main className="bp-main-content-area">
          <div className="bp-content-card" style={{ textAlign: 'center', padding: '40px' }}>
            <ErrorMessage message={error} />
            <button onClick={() => navigate('/')} className="bp-action-button" style={{ marginTop: '20px' }}>Go Home</button>
          </div>
        </main>
      </div>
    );
  }
  
  if (!currentBook) {
    // This case should ideally be covered by the error state if fetching failed
    return (
      <div className="bp-page-container">
        <Header />
        <main className="bp-main-content-area">
          <div className="bp-content-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p>Book details are not available.</p>
            <button onClick={() => navigate('/')} className="bp-action-button" style={{ marginTop: '20px' }}>Go Home</button>
          </div>
        </main>
      </div>
    );
  }

  // Render the book details
  return (
    <div className="bp-page-container">
      {/* Header is rendered globally in App.js if you have that setup, otherwise include here */}
      {/* <Header /> */} 
      
      <main className="bp-main-content-area">
        <div className="bp-content-card">
          <div className="bp-main-layout">
            <div className="bp-cover-section">
              <img 
                src={currentBook.coverImage} 
                alt={`Cover of ${currentBook.title}`} 
                className="bp-cover-image" 
              />
            </div>
            <div className="bp-details-section">
              <h1 className="bp-title">{currentBook.title}</h1>
              
              <div className="bp-info-item">
                <span className="bp-attribute">Author:</span>
                <span 
                    className={`bp-value ${currentBook.authorId ? 'bp-clickable' : ''}`} 
                    onClick={currentBook.authorId ? handleAuthorClick : undefined}
                    tabIndex={currentBook.authorId ? 0 : -1}
                    onKeyDown={currentBook.authorId && ((e) => e.key === 'Enter' && handleAuthorClick())}
                >
                  {currentBook.author}
                </span>
              </div>

              <div className="bp-info-item">
                <span className="bp-attribute">First Published:</span>
                <span className="bp-value">{currentBook.publishYear}</span>
              </div>

              <div className="bp-info-item">
                <span className="bp-attribute">Genre:</span>
                <span className="bp-value">
                  {/* Assuming currentBook.genre is now a string from genre_name_display */}
                  {currentBook.genre}
                </span>
              </div>

              <div className="bp-info-item">
                <span className="bp-attribute">Language:</span>
                <span className="bp-value">{currentBook.language}</span>
              </div>

              <div className="bp-description-item">
                <h3 className="bp-attribute bp-description-label">Description:</h3>
                <p className="bp-description-text">
                  {currentBook.description}
                </p>
              </div>

              <div className="bp-actions">
                <button className="bp-borrow-button" onClick={handleBorrowClick}>
                  Borrow Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookPage;
