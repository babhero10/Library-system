import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import ReservationPage from './pages/ReservationPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
// Example: import UserProfilePage from './pages/UserProfilePage';
// Example: import NotFoundPage from './pages/NotFoundPage';


// Component Imports
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Helper component to manage layout (specifically header visibility)
const LayoutManager = () => {
  const location = useLocation();

  // Define paths where the main header should NOT be displayed
  const pathsWithoutHeader = ['/login', '/signup'];

  // Check if the current path (converted to lowercase for case-insensitivity)
  // is included in the pathsWithoutHeader array.
  const shouldShowHeader = !pathsWithoutHeader.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldShowHeader && <Header />} {/* Conditionally render the Header */}
      
      {/* The Routes will render the page content below the (conditionally rendered) Header */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Header will be hidden here */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Header will be hidden here */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/author/:authorId" element={<AuthorPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Protected Routes */}
        <Route
          path="/reserve"
          element={
            <ProtectedRoute>
              <ReservationPage />
            </ProtectedRoute>
          }
        />
        
        {/* Example of another protected route:
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage /> 
            </ProtectedRoute>
          }
        />
        */}

        {/* Optional: A catch-all route for 404 Not Found pages
        <Route path="*" element={<NotFoundPage />} />
        */}
      </Routes>
    </>
  );
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutManager /> {/* LayoutManager handles header and routes */}
      </Router>
    </AuthProvider>
  );
}

export default App;
