// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/apiService'; // Import your API service
import { useAuth } from '../context/AuthContext'; 
import '../styles/AuthForm.css';
import mailIcon from '../assets/envelope.png';
import lockIcon from '../assets/Password.png';
import idIcon from '../assets/user.png';
import libraryImage from '../assets/image.png';
import phoneIcon from '../assets/phone.png';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '', // Match backend: often 'name' or 'firstName'/'lastName'
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',     // Match backend: often 'phoneNumber'
    birthDate: '', // Match backend: often 'dateOfBirth'
  });

  const [errors, setErrors] = useState({}); // Client-side validation errors
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');   // API errors
  const [apiSuccess, setApiSuccess] = useState(''); // API success message

  const navigate = useNavigate();
  const { login } = useAuth(); // If you want to auto-login

  const validate = () => { /* ... your existing extensive validation ... */
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
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
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
    setErrors(prev => ({...prev, [e.target.name]: ''})); // Clear specific error on change
    setApiError(''); // Clear API error on change
    setApiSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setApiSuccess('');

    if (validate()) {
      setLoading(true);
      try {
        // Prepare data for API (match backend expected field names)
        const apiData = {
          full_name: formData.fullName, // Example: if backend expects 'name'
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone, // Example: if backend expects 'phoneNumber'
          data_of_birth: formData.birthDate, // Example: if backend expects 'dateOfBirth'
          role: 'user',
        };
        // Remove confirmPassword as it's not usually sent to backend
        // delete apiData.confirmPassword; 

        const responseData = await signupUser(apiData); // Call your API service
        setLoading(false);
        setApiSuccess(responseData.message || 'Signup successful! Please log in.');
        console.log('Sign Up successful:', responseData);
        // Optionally, auto-login the user here if your API supports it and returns a session
        const loginResult = await login(formData.email, formData.password);
        if (loginResult.success) {
          navigate('/');
        } else {
          navigate('/login'); // Or redirect to login page
        }
      } catch (error) {
        setLoading(false);
        setApiError(error.message || 'An error occurred during signup.');
        console.error("Signup API error:", error);
      }
    } else {
      console.log("Client-side validation errors:", errors);
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
          {apiError && <div className="error-text api-error-message">{apiError}</div>}
          {apiSuccess && <div className="success-message">{apiSuccess}</div>} 
          
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <img src={idIcon} alt="" />
                <input type="text" id="fullName" name="fullName" placeholder="Please enter your name" value={formData.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} />
              </div>
              {errors.fullName && <div className="error-text">{errors.fullName}</div>}
            </div>
            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src={mailIcon} alt="" />
                <input type="email" id="email" name="email" placeholder="Please enter your email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} />
              </div>
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="" />
                <input type="password" id="password" name="password" placeholder="Please enter your password" value={formData.password} onChange={handleChange} aria-invalid={!!errors.password} />
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>
            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <img src={lockIcon} alt="" />
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Please re-enter your password" value={formData.confirmPassword} onChange={handleChange} aria-invalid={!!errors.confirmPassword} />
              </div>
              {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
            </div>
            {/* Phone & Birth Date Row */}
            <div className="phone-birth-row">
              <div className="input-group phone-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-with-icon">
                  <img src={phoneIcon} alt="" />
                  <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                </div>
                {errors.phone && <div className="error-text">{errors.phone}</div>}
              </div>
              <div className="input-group birth-group">
                <label htmlFor="birthDate">Birth Date</label>
                <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} aria-invalid={!!errors.birthDate} className="date-input-signup" /> {/* Added class for specific styling if needed */}
                {errors.birthDate && <div className="error-text">{errors.birthDate}</div>}
              </div>
            </div>
            <div className="register-row">
              <span>Already have an account?</span>
              <Link to="/login">Login</Link>
            </div>
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
