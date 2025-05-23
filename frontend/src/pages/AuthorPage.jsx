// src/pages/AuthorPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';
import { getAuthorById, getBooksByAuthor, API_BASE_URL } from '../services/apiService';
import '../styles/AuthorPage.css'; // Ensure this path is correct
// Removed static image imports as they will come from API

// Helper function to construct full image URLs
const constructFullImageUrl = (relativePathFromServer) => {
  if (!relativePathFromServer) {
    return `${process.env.PUBLIC_URL}/default-author-image.png`; // Default for author
  }
  if (relativePathFromServer.startsWith('http://') || relativePathFromServer.startsWith('https://')) {
    return relativePathFromServer;
  }
  const pathSegment = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
  return `${API_BASE_URL}${pathSegment}`;
};

const LoadingIndicator = () => <div className="loading-message">Loading author details...</div>;
const ErrorMessage = ({ message }) => <div className="error-message api-error-message">{message}</div>;

const AuthorPage = () => {
  const { authorId } = useParams();
  const navigate = useNavigate(); // If needed for any actions

  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]); // Will hold all books by this author
  const [categorizedBooks, setCategorizedBooks] = useState({}); // For { "Novels": [], "Poetry": [] }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorId) {
      setError("No author ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchAuthorData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch author details
        const authorResult = await getAuthorById(authorId);
        if (authorResult.success && authorResult.data) {
          const apiAuthor = authorResult.data;
          setAuthor({
            id: apiAuthor.author_id,
            name: apiAuthor.author_name,
            bio: apiAuthor.biography,
            birthYear: apiAuthor.birth_year,
            deathYear: apiAuthor.death_year,
            imageSrc: constructFullImageUrl(apiAuthor.author_image_url),
          });

          // Fetch books by this author
          const booksResult = await getBooksByAuthor(authorId, 1, 50); // Fetch up to 50 books by this author
          if (booksResult.success && booksResult.data && Array.isArray(booksResult.data.books)) {
            const processedBooks = booksResult.data.books.map(book => ({
              id: book.book_id,
              imageSrc: constructFullImageUrl(book.cover_image_url),
              title: book.title,
              bookPathId: String(book.book_id),
              genre: book.genre_name_display || "Uncategorized", // Use for categorization
            }));
            setAuthorBooks(processedBooks); // Store all books by author if needed for other purposes

            // Categorize books (example: by genre_name_display)
            const genresMap = {};
            processedBooks.forEach(book => {
              // Assuming genre_name_display is the primary category from API
              // You might need more sophisticated logic if book.genre_name_display is an array
              // or if you want to map API genres to your predefined categories ("Novels", "Poetry")
              const category = book.genre; // Example: "Novel", "Poetry", "Science Fiction"
              if (category) {
                if (!genresMap[category]) {
                  genresMap[category] = [];
                }
                if (genresMap[category].length < 10) { // Limit books per category on this page
                    genresMap[category].push(book);
                }
              }
            });
            setCategorizedBooks(genresMap);

          } else {
            console.warn(`No books found for author ${authorId} or error fetching books:`, booksResult.error);
            setAuthorBooks([]); // Set to empty array if no books or error
            setCategorizedBooks({});
          }

        } else {
          setError(authorResult.error || `Author with ID ${authorId} not found.`);
          setAuthor(null);
          setAuthorBooks([]);
          setCategorizedBooks({});
        }
      } catch (err) {
        console.error(`AuthorPage: Failed to fetch data for author ${authorId}:`, err);
        setError(err.message || "An error occurred while loading author details.");
        setAuthor(null);
        setAuthorBooks([]);
        setCategorizedBooks({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]); // Re-fetch if authorId changes

  if (isLoading) {
    return (
      <div className="author-page-container">
        {/* Header would be rendered globally by App.js or Layout.jsx */}
        <div className="ap-content-wrapper" style={{ paddingTop: 'calc(YOUR_HEADER_HEIGHT_HERE + 30px)' }}>
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="author-page-container">
        <div className="ap-content-wrapper" style={{ paddingTop: 'calc(YOUR_HEADER_HEIGHT_HERE + 30px)' }}>
          <div className="ap-main-content" style={{ textAlign: 'center' }}>
            <ErrorMessage message={error} />
            <button onClick={() => navigate('/')} className="bp-action-button" style={{ marginTop: '20px' }}>Go Home</button>
          </div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="author-page-container">
        <div className="ap-content-wrapper" style={{ paddingTop: 'calc(YOUR_HEADER_HEIGHT_HERE + 30px)' }}>
         <div className="ap-main-content" style={{ textAlign: 'center' }}>
            <p>Author not found.</p>
            <button onClick={() => navigate('/')} className="bp-action-button" style={{ marginTop: '20px' }}>Go Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="author-page-container">
      {/* Header is assumed to be global via App.js's LayoutManager or Layout.jsx */}
      <div className="ap-content-wrapper"> {/* Remember to set its padding-top for your fixed header */}
        <div className="ap-main-content">
          <div className="ap-author-presentation">
            <div className="ap-author-image-container">
              <img src={author.imageSrc} alt={`Portrait of ${author.name}`} className="ap-author-image" />
            </div>
            <div className="ap-author-info-card">
              {/* Using ap-page-title for Author's Name to match CSS */}
              <h1 className="ap-page-title">{author.name}</h1> 
              {/* Or if you prefer "About the Author" as a separate heading:
              <h2 className="ap-about-title">About the Author</h2>
              <h1 className="ap-page-title-name">{author.name}</h1> 
              */}
              {(author.birthYear || author.deathYear) && (
                 <div className="ap-info-item">
                    <span className="ap-label">Lived:</span>
                    <span className="ap-value">
                        {author.birthYear || ''} - {author.deathYear || 'Present'}
                    </span>
                </div>
              )}
              <div className="ap-info-item">
                <span className="ap-label">Bio:</span>
                <span className="ap-value ap-bio-text">
                  {author.bio || "No biography available."}
                </span>
              </div>
              {/* Add more author details here if available from API */}
            </div>
          </div>

          <div className="ap-authors-works-section">
            {Object.keys(categorizedBooks).length > 0 ? (
              Object.entries(categorizedBooks)
              .sort(([genreA], [genreB]) => genreA.localeCompare(genreB)) // Optional: sort genres alphabetically
              .map(([categoryName, booksInCategory]) => {
                if (booksInCategory.length === 0) return null;
                return (
                  <BookList
                    key={categoryName}
                    title={categoryName} // e.g., "Novels", "Poetry" as returned by API or categorized
                    books={booksInCategory}
                    lightBackground={true} // Prop for BookList CSS if needed for this page
                    listId={`author-${author.id}-category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                );
              })
            ) : (
              !isLoading && <p>No books found for this author in our catalog.</p> // Show if no books after loading
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
