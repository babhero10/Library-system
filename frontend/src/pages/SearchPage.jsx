// src/pages/SearchPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Book from '../components/Book';
import '../styles/SearchPage.css';

const allLibraryBooks = [ // Ensure this data is comprehensive enough for testing
  { id: "1", title: 'The Great Gatsby', imageSrc: require('../assets/B1.jpg'), genre: 'Classic', language: 'English', author: 'F. Scott Fitzgerald' },
  { id: "2", title: 'To Kill a Mockingbird', imageSrc: require('../assets/B2.jpg'), genre: 'Classic', language: 'English', author: 'Harper Lee' },
  { id: "3", title: '1984', imageSrc: require('../assets/B3.jpg'), genre: 'Dystopian', language: 'English', author: 'George Orwell' },
  { id: "4", title: 'Pride and Prejudice', imageSrc: require('../assets/B4.jpg'), genre: 'Romance', language: 'English', author: 'Jane Austen' },
  { id: "5", title: 'The Hobbit', imageSrc: require('../assets/B5.jpg'), genre: 'Fantasy', language: 'English', author: 'J.R.R. Tolkien' },
  { id: "6", title: 'Les Misérables', imageSrc: require('../assets/B6.jpg'), genre: 'Historical Fiction', language: 'French', author: 'Victor Hugo' },
  { id: "7", title: 'War and Peace', imageSrc: require('../assets/B7.jpg'), genre: 'Historical Fiction', language: 'Russian', author: 'Leo Tolstoy' },
  { id: "8", title: 'Gatsby The New', imageSrc: require('../assets/B1.jpg'), genre: 'Fiction', language: 'English', author: 'Test Author' },
];

const getUniqueValues = (books, key) => {
  return [...new Set(books.map(book => book[key]).filter(Boolean))].sort();
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const location = useLocation(); // Get the full location object for its .search property
  const navigate = useNavigate();
  
  // --- Derive state from URL parameters ---
  // useMemo ensures these are only recalculated if location.search actually changes
  const qParam = useMemo(() => {
    return new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
  }, [location.search]);

  const genreParam = useMemo(() => {
    return new URLSearchParams(location.search).get('genre') || '';
  }, [location.search]);

  const languageParam = useMemo(() => {
    return new URLSearchParams(location.search).get('language') || '';
  }, [location.search]);

  // --- Local state for dropdowns (to control their displayed value) ---
  // This state is primarily for the <select> elements' `value` prop.
  // It gets updated when the URL params change.
  const [selectFilterValues, setSelectFilterValues] = useState({
    genre: genreParam,
    language: languageParam,
  });

  // Effect to update local selectFilterValues IF URL params change
  // (e.g., browser back/forward, link click from elsewhere)
  useEffect(() => {
    setSelectFilterValues({
      genre: genreParam,
      language: languageParam,
    });
  }, [qParam, genreParam, languageParam]); // Depend on the derived, stable param values

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(location.search); // Start with ALL current params
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name); // Remove filter if "All" (empty value) is selected
    }
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  // Memoize filteredBooks based on the actual string values from URL parameters
  const filteredBooks = useMemo(() => {
    let books = allLibraryBooks;

    if (qParam) {
      books = books.filter(book => 
        book.title.toLowerCase().includes(qParam) || 
        (book.author && book.author.toLowerCase().includes(qParam))
      );
    }
    if (genreParam) {
      books = books.filter(book => book.genre === genreParam);
    }
    if (languageParam) {
      books = books.filter(book => book.language === languageParam);
    }
    return books;
  }, [qParam, genreParam, languageParam]); // Depend on the derived, stable param values

  const uniqueGenres = useMemo(() => getUniqueValues(allLibraryBooks, 'genre'), []);
  const uniqueLanguages = useMemo(() => getUniqueValues(allLibraryBooks, 'language'), []);

  const displaySearchTerm = new URLSearchParams(location.search).get('q') || '';


  return (
    <div className="sp-page-container">
      <Header userName="Rowan" />
      <main className="sp-content-wrapper">
        <h1 className="sp-title">
          Search Results {displaySearchTerm && `for "${displaySearchTerm}"`}
        </h1>
        
        <div className="sp-controls-container">
          <div className="sp-filters">
            <div className="sp-filter-group">
              <label htmlFor="genre-filter">Genre:</label>
              <select id="genre-filter" name="genre" value={selectFilterValues.genre} onChange={handleFilterChange}>
                <option value="">All Genres</option>
                {uniqueGenres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
              </select>
            </div>
            <div className="sp-filter-group">
              <label htmlFor="language-filter">Language:</label>
              <select id="language-filter" name="language" value={selectFilterValues.language} onChange={handleFilterChange}>
                <option value="">All Languages</option>
                {uniqueLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
          </div>
          <div className="sp-results-count">
            Showing {filteredBooks.length} result(s)
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="sp-results-grid">
            {filteredBooks.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                imageSrc={book.imageSrc}
                onClick={() => handleBookClick(book.id)}
              />
            ))}
          </div>
        ) : (
          <p className="sp-no-results">No books found matching your criteria. Try adjusting your search or filters.</p>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
