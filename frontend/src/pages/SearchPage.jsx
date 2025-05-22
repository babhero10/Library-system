// SearchPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import '../styles/SearchPage.css';

const mockBooks = [
  { id: 1, title: 'Book 1', image: require('../assets/B1.jpg'), genre: 'Fiction', language: 'English' },
  { id: 2, title: 'Book 2', image: require('../assets/B2.jpg'), genre: 'History', language: 'French' },
  // Add the rest similarly...
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('query')?.toLowerCase() || '';
  const [filters, setFilters] = useState({ genre: '', language: '' });
  const navigate = useNavigate(); // Add this line

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`); // Navigate to BookPage with the selected book ID
  };

  const filteredBooks = mockBooks.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query);
    const matchesGenre = filters.genre === '' || book.genre === filters.genre;
    const matchesLanguage = filters.language === '' || book.language === filters.language;
    return matchesQuery && matchesGenre && matchesLanguage;
  });

  return (
    <div className="search-page">
      <div className="filters">
        <label>
          Genre:
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            <option value="History">History</option>
            {/* Add more genres */}
          </select>
        </label>
        <label>
          Language:
          <select name="language" value={filters.language} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="English">English</option>
            <option value="French">French</option>
            {/* Add more languages */}
          </select>
        </label>
      </div>

      <div className="search-results">
        {filteredBooks.map((book) => (
          <div className="search-book" key={book.id}>
            <img
              src={book.image}
              alt={book.title}
              onClick={() => handleBookClick(book.id)} // Add onClick
              style={{ cursor: 'pointer' }} // Optional: show clickable cursor
            />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;

