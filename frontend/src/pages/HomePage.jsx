// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Library System</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')} className="nav-button">Login</button>
          <button onClick={() => navigate('/signup')} className="nav-button">Sign Up</button>
          <button onClick={() => navigate('/about')} className="nav-button">About Us</button>
          <button onClick={() => navigate('/book/186')} className="nav-button">Search</button>
        </div>
      </header>

      <section className="trending-books">
        <h2>Trending Books</h2>
        <div className="trending-book" onClick={() => handleBookClick(186)}>
          <p className="author">Jack Kerouac</p>
          <p className="title">On the Road</p>
          <p className="subtext">IN ASPECTS OF CONTACTORY</p>
          <p className="subtext">IN ASPECTS OF REVISIONS</p>
          <p className="subtitle">The Battery Edge</p>
        </div>
      </section>

      <section className="all-books">
        <h2>Books</h2>
        <div className="book-grid">
          {/* Book 1 */}
          <div className="book-card" onClick={() => handleBookClick(1)}>
            <h3 className="book-title">The Buffer</h3>
            <p className="book-subtitle">Animal Anties</p>
            <p className="book-description">There are five real-life animals.</p>
          </div>

          {/* Book 2 */}
          <div className="book-card" onClick={() => handleBookClick(2)}>
            <h3 className="book-title">THE HOBBIT</h3>
            <p className="book-author">JIBE COURSEY</p>
          </div>

          {/* Book 3 */}
          <div className="book-card" onClick={() => handleBookClick(3)}>
            <h3 className="book-title">THE ODYSSEY HOMER</h3>
            <p className="book-quote">"New Animals" in "Hobbites"</p>
          </div>

          {/* Book 4 */}
          <div className="book-card" onClick={() => handleBookClick(4)}>
            <h3 className="book-title">A STUDY OF HISTORY</h3>
            <p className="book-subtitle">A New Animal Journey (N.A.)</p>
          </div>

          {/* Book 5 */}
          <div className="book-card" onClick={() => handleBookClick(5)}>
            <h3 className="book-title">ARXOLDITIONNEE</h3>
          </div>

          {/* Book 6 */}
          <div className="book-card" onClick={() => handleBookClick(6)}>
            <h3 className="book-title">The Ugly Duckling</h3>
            <p className="book-quote">"The Ugly Duckling" in the United States</p>
          </div>

          {/* Book 7 */}
          <div className="book-card" onClick={() => handleBookClick(7)}>
            <h3 className="book-title">A LIDI OF ORIENTATION</h3>
            <p className="book-description">
              "Lily is a great member of the world's greatest country." The first book entitled 
              "The Legend of the World" was written by the author of the 2015 American Civil War. 
              It was published in 2009, and it was released on page 1.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}