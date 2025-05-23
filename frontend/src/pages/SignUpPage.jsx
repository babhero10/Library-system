// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import '../styles/AuthForm.css'; // Or AuthForm.css if you create a shared one
import mailIcon from '../assets/envelope.png';
import lockIcon from '../assets/Password.png';
import idIcon from '../assets/user.png';
import libraryImage from '../assets/image.png';
import phoneIcon from '../assets/phone.png';
// Note: No custom calendar icon import needed for type="date" if using native UI

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
  const navigate = useNavigate(); // For potential navigation after signup

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^(010|011|012|015)\d{8}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Full name must contain at least two words';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.password) { // Check password directly, not just trim, for empty string
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) { // Example: minimum length
        newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must start with 010, 011, 012, or 015 and be 11 digits';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const today = new Date();
      const birth = new Date(formData.birthDate);
      const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      if (birth > todayAtMidnight) {
        newErrors.birthDate = 'Birth date cannot be in the future';
      } else {
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
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
      console.log('Sign Up Form submitted:', formData);
      // Here you would typically make an API call to register the user
      // On success, you might navigate to the login page or a dashboard
      // For example: navigate('/login?signup=success');
      alert('Signup successful! (Data in console)'); // Placeholder
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="signup-page-container"> {/* Or use a generic .auth-page-container */}
      <div className="image-half">
        <img src={libraryImage} alt="Library" className="library-image" />
      </div>

      <div className="form-half">
        <div className="form-wrapper">
          <h1 className="signup-title">Sign Up</h1>

          <form onSubmit={handleSubmit} noValidate> {/* noValidate disables browser's default validation UI */}
            {/* Full Name */}
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <img src={idIcon} alt="" /> {/* Alt can be empty for decorative icons */}
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Please enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={errors.fullName ? "true" : "false"}
                  aria-describedby={errors.fullName ? "fullNameError" : undefined}
                />
              </div>
              {errors.fullName && <div id="fullNameError" className="error-text">{errors.fullName}</div>}
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src={mailIcon} alt="" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "emailError" : undefined}
                />
              </div>
              {errors.email && <div id="emailError" className="error-text">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "passwordError" : undefined}
                />
              </div>
              {errors.password && <div id="passwordError" className="error-text">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Please re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby={errors.confirmPassword ? "confirmPasswordError" : undefined}
                />
              </div>
              {errors.confirmPassword && <div id="confirmPasswordError" className="error-text">{errors.confirmPassword}</div>}
            </div>

            {/* Phone & Birth Date Row */}
            <div className="phone-birth-row">
              <div className="input-group phone-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-with-icon">
                  <img src={phoneIcon} alt="" />
                  <input
                    type="tel" // Use type="tel" for phone numbers
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phoneError" : undefined}
                  />
                </div>
                {errors.phone && <div id="phoneError" className="error-text">{errors.phone}</div>}
              </div>

              <div className="input-group birth-group">
                <label htmlFor="birthDate">Birth Date</label>
                {/* Date input typically does not use .input-with-icon if relying on native UI */}
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  aria-invalid={errors.birthDate ? "true" : "false"}
                  aria-describedby={errors.birthDate ? "birthDateError" : undefined}
                />
                {errors.birthDate && <div id="birthDateError" className="error-text">{errors.birthDate}</div>}
              </div>
            </div>

            <div className="register-row"> {/* Changed to "login-link-row" for clarity if needed */}
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
