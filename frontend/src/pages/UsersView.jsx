import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import '../styles/AdminPage.css';

const UsersView = () => {
  const [users, setUsers] = useState([
    { id: 1, fullName: 'John Doe', email: 'john@example.com', password: '••••••••', phone: '01234567890', birthDate: '1990-01-01' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', password: '••••••••', phone: '01123456789', birthDate: '1995-05-12' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ id: '', fullName: '', email: '', password: '', phone: '', birthDate: '' });
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const validateUser = (user) => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^(010|011|012|015)\d{8}$/;

    if (!user.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (user.fullName.trim().split(' ').length < 2) {
      errors.fullName = 'Full name must contain at least two words';
    }

    if (!user.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(user.email)) {
      errors.email = 'Enter a valid email';
    }

    if (!user.password || user.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!user.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(user.phone)) {
      errors.phone = 'Phone must start with 010, 011, 012, or 015 and be 11 digits';
    }

    if (!user.birthDate) {
      errors.birthDate = 'Birth date is required';
    } else {
      const today = new Date();
      const birth = new Date(user.birthDate);
      const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (birth > todayAtMidnight) {
        errors.birthDate = 'Birth date cannot be in the future';
      } else {
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        if (age < 13) {
          errors.birthDate = 'User must be at least 13 years old';
        }
      }
    }

    return errors;
  };

  const handleAddUser = () => {
    const errors = validateUser(newUser);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    const user = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      password: hashedPassword
    };

    setUsers([...users, user]);
    setNewUser({ id: '', fullName: '', email: '', password: '', phone: '', birthDate: '' });
    setFormErrors({});
    setShowForm(false);
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleSave = (id) => {
    if (editingId === id) {
      const updatedUser = { ...editData };
      if (editData.password && editData.password.length < 60) {
        updatedUser.password = bcrypt.hashSync(editData.password, 10);
      }

      setUsers(prev => prev.map(user =>
        user.id === id ? { ...user, ...updatedUser } : user
      ));
      setEditingId(null);
      setEditData({});
      alert(`Saved user with ID ${id}.`);
    }
  };

  const handleEdit = (id) => {
    if (editingId === id) {
      setEditingId(null);
      setEditData({});
    } else {
      setEditingId(id);
      const userToEdit = users.find(user => user.id === id);
      setEditData({ ...userToEdit });
    }
  };

  return (
    <div className="users-view">
      <div className="users-table">
        <div className="users-header">
          <div className="users-cell">ID</div>
          <div className="users-cell">Full Name</div>
          <div className="users-cell">Email</div>
          <div className="users-cell">Password</div>
          <div className="users-cell">Phone</div>
          <div className="users-cell">Birth Date</div>
          <div className="users-cell actions-cell">Actions</div>
        </div>

        {users.map((user) => (
          <div key={user.id} className="users-row">
            <div className="users-cell">{user.id}</div>
            <div className="users-cell">
              {editingId === user.id ? (
                <input value={editData.fullName} onChange={(e) => handleEditChange('fullName', e.target.value)} />
              ) : user.fullName}
            </div>
            <div className="users-cell">
              {editingId === user.id ? (
                <input value={editData.email} onChange={(e) => handleEditChange('email', e.target.value)} />
              ) : user.email}
            </div>
            <div className="users-cell">
              {editingId === user.id ? (
                <input type="password" value={editData.password} onChange={(e) => handleEditChange('password', e.target.value)} />
              ) : '••••••••'}
            </div>
            <div className="users-cell">
              {editingId === user.id ? (
                <input value={editData.phone} onChange={(e) => handleEditChange('phone', e.target.value)} />
              ) : user.phone}
            </div>
            <div className="users-cell">
              {editingId === user.id ? (
                <input type="date" value={editData.birthDate} onChange={(e) => handleEditChange('birthDate', e.target.value)} />
              ) : user.birthDate}
            </div>
            <div className="users-cell actions-cell">
              <button className="action-button" onClick={() => handleSave(user.id)}>Save</button>
              <button className="action-button edit-btn" onClick={() => handleEdit(user.id)}>
                {editingId === user.id ? 'Cancel' : 'Edit'}
              </button>
              <button className="action-button delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-user-btn" onClick={() => {
        setFormErrors({});
        setShowForm(!showForm);
      }}>
        {showForm ? 'Cancel' : 'Add User'}
      </button>

      {showForm && (
        <div className="user-form">
          {Object.entries(newUser).map(([key, val]) => {
            if (key === 'id') return null; // Skip id field
            return (
              <div key={key} className="form-group">
                <label>{key.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  name={key}
                  value={val}
                  type={key === 'birthDate' ? 'date' : key === 'password' ? 'password' : 'text'}
                  onChange={(e) => setNewUser({ ...newUser, [key]: e.target.value })}
                />
                {formErrors[key] && <div className="error-text">{formErrors[key]}</div>}
              </div>
            );
          })}
          <button className="add-user-btn" onClick={handleAddUser}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default UsersView;
