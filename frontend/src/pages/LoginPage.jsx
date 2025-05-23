// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import mailIcon from '../assets/envelope.png';
import lockIcon from '../assets/Password.png';
import libraryImage from '../assets/image.png';
import '../styles/AuthForm.css'; // Your shared auth form styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // For client-side validation errors
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(''); // For errors from the API

  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser } = useAuth(); // Get login function from context

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [currentUser, navigate, location.state]);


  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear previous API errors
    if (validate()) {
      setLoading(true);
      const result = await login(email, password); // Call login from AuthContext
      setLoading(false);
      if (result.success) {
        console.log('Login successful via context');
        // Navigation is handled by ProtectedRoute or if user directly accesses login while logged in
        // Or, if you want to explicitly redirect to a specific page after login:
        const from = location.state?.from?.pathname || "/"; // Redirect to previous page or home
        navigate(from, { replace: true });
      } else {
        setApiError(result.message || 'Login failed. Please check your credentials.');
        console.error('Login failed from context:', result.message);
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="image-half">
        <img src={libraryImage} alt="Library" className="library-image" />
      </div>

      <div className="form-half">
        <div className="form-wrapper">
          <h1 className="login-title">Login</h1>
          {apiError && <div className="error-text api-error-message">{apiError}</div>} {/* Display API errors */}
          
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src={mailIcon} alt="Email Icon" />
                <input
                  type="email" // Changed to type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({...prev, email: ''})); setApiError(''); }}
                  aria-invalid={errors.email || apiError ? "true" : "false"}
                  autoComplete="email"
                />
              </div>
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="Password Icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({...prev, password: ''})); setApiError(''); }}
                  aria-invalid={errors.password || apiError ? "true" : "false"}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            {/* Register link */}
            <div className="register-row">
              <span>Not registered?</span>
              <Link to="/signup">Create an account</Link>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
