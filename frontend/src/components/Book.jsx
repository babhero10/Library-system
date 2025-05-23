// src/components/Book.jsx
import React from 'react';
import '../styles/Book.css'; // We'll create this CSS file next

function Book({ imageSrc, title, altText, onClick, className }) {
  return (
    <div className={`book-item ${className || ''}`} onClick={onClick}>
      <img 
        src={imageSrc} 
        alt={altText || `Cover of ${title}`} 
        className="book-item-image" 
      />
      {title && <p className="book-item-title">{title}</p>}
    </div>
  );
}

export default Book;
