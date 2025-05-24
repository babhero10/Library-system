import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../styles/Header.css'; // Your Header styles
import searchIcon from '../assets/search_icon.png'; // Ensure path is correct
import { FaChevronDown } from 'react-icons/fa';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { currentUser, logout, isLoading } = useAuth(); // Get currentUser and logout from context

  const dropdownRef = useRef(null);
  const userActionRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear search bar after search
    }
  };

  const handleSearchIconClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/'); // Redirect to home or login page after logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        userActionRef.current && !userActionRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const mainNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
    // Add more links like:
    // { path: '/books', label: 'Browse Books' },
  ];

  // Placeholder for DEV toggle, not connected to actual API
  // const devToggleLoginState = () => console.log("DEV: Toggle Login state (visual only)");

  // isLoading check moved to where currentUser is used.

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
            aria-label="Search books and authors"
          />
          <img
            src={searchIcon}
            alt="Search"
            className="header-search-icon"
            onClick={handleSearchIconClick}
            tabIndex={0} // Make it focusable
            onKeyDown={(e) => e.key === 'Enter' && handleSearchIconClick()} // Allow enter on icon
          />
        </div>
        <div className="header-user-actions" ref={userActionRef}>
          {isLoading ? (
            <div className="header-auth-links">Loading...</div> // Or some placeholder
          ) : currentUser ? (
            <div className="header-user-info" onClick={toggleDropdown} tabIndex={0}
                 onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}  role="button" aria-haspopup="true" aria-expanded={isDropdownOpen}>
              <span>Hi, {currentUser.full_name || currentUser.email?.split('@')[0] || 'User'}!</span>
              <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} aria-hidden="true"/>
              {isDropdownOpen && (
                <div className="header-dropdown-menu" ref={dropdownRef} role="menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)} role="menuitem">
                    My Account {/* TODO: Create /profile route and page */}
                  </Link>
                  {currentUser.role === 'admin' && ( // Conditionally show Admin link
                    <Link to="/admin" className="dropdown-item" onClick={() => setIsDropdownOpen(false)} role="menuitem">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item dropdown-button" role="menuitem">
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
      <nav className="header-main-nav" aria-label="Main navigation">
        {mainNavLinks.map(link => (
          <Link key={link.path} to={link.path} className="header-nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
