import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Book from '../components/Book';
import '../styles/SearchPage.css';

// Option A: If apiService.js exports API_BASE_URL which is 'http://localhost:8000'
// import { API_BASE_URL } from '../services/apiService'; // Assuming this is your backend host 'http://localhost:8000'
// const IMAGE_HOST_BASE = API_BASE_URL;

// Option B: If you want to define it locally but ensure it's just the host
const IMAGE_HOST_BASE = 'http://localhost:8000'; // Your backend server's origin

const API_BASE_URL_BOOK_SEARCH_ENDPOINT = `${IMAGE_HOST_BASE}/book`; // For actual API calls to /book/*
const DEFAULT_BOOK_IMAGE = '/default-book-cover.png';

const constructFullImageUrl = (relativePathFromServer) => {
  if (!relativePathFromServer || typeof relativePathFromServer !== 'string') {
    return DEFAULT_BOOK_IMAGE;
  }
  if (relativePathFromServer.startsWith('http://') || relativePathFromServer.startsWith('https://')) {
    return relativePathFromServer;
  }
  // relativePathFromServer is like "book_data/covers/123.jpg"
  // It needs to be joined with the host: "http://localhost:8000/book_data/covers/123.jpg"
  const pathSegment = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
  return `${IMAGE_HOST_BASE}${pathSegment}`;
};

// API call functions
const searchBooksAPI = async (searchParams) => {
  const nonEmptyParams = {};
  for (const key in searchParams) {
    if (searchParams[key] !== '' && searchParams[key] !== null && searchParams[key] !== undefined) {
      nonEmptyParams[key] = searchParams[key];
    }
  }
  const queryString = new URLSearchParams(nonEmptyParams).toString();
  // Use the endpoint specific for book searching
  const url = `${API_BASE_URL_BOOK_SEARCH_ENDPOINT}/search?${queryString}`; 
  
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
    throw new Error(errorData.message || errorData.error || `Search failed. Status: ${response.status}`);
  }
  return response.json();
};

const getAllGenresAPI = async () => {
  // Use the endpoint specific for genres meta data
  const response = await fetch(`${API_BASE_URL_BOOK_SEARCH_ENDPOINT}/meta/genres`, { credentials: 'include' }); 
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
    throw new Error(errorData.message || errorData.error || `Failed to fetch genres. Status: ${response.status}`);
  }
  return response.json();
};

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [uniqueLanguages, setUniqueLanguages] = useState(['English', 'French', 'Russian', 'Spanish', 'German', 'Italian', 'Japanese'].sort()); // Placeholder
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ totalBooks: 0, totalPages: 1, currentPage: 1 });
  const [currentSearchTermForDisplay, setCurrentSearchTermForDisplay] = useState('');

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  
  const currentFilters = useMemo(() => ({
    q: queryParams.get('q') || '',
    genre: queryParams.get('genre') || '',
    language: queryParams.get('language') || '',
    page: parseInt(queryParams.get('page') || '1', 10)
  }), [queryParams]);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const genresData = await getAllGenresAPI();
        if (genresData.success && Array.isArray(genresData.data)) {
          setUniqueGenres(genresData.data.sort());
        } else {
          console.warn("Failed to parse genres or unexpected format:", genresData);
          setUniqueGenres([]);
        }
      } catch (err) {
        console.error("Error fetching metadata for filters:", err);
        setUniqueGenres([]);
      }
    };
    fetchMetaData();
  }, []);

  const performSearch = useCallback(async (filters) => {
    setIsLoading(true);
    setError(null);
    setCurrentSearchTermForDisplay(filters.q);

    const backendSearchParams = {
      page: filters.page,
      limit: 12,
    };
    if (filters.q) backendSearchParams.name = filters.q;
    if (filters.genre) {
      backendSearchParams.category = filters.genre;
      backendSearchParams.categoryType = 'genre';
    }
    if (filters.language) backendSearchParams.language = filters.language;
    
    console.log("SearchPage: Sending backendSearchParams:", backendSearchParams);

    try {
      const results = await searchBooksAPI(backendSearchParams);
      if (results.success && results.data) {
        setSearchResults(results.data.books || []);
        setPagination({
          totalBooks: results.data.totalBooks || 0,
          totalPages: results.data.totalPages || 1,
          currentPage: results.data.currentPage || 1,
        });
      } else {
        throw new Error(results.error || "Search returned no data or failed.");
      }
    } catch (err) {
      console.error("Perform Search Error:", err);
      setError(err.message);
      setSearchResults([]);
      setPagination({ totalBooks: 0, totalPages: 1, currentPage: 1 });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(currentFilters);
  }, [performSearch, currentFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(location.search);
    if (value) { newParams.set(name, value); } else { newParams.delete(name); }
    newParams.set('page', '1');
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== pagination.currentPage) {
      const newParams = new URLSearchParams(location.search);
      newParams.set('page', newPage.toString());
      navigate(`${location.pathname}?${newParams.toString()}`);
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="sp-page-container">
      <main className="sp-content-wrapper">
        <h1 className="sp-title">
          Search Results {currentSearchTermForDisplay && `for "${currentSearchTermForDisplay}"`}
        </h1>

        <div className="sp-controls-container">
          <div className="sp-filters">
            <div className="sp-filter-group">
              <label htmlFor="genre-filter">Genre:</label>
              <select id="genre-filter" name="genre" value={currentFilters.genre} onChange={handleFilterChange} disabled={isLoading}>
                <option value="">All Genres</option>
                {uniqueGenres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
              </select>
            </div>
            <div className="sp-filter-group">
              <label htmlFor="language-filter">Language:</label>
              <select id="language-filter" name="language" value={currentFilters.language} onChange={handleFilterChange} disabled={isLoading}>
                <option value="">All Languages</option>
                {uniqueLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
          </div>
          {!isLoading && !error && (
            <div className="sp-results-count">
              Showing {searchResults.length} of {pagination.totalBooks} result(s)
            </div>
          )}
        </div>

        {isLoading && <p className="sp-loading">Loading books...</p>}
        {!isLoading && error && <p className="sp-error">Error searching books: {error}</p>}
        
        {!isLoading && !error && searchResults.length > 0 ? (
          <div className="sp-results-grid">
            {searchResults.map((book) => {
              const imageUrl = constructFullImageUrl(book.cover_image_url);
              // console.log(`SearchPage Rendering Book: ${book.title}, Image URL: ${imageUrl}`); // Final check
              return (
                <Book
                  key={book.book_id || book.id}
                  title={book.title}
                  imageSrc={imageUrl} // Use the consistent helper
                  onClick={() => handleBookClick(book.book_id || book.id)}
                />
              );
            })}
          </div>
        ) : (
          !isLoading && !error && <p className="sp-no-results">No books found matching your criteria.</p>
        )}

        {!isLoading && !error && pagination.totalPages > 1 && (
          <div className="sp-pagination">
            <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1 || isLoading}>
              Previous
            </button>
            <span> Page {pagination.currentPage} of {pagination.totalPages} </span>
            <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages || isLoading}>
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
