import React, { useState, useEffect, useCallback } from 'react';
import '../styles/AdminPage.css'; // Ensure this path is correct

const API_BASE_URL = 'http://localhost:8000'; // Ensure this matches your backend
// Place a default image (e.g., default-book-cover.png) in your `public` folder
const DEFAULT_COVER_IMAGE = `${process.env.PUBLIC_URL}/default-book-cover.png`;

// Helper function to construct full image URLs
const constructFullImageUrl = (relativePathFromServer) => {
  if (!relativePathFromServer) {
    return DEFAULT_COVER_IMAGE;
  }
  if (relativePathFromServer.startsWith('http://') || relativePathFromServer.startsWith('https://')) {
    return relativePathFromServer;
  }
  const pathSegment = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
  return `${API_BASE_URL}${pathSegment}`;
};

// Helper function to handle API responses
const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText || `HTTP error! Status: ${response.status}` };
    }
    throw new Error(errorData.error || errorData.message || `An unexpected error occurred. Status: ${response.status}`);
  }
  if (response.status === 204) { // No Content
    return { success: true, data: null };
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  // Fallback for non-JSON successful responses if any
  return { success: true, data: await response.text() };
};

// API call functions for book CRUD operations
const apiGetAllBooks = async (page = 1, limit = 100) => { // Fetch more to get diverse genres initially
  const response = await fetch(`${API_BASE_URL}/book?page=${page}&limit=${limit}`, { credentials: 'include' });
  return handleApiResponse(response);
};

const createBookAPI = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/book`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return handleApiResponse(response);
};

const updateBookAPI = async (bookId, formData) => {
  const response = await fetch(`${API_BASE_URL}/book/${bookId}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });
  return handleApiResponse(response);
};

const deleteBookAPI = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/book/${bookId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleApiResponse(response);
};


const BooksView = () => {
  const [books, setBooks] = useState([]);
  const [activeGenres, setActiveGenres] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // For general/operational errors

  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', genre_id: '', author_id: '', imageFile: null });
  const [formErrors, setFormErrors] = useState({}); // For form validation errors
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', genre_id: '', author_id: '', cover_image_url: '', imageFile: null });
  
  const [imagePreview, setImagePreview] = useState(null); // Blob URL for new book image
  const [editImagePreview, setEditImagePreview] = useState(null); // Blob URL for editing book image

  const fetchBooksAndGenres = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const booksResponse = await apiGetAllBooks();
      if (booksResponse.success && booksResponse.data.books) {
        setBooks(booksResponse.data.books);
        const genresFromBooks = new Map();
        booksResponse.data.books.forEach(book => {
          if (book.genre_id && book.genre_name_display) {
            if (!genresFromBooks.has(book.genre_id)) {
              genresFromBooks.set(book.genre_id, { genre_id: book.genre_id, name: book.genre_name_display });
            }
          }
        });
        setActiveGenres(Array.from(genresFromBooks.values()).sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        setError(booksResponse.error || 'Failed to load books.');
        setBooks([]); setActiveGenres([]);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
      setBooks([]); setActiveGenres([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooksAndGenres();
  }, [fetchBooksAndGenres]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setIsLoading(true); setError(null);
      try {
        await deleteBookAPI(id);
        setBooks(prev => prev.filter(book => book.book_id !== id));
        alert('Book deleted successfully.');
      } catch (err) {
        setError(err.message); alert(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (id) => {
    if (editingId === id) {
      const errors = validateEditForm();
       if (Object.keys(errors).length > 0) {
        setFormErrors(errors); return;
      }
      setIsLoading(true); setError(null);
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('genre_id', editData.genre_id);
      formData.append('author_id', editData.author_id);
      
      if (editData.imageFile) {
        formData.append('cover_image', editData.imageFile);
      } else if (editData.cover_image_url === '' && !editData.imageFile) { 
        formData.append('cover_image_url', ''); // Signal to backend to remove image
      }

      // For debugging: Log FormData contents
      console.log("--- FormData being sent for PATCH request ---");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("---------------------------------------------");

      try {
        const response = await updateBookAPI(id, formData);
        if (response.success && response.data) {
          setBooks(prev => prev.map(book => book.book_id === id ? response.data : book));
          
          const updatedGenreId = response.data.genre_id;
          const updatedGenreName = response.data.genre_name_display || (response.data.MainGenre ? response.data.MainGenre.name : null);
          if (updatedGenreId && updatedGenreName) {
            setActiveGenres(prevGenres => {
                const newGenres = new Map(prevGenres.map(g => [g.genre_id, g]));
                if (!newGenres.has(updatedGenreId) || newGenres.get(updatedGenreId).name !== updatedGenreName) {
                    newGenres.set(updatedGenreId, { genre_id: updatedGenreId, name: updatedGenreName });
                }
                return Array.from(newGenres.values()).sort((a,b) => a.name.localeCompare(b.name));
            });
          }

          setEditingId(null);
          setEditData({ title: '', genre_id: '', author_id: '', cover_image_url: '', imageFile: null });
          if (editImagePreview) URL.revokeObjectURL(editImagePreview);
          setEditImagePreview(null);
          setFormErrors({});
          alert(`Book updated successfully.`);
        } else {
          throw new Error(response.error || "Failed to update book details.")
        }
      } catch (err) {
        setError(err.message); alert(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (bookToEdit) => {
    if (editingId === bookToEdit.book_id) { // If cancelling edit
      setEditingId(null);
      setEditData({ title: '', genre_id: '', author_id: '', cover_image_url: '', imageFile: null });
      if (editImagePreview) URL.revokeObjectURL(editImagePreview);
      setEditImagePreview(null);
      setFormErrors({});
    } else { // If starting edit
      setEditingId(bookToEdit.book_id);
      setEditData({
        title: bookToEdit.title,
        genre_id: String(bookToEdit.genre_id || ''), // Ensure it's a string for select value
        author_id: String(bookToEdit.author_id || ''), // Ensure it's a string for input value
        cover_image_url: bookToEdit.cover_image_url || '',
        imageFile: null,
      });
      if (editImagePreview) URL.revokeObjectURL(editImagePreview); 
      setEditImagePreview(null); 
      setFormErrors({});
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: null }));
  };
  
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (editImagePreview) URL.revokeObjectURL(editImagePreview); 

    if (file) {
      setEditData(prev => ({ ...prev, imageFile: file, cover_image_url: '' })); 
      setEditImagePreview(URL.createObjectURL(file)); 
    } else { 
      const originalBook = books.find(b => b.book_id === editingId); 
      setEditData(prev => ({ 
        ...prev, 
        imageFile: null, 
        cover_image_url: originalBook?.cover_image_url || '' 
      }));
      setEditImagePreview(null); 
    }
  };

  const validateForm = (bookData, isNewBook = true) => {
    const errors = {};
    if (!bookData.title.trim()) errors.title = 'Title is required';
    
    // For genre_id and author_id, check if they are empty or not valid numbers if not empty
    if (!bookData.genre_id) {
        errors.genre_id = 'Genre is required';
    } else if (isNaN(parseInt(bookData.genre_id))) {
        errors.genre_id = 'Genre ID must be a valid selection.'; // Should be numeric from select
    }

    if (!bookData.author_id) {
        errors.author_id = 'Author ID is required';
    } else if (isNaN(parseInt(bookData.author_id))) {
        errors.author_id = 'Author ID must be a number';
    }
    
    if (isNewBook && !bookData.imageFile) errors.imageFile = 'Image is required for a new book';
    return errors;
  };
  
  const validateEditForm = () => validateForm(editData, false);

  const handleAddBook = async () => {
    const errors = validateForm(newBook, true);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); return;
    }
    setIsLoading(true); setError(null);
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('genre_id', newBook.genre_id);
    formData.append('author_id', newBook.author_id);
    if (newBook.imageFile) formData.append('cover_image', newBook.imageFile);

    // For debugging: Log FormData contents for Add Book
    // console.log("--- FormData being sent for POST request (Add Book) ---");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    // console.log("-------------------------------------------------------");

    try {
      const response = await createBookAPI(formData);
      if (response.success && response.data) {
        fetchBooksAndGenres(); 
        setNewBook({ title: '', genre_id: '', author_id: '', imageFile: null });
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setFormErrors({});
        setShowForm(false);
        alert('Book added successfully.');
      } else {
        throw new Error(response.error || "Failed to add book");
      }
    } catch (err) {
      setError(err.message); alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBookChange = (field, value) => {
    setNewBook(prev => ({ ...prev, [field]: value }));
     if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (imagePreview) URL.revokeObjectURL(imagePreview); 
    if (file) {
      setNewBook(prev => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
       if (formErrors.imageFile) setFormErrors(prev => ({ ...prev, imageFile: null }));
    } else {
      setNewBook(prev => ({ ...prev, imageFile: null }));
      setImagePreview(null);
    }
  };
  
  useEffect(() => {
    const currentImagePreview = imagePreview;
    const currentEditImagePreview = editImagePreview;
    return () => {
      if (currentImagePreview) URL.revokeObjectURL(currentImagePreview);
      if (currentEditImagePreview) URL.revokeObjectURL(currentEditImagePreview);
    };
  }, [imagePreview, editImagePreview]);

  if (isLoading && books.length === 0) return <div className="books-view"><p>Loading books...</p></div>;
  if (!isLoading && books.length === 0 && error) return <div className="books-view"><p className="error-text">Error loading books: {error}</p></div>;

  return (
    <div className="books-view">
      <h2>Manage Books</h2>
      {isLoading && books.length > 0 && <p>Processing...</p>}
      {error && <p className="error-text" style={{textAlign: 'center', marginBottom: '10px'}}>{error}</p>}
      
      <button 
        className="add-book-btn" 
        onClick={() => { 
          setShowForm(!showForm); 
          if (showForm) { 
            setFormErrors({}); 
            setNewBook({ title: '', genre_id: '', author_id: '', imageFile: null }); 
            if(imagePreview) URL.revokeObjectURL(imagePreview); setImagePreview(null);
            setError(null); 
          } else { 
             setError(null); 
             setFormErrors({}); 
          }
        }} 
        disabled={isLoading}
      >
        {showForm ? 'Cancel Add Book' : 'Add New Book'}
      </button>

      {showForm && (
        <div className="book-form">
          <h3>Add New Book</h3>
          <div className="form-group">
            <label>Title:</label>
            <input value={newBook.title} onChange={(e) => handleNewBookChange('title', e.target.value)} />
            {formErrors.title && <div className="error-text">{formErrors.title}</div>}
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <select value={newBook.genre_id} onChange={(e) => handleNewBookChange('genre_id', e.target.value)} className="genre-dropdown">
              <option value="">Select Genre</option>
              {activeGenres.map((genre) => (<option key={genre.genre_id} value={String(genre.genre_id)}>{genre.name}</option>))}
            </select>
            {formErrors.genre_id && <div className="error-text">{formErrors.genre_id}</div>}
          </div>
          <div className="form-group">
            <label>Author ID:</label>
            <input type="number" value={newBook.author_id} onChange={(e) => handleNewBookChange('author_id', e.target.value)} placeholder="Enter Author ID" />
            {formErrors.author_id && <div className="error-text">{formErrors.author_id}</div>}
          </div>
          <div className="form-group">
            <label>Cover Image:</label>
            <input type="file" accept="image/*" onChange={handleNewImageChange} />
            {imagePreview && <img src={imagePreview} alt="New book preview" className="book-image-preview" />}
            {formErrors.imageFile && <div className="error-text">{formErrors.imageFile}</div>}
          </div>
          <button className="add-book-btn" onClick={handleAddBook} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit New Book'}
          </button>
        </div>
      )}
      <div className="books-table">
        <div className="books-header">
          <div className="books-cell">Cover & Actions</div>
          <div className="books-cell">Title</div>
          <div className="books-cell">Genre</div>
          <div className="books-cell">Author ID (Name)</div>
        </div>

        {books.map((book) => (
          <div key={book.book_id} className="books-row">
            {editingId === book.book_id ? (
              <>
                <div className="books-cell book-cover-actions-cell" data-label="Cover & Actions">
                  <div className="image-edit-area">
                    <input type="file" accept="image/*" onChange={handleEditImageChange} />
                    {editImagePreview ? (
                      <img src={editImagePreview} alt="Preview" className="book-image book-image-preview" />
                    ) : (
                      editData.cover_image_url && <img src={constructFullImageUrl(editData.cover_image_url)} alt="Current cover" className="book-image" />
                    )}
                  </div>
                  <div className="cell-actions">
                    <button className="action-button" onClick={() => handleSave(book.book_id)} disabled={isLoading}>Save</button>
                    <button className="action-button edit-btn" onClick={() => handleEdit(book)} disabled={isLoading}>Cancel</button>
                  </div>
                </div>

                <div className="books-cell" data-label="Title">
                  <input value={editData.title} onChange={(e) => handleEditChange('title', e.target.value)} />
                  {formErrors.title && <div className="error-text">{formErrors.title}</div>}
                </div>
                <div className="books-cell" data-label="Genre">
                  <select value={editData.genre_id} onChange={(e) => handleEditChange('genre_id', e.target.value)} className="genre-dropdown">
                    <option value="">Select Genre</option>
                    {activeGenres.map((genre) => (<option key={genre.genre_id} value={String(genre.genre_id)}>{genre.name}</option>))}
                  </select>
                  {formErrors.genre_id && <div className="error-text">{formErrors.genre_id}</div>}
                </div>
                <div className="books-cell" data-label="Author ID">
                  <input type="number" value={editData.author_id} onChange={(e) => handleEditChange('author_id', e.target.value)} placeholder="Author ID" />
                  {formErrors.author_id && <div className="error-text">{formErrors.author_id}</div>}
                </div>
              </>
            ) : (
              <>
                <div className="books-cell book-cover-actions-cell" data-label="Cover & Actions">
                  <img
                    src={constructFullImageUrl(book.cover_image_url)}
                    alt={`${book.title} cover`}
                    className="book-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_COVER_IMAGE; }}
                  />
                  <div className="cell-actions">
                    <button className="action-button edit-btn" onClick={() => handleEdit(book)} disabled={isLoading}>Edit</button>
                    <button className="action-button delete-button" onClick={() => handleDelete(book.book_id)} disabled={isLoading}>Delete</button>
                  </div>
                </div>
                <div className="books-cell" data-label="Title">{book.title}</div>
                <div className="books-cell" data-label="Genre">{book.genre_name_display || 'N/A'}</div>
                <div className="books-cell" data-label="Author">{book.author_id} ({book.author_name_display || 'N/A'})</div>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default BooksView;
