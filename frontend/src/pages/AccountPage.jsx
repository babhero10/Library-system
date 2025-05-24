import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/AccountPage.css';
// Assuming changePasswordAPI is defined here or imported:
// import { changePasswordAPI } from '../services/userService'; // If in a separate file

const API_USER_PROFILE_URL = 'http://localhost:8000/user/profile';
const API_CHANGE_PASSWORD_URL = 'http://localhost:8000/user/change-password'; // Specific endpoint

// API call function for changing password (can be here or imported)
const changePasswordAPI = async (passwordData) => {
  const response = await fetch(API_CHANGE_PASSWORD_URL, {
    method: 'PATCH', // Or POST
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passwordData),
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || `Error ${response.status}`);
  }
  return data;
};


const AccountPage = () => {
  const { currentUser, isLoading: authLoading, token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For profile loading errors

  // State for Change Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordFormErrors, setPasswordFormErrors] = useState({});
  const [passwordChangeMessage, setPasswordChangeMessage] = useState(''); // For success/error messages from password change
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser && !authLoading) {
        setError("You must be logged in to view this page.");
        setIsLoading(false);
        return;
      }
      if (currentUser) {
        setIsLoading(true); setError(null);
        try {
          const response = await fetch(API_USER_PROFILE_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          });
          if (!response.ok) {
            let errorData = { message: `Error ${response.status}: ${response.statusText}`};
            try { const errJson = await response.json(); errorData.message = errJson.message || errJson.error || errorData.message; } catch (e) {}
            throw new Error(errorData.message);
          }
          const data = await response.json();
          if (data.success && data.user) {
            setProfileData(data.user);
          } else {
            throw new Error(data.message || "Failed to load profile data.");
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setError(err.message);
          if (currentUser) setProfileData(currentUser); 
        } finally {
          setIsLoading(false);
        }
      } else if (!authLoading) {
          setIsLoading(false); 
      }
    };
    if (!authLoading) fetchProfile();
  }, [currentUser, authLoading]);

  const validatePasswordForm = () => {
    const errors = {};
    if (!currentPassword) errors.currentPassword = "Current password is required.";
    if (!newPassword) {
      errors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) { // Example: min length
      errors.newPassword = "New password must be at least 6 characters.";
    }
    if (!confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "New passwords do not match.";
    }
    setPasswordFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordChangeMessage('');
    if (!validatePasswordForm()) return;

    setIsPasswordChanging(true);
    try {
      const response = await changePasswordAPI({
        currentPassword,
        newPassword,
        // confirmNewPassword // Usually not sent to backend, but depends on your API
      });
      if (response.success) {
        setPasswordChangeMessage(response.message || "Password changed successfully!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setPasswordFormErrors({});
        // Optionally, you might want to log the user out or re-issue a token
        // For simplicity, just showing a success message here.
      } else {
        // This else might not be hit if changePasswordAPI throws on !response.ok
        setPasswordChangeMessage(response.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Change password error:", err);
      setPasswordChangeMessage(err.message || "An error occurred while changing password.");
      setPasswordFormErrors(prev => ({...prev, submit: err.message})); // General error
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const displayInfo = (value) => value || 'N/A';
  const displayDate = (dateString) => {
    if (!dateString) return 'N/A';
    try { return new Date(dateString).toLocaleDateString(); } catch (e) { return 'Invalid Date'; }
  };

  if (isLoading || authLoading) {
    return <div className="account-page-container"><p className="loading-message">Loading account details...</p></div>;
  }
  if (error) {
    return <div className="account-page-container"><p className="error-message">{error}</p></div>;
  }
  if (!profileData) {
    return <div className="account-page-container"><p>Could not load profile information. Please try logging in again.</p></div>;
  }

  return (
    <div className="account-page-container">
      <h1 className="account-title">My Account</h1>
      
      <div className="account-details-card">
        <h2>Profile Information</h2>
        <div className="profile-info-grid">
          <div className="info-item"><span className="info-label">Full Name:</span><span className="info-value">{displayInfo(profileData.fullName || profileData.full_name)}</span></div>
          <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{displayInfo(profileData.email)}</span></div>
          <div className="info-item"><span className="info-label">Phone Number:</span><span className="info-value">{displayInfo(profileData.phone || profileData.phone_number)}</span></div>
          <div className="info-item"><span className="info-label">Birth Date:</span><span className="info-value">{displayDate(profileData.birthDate || profileData.date_of_birth)}</span></div>
          <div className="info-item"><span className="info-label">Role:</span><span className="info-value">{displayInfo(profileData.role)}</span></div>
          <div className="info-item"><span className="info-label">Member Since:</span><span className="info-value">{displayDate(profileData.createdAt || profileData.created_at)}</span></div>
        </div>
        {/* Placeholder for Edit Profile Button */}
        {/* <button className="button edit-profile-button">Edit Profile</button> */}
      </div>

      <div className="account-actions-card">
        <h2>Change Password</h2>
        <form onSubmit={handleChangePasswordSubmit} className="change-password-form">
          {passwordChangeMessage && (
            <p className={`password-message ${passwordFormErrors.submit || error || !passwordChangeMessage.toLowerCase().includes("success") ? 'error' : 'success'}`}>
              {passwordChangeMessage}
            </p>
          )}
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isPasswordChanging}
              required
            />
            {passwordFormErrors.currentPassword && <span className="error-text">{passwordFormErrors.currentPassword}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isPasswordChanging}
              required
            />
            {passwordFormErrors.newPassword && <span className="error-text">{passwordFormErrors.newPassword}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              disabled={isPasswordChanging}
              required
            />
            {passwordFormErrors.confirmNewPassword && <span className="error-text">{passwordFormErrors.confirmNewPassword}</span>}
          </div>
          <button type="submit" className="button change-password-submit-button" disabled={isPasswordChanging}>
            {isPasswordChanging ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
