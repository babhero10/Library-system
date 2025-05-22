import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import mailIcon from '../assets/envelope.png';
import lockIcon from '../assets/Password.png';
import libraryImage from '../assets/library.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login submitted:', { email, password });
      // Proceed with login logic
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

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src={mailIcon} alt="Email Icon" />
                <input
                  type="text"
                  id="email"
                  placeholder="Please enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            {/* Register link */}
            <div className="register-row">
              <span>Not registered?</span>
              <Link to="/signup">Create an account</Link>
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
