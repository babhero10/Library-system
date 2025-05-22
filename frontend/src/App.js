// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
      </Routes>
    </Router>
  );
}

export default App;