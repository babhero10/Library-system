// src/pages/BookPage.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/BookPage.css'; // Ensure this path is correct
import bookCoverImage from '../assets/B1.jpg'; // Static import for the example book
import Header from '../components/Header';

// Static book data for this example
const bookData = {
  id: '1',
  title: 'On The Road',
  author: 'Jack Kerouac',
  authorSlug: 'jack-kerouac',
  publishYear: '1957',
  genre: ['Beat Generation', 'Novel', 'Classic'],
  language: 'English',
  description: `Sal Paradise, a young innocent, joins his hero Dean Moriarty, a reckless, con-man, Casanova, an charismatic fool, on a mission to go 'On the Road'. They travel back and forth across the United States. In their search for 'It', the pure essence of experience, they test the limits of the American dream. A classic of the Beat Generation, On the Road is a story of freedom, excitement, and the search for meaning.`,
  coverImage: bookCoverImage, // Using the imported static image path
};

const BookPage = () => {
  const navigate = useNavigate();
  // const { bookId } = useParams(); // Not used with current static data setup

  const currentBook = bookData; // Using static data for this example

  const handleAuthorClick = () => {
    if (currentBook && currentBook.authorSlug) {
      navigate(`/author/${currentBook.authorSlug}`);
    }
  };

  const handleBorrowClick = () => {
    if (currentBook) {
      // currentBook.coverImage here is the imported variable 'bookCoverImage',
      // which Webpack/Vite resolves to a path string.
      const coverImageUrl = currentBook.coverImage; 

      navigate(
        `/reserve?bookId=${currentBook.id}&title=${encodeURIComponent(currentBook.title)}&cover=${encodeURIComponent(coverImageUrl)}`
      );
      console.log(`Borrowing ${currentBook.title} (ID: ${currentBook.id}), Cover: ${coverImageUrl}`);
    }
  };

  if (!currentBook) {
    return (
      <div className="bp-page-container">
        <Header userName="Rowan" />
        <main className="bp-main-content-area">
          <div className="bp-content-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p>Book not found.</p>
            <button onClick={() => navigate('/')} className="bp-action-button">Go Home</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bp-page-container">
      <Header userName="Rowan" />
      
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
                <span className="bp-value bp-clickable" onClick={handleAuthorClick}>
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
                  {Array.isArray(currentBook.genre) ? currentBook.genre.join(', ') : currentBook.genre}
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
