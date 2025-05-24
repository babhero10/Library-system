// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css'; // We'll create this CSS file

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found.</h2>
        <p className="not-found-message">
          Sorry, the page you are looking for does not exist.
          It might have been moved or deleted.
        </p>
        <Link to="/" className="not-found-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
