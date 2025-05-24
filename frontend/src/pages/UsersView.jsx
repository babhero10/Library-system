import React, { useState, useEffect, useCallback } from 'react';
import '../styles/AdminPage.css'; // Ensure this path is correct

const API_BASE_URL = 'http://localhost:8000/user'; // Absolute URL to your user API

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '', phone: '', birthDate: '', role: 'user' }); // Added default role
  const [formErrors, setFormErrors] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ fullName: '', email: '', password: '', phone: '', birthDate: '', role: 'user' }); // Added role

  // Improved error handling for API responses
  const handleApiResponse = async (response) => {
    if (!response.ok) {
      let errorData = { message: `HTTP error! Status: ${response.status}` }; // Default error
      try {
        const text = await response.text(); // Try to get text first
        if (text) {
          errorData = JSON.parse(text); // Then try to parse as JSON
        }
      } catch (e) {
        // If JSON parsing fails or text is empty, stick to statusText or default
        console.warn("Could not parse error response as JSON, or response was empty. Status:", response.status);
      }
      throw new Error(errorData.message || `An unexpected error occurred. Status: ${response.status}`);
    }
    // Handle 204 No Content
    if (response.status === 204) {
        return { success: true, message: "Operation successful (No Content)" };
    }
    // Assuming successful responses are JSON
    return response.json();
  };


  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/`, { // GET http://localhost:8000/user/
        method: 'GET',
        headers: {
          'Accept': 'application/json', // Good practice to specify what you accept
        },
        credentials: 'include' // Crucial for sending session cookies
      });
      const data = await handleApiResponse(response);

      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.warn("Data from GET /user/ not in expected format or success false:", data);
        setUsers([]);
        throw new Error(data.message || "Received data from server was not in the expected format.");
      }
    } catch (e) {
      console.error("Failed to fetch users:", e);
      setError(e.message);
      setUsers([]); // Clear users on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const validateUser = (user, isEditing = false) => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^(010|011|012|015)\d{8}$/;

    if (!user.fullName?.trim()) errors.fullName = 'Full name is required';
    else if (user.fullName.trim().split(' ').length < 2) errors.fullName = 'Full name must contain at least two words';
    if (!user.email?.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(user.email)) errors.email = 'Enter a valid email';

    if (!isEditing || (isEditing && user.password && user.password.trim() !== '')) {
        if (!user.password || user.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
    }

    if (!user.phone?.trim()) errors.phone = 'Phone number is required';
    else if (!phoneRegex.test(user.phone)) errors.phone = 'Phone must start with 010, 011, 012, or 015 and be 11 digits';

    if (!user.birthDate) errors.birthDate = 'Birth date is required';
    else {
      const today = new Date();
      const birth = new Date(user.birthDate);
      const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (birth > todayAtMidnight) errors.birthDate = 'Birth date cannot be in the future';
      else {
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        if (age < 13) errors.birthDate = 'User must be at least 13 years old';
      }
    }
    if (!user.role) errors.role = 'Role is required';
    return errors;
  };

  const handleAddUser = async () => {
    const errors = validateUser(newUser);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
      });
      const data = await handleApiResponse(response);

      if (data.success) {
        setNewUser({ fullName: '', email: '', password: '', phone: '', birthDate: '', role: 'user' });
        setFormErrors({});
        setShowForm(false);
        fetchUsers();
        alert(data.message || 'User added successfully!');
      } else {
        throw new Error(data.message || "Failed to add user");
      }
    } catch (e) {
      console.error("Failed to add user:", e);
      setError(e.message);
      setFormErrors({ submit: e.message });
      alert(`Error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) { // Clear specific error on change
        setFormErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[field];
            return newErrors;
        });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await handleApiResponse(response);

        if (data.success) {
            fetchUsers();
            alert(data.message || 'User deleted successfully!');
        } else {
            throw new Error(data.message || "Failed to delete user");
        }
      } catch (e) {
        console.error("Failed to delete user:", e);
        setError(e.message);
        alert(`Error: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (id) => {
    const errors = validateUser(editData, true); // isEditing = true
     if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = { ...editData };
    delete payload.id; // ID is in URL param
    if (!payload.password || payload.password.trim() === '') {
      delete payload.password; // Don't send empty password to backend
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT', // Assuming PUT for updates, or PATCH if your backend uses it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await handleApiResponse(response);

      if (data.success) {
        setEditingId(null);
        setEditData({ fullName: '', email: '', password: '', phone: '', birthDate: '', role: 'user' });
        fetchUsers();
        alert(data.message || `Saved user with ID ${id}.`);
        setFormErrors({});
      } else {
        throw new Error(data.message || "Failed to update user");
      }
    } catch (e) {
      console.error("Failed to save user:", e);
      setError(e.message);
      setFormErrors({ submit: e.message }); // Show general error if specific not available
      alert(`Error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user) => {
    if (editingId === (user.id || user._id)) {
      setEditingId(null);
      setEditData({ fullName: '', email: '', password: '', phone: '', birthDate: '', role: 'user' });
      setFormErrors({}); // Clear errors when cancelling edit
    } else {
      setEditingId(user.id || user._id);
      setEditData({
        // Populate from user object, ensuring correct field names
        id: user.id || user._id, // keep id in editData for reference if needed
        fullName: user.fullName || '',
        email: user.email || '',
        password: '', // Clear password field for edit, user must re-type to change
        phone: user.phone || '',
        birthDate: user.birthDate ? user.birthDate.split('T')[0] : '', // Format for date input
        role: user.role || 'user'
      });
      setFormErrors({}); // Clear previous errors
    }
  };

  return (
    <div className="users-view">
      <h2>Manage Users</h2>
      <button className="add-user-btn" onClick={() => {
        setFormErrors({});
        setNewUser({ fullName: '', email: '', password: '', phone: '', birthDate: '', role: 'user' });
        setShowForm(!showForm);
        if (editingId) setEditingId(null); // Close edit form if open
        setError(null); // Clear general errors when toggling form
      }}
      disabled={isLoading}
      >
        {showForm ? 'Cancel Add User' : 'Add New User'}
      </button>

      {isLoading && users.length === 0 && <p>Loading users...</p>}
      {isLoading && users.length > 0 && <p style={{textAlign: 'center'}}>Processing...</p>}
      {error && <p className="error-text" style={{color: 'red', textAlign: 'center'}}>{error}</p>}

      {showForm && (
        <div className="user-form">
          <h3>Add New User</h3>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="newUser-fullName">Full Name:</label>
            <input id="newUser-fullName" name="fullName" value={newUser.fullName} onChange={(e) => handleEditChange.call({setNewUser, setFormErrors}, 'fullName', e.target.value)} disabled={isLoading} />
            {formErrors.fullName && <div className="error-text">{formErrors.fullName}</div>}
          </div>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="newUser-email">Email:</label>
            <input id="newUser-email" name="email" type="email" value={newUser.email} onChange={(e) => handleEditChange.call({setNewUser, setFormErrors}, 'email', e.target.value)} disabled={isLoading} />
            {formErrors.email && <div className="error-text">{formErrors.email}</div>}
          </div>
          {/* Password */}
          <div className="form-group">
            <label htmlFor="newUser-password">Password:</label>
            <input id="newUser-password" name="password" type="password" value={newUser.password} onChange={(e) => handleEditChange.call({setNewUser, setFormErrors}, 'password', e.target.value)} disabled={isLoading} />
            {formErrors.password && <div className="error-text">{formErrors.password}</div>}
          </div>
          {/* Phone */}
          <div className="form-group">
            <label htmlFor="newUser-phone">Phone:</label>
            <input id="newUser-phone" name="phone" type="tel" value={newUser.phone} onChange={(e) => handleEditChange.call({setNewUser, setFormErrors}, 'phone', e.target.value)} disabled={isLoading} />
            {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
          </div>
          {/* Birth Date */}
          <div className="form-group">
            <label htmlFor="newUser-birthDate">Birth Date:</label>
            <input id="newUser-birthDate" name="birthDate" type="date" value={newUser.birthDate} onChange={(e) => handleEditChange.call({setNewUser, setFormErrors}, 'birthDate', e.target.value)} disabled={isLoading} />
            {formErrors.birthDate && <div className="error-text">{formErrors.birthDate}</div>}
          </div>
          {/* Role */}
          <div className="form-group">
            <label htmlFor="newUser-role">Role:</label>
            <select id="newUser-role" name="role" value={newUser.role} onChange={(e) => handleEditChange.call({setNewUser, setFormErrors}, 'role', e.target.value)} disabled={isLoading}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {formErrors.role && <div className="error-text">{formErrors.role}</div>}
          </div>

          {formErrors.submit && <div className="error-text">{formErrors.submit}</div>}
          <button className="add-user-btn" onClick={handleAddUser} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit New User'}
          </button>
        </div>
      )}
      <div className="users-table">
        <div className="users-header">
          <div className="users-cell">ID</div>
          <div className="users-cell">Full Name</div>
          <div className="users-cell">Email</div>
          <div className="users-cell">Password (Edit)</div>
          <div className="users-cell">Phone</div>
          <div className="users-cell">Birth Date</div>
          <div className="users-cell">Role</div>
          <div className="users-cell actions-cell">Actions</div>
        </div>

        {!isLoading && users.length === 0 && !error && <tr><td colSpan="8" style={{textAlign: 'center'}}>No users found.</td></tr>}
        {users.map((user) => (
          <div key={user.id || user._id} className="users-row">
            <div className="users-cell" data-label="ID">{user.id || user._id}</div>
            {editingId === (user.id || user._id) ? (
              <>
                <div className="users-cell" data-label="Full Name">
                  <input value={editData.fullName} onChange={(e) => handleEditChange('fullName', e.target.value)} disabled={isLoading} />
                  {formErrors.fullName && <div className="error-text">{formErrors.fullName}</div>}
                </div>
                <div className="users-cell" data-label="Email">
                  <input type="email" value={editData.email} onChange={(e) => handleEditChange('email', e.target.value)} disabled={isLoading} />
                  {formErrors.email && <div className="error-text">{formErrors.email}</div>}
                </div>
                <div className="users-cell" data-label="Password">
                  <input type="password" placeholder="New password (optional)" value={editData.password} onChange={(e) => handleEditChange('password', e.target.value)} disabled={isLoading} />
                  {formErrors.password && <div className="error-text">{formErrors.password}</div>}
                </div>
                <div className="users-cell" data-label="Phone">
                  <input type="tel" value={editData.phone} onChange={(e) => handleEditChange('phone', e.target.value)} disabled={isLoading} />
                  {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
                </div>
                <div className="users-cell" data-label="Birth Date">
                  <input type="date" value={editData.birthDate} onChange={(e) => handleEditChange('birthDate', e.target.value)} disabled={isLoading} />
                  {formErrors.birthDate && <div className="error-text">{formErrors.birthDate}</div>}
                </div>
                <div className="users-cell" data-label="Role">
                    <select name="role" value={editData.role} onChange={(e) => handleEditChange('role', e.target.value)} disabled={isLoading}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {formErrors.role && <div className="error-text">{formErrors.role}</div>}
                </div>
              </>
            ) : (
              <>
                <div className="users-cell" data-label="Full Name">{user.fullName}</div>
                <div className="users-cell" data-label="Email">{user.email}</div>
                <div className="users-cell" data-label="Password">••••••••</div>
                <div className="users-cell" data-label="Phone">{user.phone}</div>
                <div className="users-cell" data-label="Birth Date">{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'N/A'}</div>
                <div className="users-cell" data-label="Role">{user.role || 'N/A'}</div>
              </>
            )}
            <div className="users-cell actions-cell">
              {editingId === (user.id || user._id) ? (
                <>
                  <button className="action-button" onClick={() => handleSave(user.id || user._id)} disabled={isLoading}>Save</button>
                  <button className="action-button edit-btn" onClick={() => handleEdit(user)} disabled={isLoading}>Cancel</button>
                </>
              ) : (
                <button className="action-button edit-btn" onClick={() => handleEdit(user)} disabled={isLoading}>Edit</button>
              )}
              <button className="action-button delete-button" onClick={() => handleDelete(user.id || user._id)} disabled={isLoading}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersView;
