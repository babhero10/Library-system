import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthorPage.css';

const AuthorPage = () => {
  return (
    <div className="author-page-container">
      {/* Top Navigation Bar */}
      <div className="top-bar">
        <div className="library-title">Library System</div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <img src={require('../assets/message.png')} alt="Search Icon" />
        </div>
        <div className="greeting">Hi, Rowan</div>
      </div>

      {/* Page Content */}
      <div className="author-page">
        {/* Author Image */}
        <div className="author-image"></div>

        {/* Content Rectangle */}
        <div className="author-content">
          <div className="about-title">About Author</div>
          
          <div className="author-info">
            <div className="info-row">
              <span className="label">Author Name:</span>
              <span className="value">Jack Kerouac</span>
            </div>
            
            <div className="info-row">
              <span className="label">Author Bio:</span>
              <span className="value bio-text">
                Jack Kerouac was an American novelist and poet of French-Canadian ancestry.
              </span>
            </div>
          </div>
        </div>

        {/* Other Books Section */}
        <div className="other-books-title">Other Books of this author:</div>
        <Link to="/book/id" className="book-cover cover1" />
        <Link to="/book/id" className="book-cover cover2" />
        <Link to="/book/id" className="book-cover cover3" />
      </div>
    </div>
  );
};

export default AuthorPage;
