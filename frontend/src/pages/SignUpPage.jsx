import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUpPage.css';
import mailIcon from '../assets/envelope.png';
import lockIcon from '../assets/Password.png';
import idIcon from '../assets/user.png';
import libraryImage from '../assets/library.jpg';
import phoneIcon from '../assets/phone.png';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^(010|011|012|015)\d{8}$/; // Valid Egyptian mobile numbers

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Full name must contain at least two words';
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Confirm Password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone Validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must start with 010, 011, 012, or 015 and be 11 digits';
    }

    // Birth Date Validation
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const today = new Date();
      const birth = new Date(formData.birthDate);
      if (birth > today) {
        newErrors.birthDate = 'Birth date cannot be in the future';
      } else {
        const age = today.getFullYear() - birth.getFullYear();
        if (age < 13) {
          newErrors.birthDate = 'You must be at least 13 years old';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      // Continue submission logic
    }
  };

  return (
    <div className="signup-page-container">
      <div className="image-half">
        <img src={libraryImage} alt="Library" className="library-image" />
      </div>

      <div className="form-half">
        <div className="form-wrapper">
          <h1 className="signup-title">Sign Up</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <img src={idIcon} alt="Full Name Icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Please enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <div className="error-text">{errors.fullName}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src={mailIcon} alt="Email Icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="Password Icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="Confirm Password Icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Please re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
            </div>

            <div className="phone-birth-row">
              <div className="input-group phone-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-with-icon">
                  <img src={phoneIcon} alt="Phone Icon" />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <div className="error-text">{errors.phone}</div>}
              </div>

              <div className="input-group birth-group">
                <label htmlFor="birthDate">Birth Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.birthDate && <div className="error-text">{errors.birthDate}</div>}
              </div>
            </div>

            <div className="register-row">
              <span>Already have an account?</span>
              <Link to="/login">Login</Link>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
