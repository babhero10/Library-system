import React, { useState } from 'react';
import '../styles/AdminPage.css';

const genreOptions = [
  'Fantasy', 'Science Fiction', 'Horror', 'Mystery', 'Romance',
  'Thriller', 'Historical Fiction', 'Biography', 'Science', 'Self-Help'
];

const BooksView = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'Book One', genre: 'Fantasy', image: null },
    { id: 2, title: 'Book Two', genre: 'Science Fiction', image: null }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', genre: '', image: null });
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
  };

  const handleSave = (id) => {
    if (editingId === id) {
      setBooks(prev => prev.map(book =>
        book.id === id ? { ...book, ...editData } : book
      ));
      setEditingId(null);
      setEditData({});
    }
    alert(`Saved book with ID ${id}.`);
  };

  const handleEdit = (id) => {
    if (editingId === id) {
      setEditingId(null);
      setEditData({});
    } else {
      setEditingId(id);
      const bookToEdit = books.find(book => book.id === id);
      setEditData({ ...bookToEdit });
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newBook.title.trim()) errors.title = 'Title is required';
    if (!newBook.genre) errors.genre = 'Genre is required';
    if (!newBook.image) errors.image = 'Image is required';
    return errors;
  };

  const handleAddBook = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const imageUrl = URL.createObjectURL(newBook.image);
    const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    setBooks([...books, { id: newId, title: newBook.title, genre: newBook.genre, image: imageUrl }]);
    setNewBook({ title: '', genre: '', image: null });
    setFormErrors({});
    setShowForm(false);
  };

  return (
    <div className="books-view">
      <div className="books-table">
        <div className="books-header">
          <div className="books-cell">Title</div>
          <div className="books-cell">Genre</div>
          <div className="books-cell">Image</div>
          <div className="books-cell actions-cell">Actions</div>
        </div>

        {books.map((book) => (
          <div key={book.id} className="books-row">
            <div className="books-cell">
              {editingId === book.id ? (
                <input
                  value={editData.title}
                  onChange={(e) => handleEditChange('title', e.target.value)}
                />
              ) : (
                book.title
              )}
            </div>
            <div className="books-cell">
              {editingId === book.id ? (
                <select
                  value={editData.genre}
                  onChange={(e) => handleEditChange('genre', e.target.value)}
                  className="genre-dropdown"
                >
                  {genreOptions.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              ) : (
                <select
                  value={book.genre}
                  onChange={(e) => handleEditChange(book.id, 'genre', e.target.value)}
                  className="genre-dropdown"
                >
                  {genreOptions.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="books-cell">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const imageUrl = URL.createObjectURL(e.target.files[0]);
                    if (editingId === book.id) {
                      handleEditChange('image', imageUrl);
                    } else {
                      handleEditChange(book.id, 'image', imageUrl);
                    }
                  }
                }}
              />
              {book.image && (
                <img
                  src={editingId === book.id ? editData.image || book.image : book.image}
                  alt="Book cover"
                  className="book-image"
                />
              )}
            </div>
            <div className="books-cell actions-cell">
              <button className="action-button" onClick={() => handleSave(book.id)}>Save</button>
              <button className="action-button edit-btn" onClick={() => handleEdit(book.id)}>
                {editingId === book.id ? 'Cancel' : 'Edit'}
              </button>
              <button className="action-button delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-book-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Book'}
      </button>

      {showForm && (
        <div className="book-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            {formErrors.title && <div className="error-text">{formErrors.title}</div>}
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <select
              value={newBook.genre}
              onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              className="genre-dropdown"
            >
              <option value="">Select Genre</option>
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {formErrors.genre && <div className="error-text">{formErrors.genre}</div>}
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
            />
            {formErrors.image && <div className="error-text">{formErrors.image}</div>}
          </div>
          <button className="add-book-btn" onClick={handleAddBook}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default BooksView;
