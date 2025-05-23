// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import searchIcon from '../assets/search_icon.png';
import { FaChevronDown } from 'react-icons/fa'; // For dropdown arrow

function Header({ userName }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const userActionRef = useRef(null); // Ref for the user action trigger area

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false); // Close dropdown on logout
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside dropdown AND outside the user action trigger
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        userActionRef.current && !userActionRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);


  const mainNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const devToggleLoginState = () => setIsLoggedIn(prev => !prev);

  return (
    <header className="app-header">
      <div className="header-top-row">
        <Link to="/" className="header-library-title">
          Library System
        </Link>
        <div className="header-search-bar">
          <input
            type="text"
            placeholder="Search books, authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className="header-search-icon"
            onClick={() => { if (searchTerm.trim()) handleSearch({ key: 'Enter' }) }}
          />
        </div>
        <div className="header-user-actions" ref={userActionRef}>
          {isLoggedIn ? (
            <div className="header-user-info" onClick={toggleDropdown}>
              <span>Hi, {userName || 'User'}</span>
              <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
              {isDropdownOpen && (
                <div className="header-dropdown-menu" ref={dropdownRef}>
                  <Link to="/account" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    My Account
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item dropdown-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="header-auth-links">
              <Link to="/login" className="header-auth-link">Login</Link>
              <span className="auth-link-separator">|</span>
              <Link to="/signup" className="header-auth-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
      <nav className="header-main-nav">
        {mainNavLinks.map(link => (
          <Link key={link.path} to={link.path} className="header-nav-link">
            {link.label}
          </Link>
        ))}
        {/* --- For Development: Button to toggle login state --- */}
        <button
          onClick={devToggleLoginState}
          title="Dev only: Toggle Login State"
          className="dev-toggle-button"
        >
          DEV: Toggle Login
        </button>
        {/* --- End Development Button --- */}
      </nav>
    </header>
  );
}

export default Header;
