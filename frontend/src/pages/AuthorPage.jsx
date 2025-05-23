// src/pages/AuthorPage.jsx
import React from 'react';
import BookList from '../components/BookList'; // <--- IMPORT BookList
import '../styles/AuthorPage.css';

// Assume you have these assets
import authorImageSrc from '../assets/author.jpg';

// Import book covers (assuming you have more for demonstration)
import b1 from '../assets/B1.jpg';
import b2 from '../assets/B2.jpg';
import b3 from '../assets/B3.jpg';
import b4 from '../assets/B4.jpg';
import b5 from '../assets/B5.jpg';
import b6 from '../assets/B6.jpg';
import b7 from '../assets/B7.jpg';

// Sample data for the author's books, potentially categorized
const authorBooksData = {
  novels: [
    { id: "k-b1", title: "On the Road", imageSrc: b1, bookPathId: "1" },
    { id: "k-b1", title: "On the Road", imageSrc: b1, bookPathId: "1" },
    { id: "k-b2", title: "The Dharma Bums", imageSrc: b2, bookPathId: "2" },
    { id: "k-b3", title: "Big Sur", imageSrc: b3, bookPathId: "3" },
    { id: "k-b4", title: "Visions of Cody", imageSrc: b4, bookPathId: "4" },
    { id: "k-b5", title: "Desolation Angels", imageSrc: b5, bookPathId: "5" },
    { id: "k-b2", title: "The Dharma Bums", imageSrc: b2, bookPathId: "2" },
    { id: "k-b3", title: "Big Sur", imageSrc: b3, bookPathId: "3" },
    { id: "k-b4", title: "Visions of Cody", imageSrc: b4, bookPathId: "4" },
    { id: "k-b5", title: "Desolation Angels", imageSrc: b5, bookPathId: "5" },
  ],
  poetry: [
    { id: "k-p1", title: "Mexico City Blues", imageSrc: b6, bookPathId: "6" },
    { id: "k-p2", title: "Pomes All Sizes", imageSrc: b7, bookPathId: "7" },
    // Add more poetry books if available
  ],
  // You could add more categories like "Essays", "Collaborations", etc.
};

const AuthorPage = () => {

  return (
    <div className="author-page-container">

      {/* Main Page Content */}
      <div className="ap-content-wrapper">
        <div className="ap-main-content">
          <div className="ap-author-presentation">
            <div className="ap-author-image-container">
              <img src={authorImageSrc} alt="Jack Kerouac" className="ap-author-image" />
            </div>
            <div className="ap-author-info-card">
              <h2 className="ap-about-title">About the Author</h2>
              <div className="ap-info-item">
                <span className="ap-label">Name:</span>
                <span className="ap-value">Jack Kerouac</span>
              </div>
              <div className="ap-info-item">
                <span className="ap-label">Bio:</span>
                <span className="ap-value ap-bio-text">
                  Jack Kerouac (1922-1969) was an American novelist and poet, a pioneer of the Beat Generation.
                  His work, often autobiographical, explored themes of spirituality, jazz, promiscuity, Buddhism,
                  drugs, poverty, and travel. He became an underground celebrity and, with other Beats,
                  a progenitor of the hippie movement, although he remained a political conservative.
                </span>
              </div>
            </div>
          </div>

          <div className="ap-authors-works-section">
            {authorBooksData.novels && authorBooksData.novels.length > 0 && (
              <BookList
                title="Novels"
                books={authorBooksData.novels}
                lightBackground={true} // Tell BookList to use the light fade
              />
            )}

            {authorBooksData.poetry && authorBooksData.poetry.length > 0 && (
              <BookList
                title="Poetry Collections"
                books={authorBooksData.poetry}
                lightBackground={true} // Tell BookList to use the light fade
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
