// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

import book1 from "../assets/B1.jpg";
import book2 from "../assets/B2.jpg";
import book3 from "../assets/B3.jpg";
import book4 from "../assets/B4.jpg";
import book5 from "../assets/B5.jpg";
import book6 from "../assets/B6.jpg";
import book7 from "../assets/B7.jpg";
import book8 from "../assets/B8.jpg";
import book9 from "../assets/B9.jpg";
import book10 from "../assets/B10.jpg";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Library System</h1>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/login">Login</a>
        </div>
      </div>

      {/* Search Box */}
      <div className="homepage-search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="homepage-search-input"
          />
          <img
            src={require('../assets/search_icon.png')}
            alt="Search Icon"
            className="search-icon"
          />
        </div>
      </div>

      <h2 className="section-title trending-title">Trending Books</h2>
      <div className="book-section trending">
        <img src={book1} alt="book1" onClick={() => navigate('/book/1')} />
        <img src={book2} alt="book2" onClick={() => navigate('/book/2')} />
        <img src={book3} alt="book3" onClick={() => navigate('/book/3')} />
        <img src={book4} alt="book4" onClick={() => navigate('/book/4')} />
        <img src={book5} alt="book5" onClick={() => navigate('/book/5')} />
      </div>

      <h2 className="section-title books-title">Books</h2>
      <div className="book-section books">
        <img src={book6} alt="book6" onClick={() => navigate('/book/6')} />
        <img src={book7} alt="book7" onClick={() => navigate('/book/7')} />
        <img src={book8} alt="book8" onClick={() => navigate('/book/8')} />
        <img src={book9} alt="book9" onClick={() => navigate('/book/9')} />
        <img src={book10} alt="book10" className="flipped" onClick={() => navigate('/book/10')} />
      </div>
    </div>
  );
}

export default HomePage;
