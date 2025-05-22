import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookPage.css';

const BookPage = () => {
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    navigate('/author/jack-kerouac');
  };

  return (
    <div className="book-page-container">
      <div className="book-page">
        {/* Book Cover */}
        <div className="book-cover"></div>

        {/* Book Details */}
        <div className="book-details">
          <h2 className="details-title">Book Details</h2>
          
          <div className="book-info">
            <span className="attribute">Title: </span>
            <span className="value">On The Road</span>
          </div>
          
          <div className="book-info">
            <span className="attribute">Author Name: </span>
            <span className="value clickable" onClick={handleAuthorClick}>Jack Kerouac</span>
          </div>
          
          <div className="book-info">
            <span className="attribute">First Publish Year: </span>
            <span className="value">1957</span>
          </div>
          
          <div className="book-info">
            <span className="attribute">Genre: </span>
            <span className="value">Classic</span>
          </div>
          
          <div className="book-info">
            <span className="attribute">Language: </span>
            <span className="value">Italian</span>
          </div>
          
          <div className="book-description">
            <div className="attribute">Description: </div>
            <div className="description-text">
              Described as everything from a "last gasp" of romantic fiction to a founding text of the Beat Generation movement,
              this story amounts to a nonfiction novel (as critics were later to describe some works). Unpublished writer buddies
              wander from coast to coast in search of whatever they find, eager for experience. Kerouac's spokesman is Sal Paradise (himself),
              and real-life friend Neal Casady appears as Dean Moriarty.
            </div>
          </div>
          
          <div className="borrow-button">
            <button>Borrow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;