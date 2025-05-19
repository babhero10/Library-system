-- Table for Users (includes Admins)
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed & salted passwords
    date_of_birth DATE,
    role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for Authors
CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL UNIQUE,
    biography TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for general Book information
CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publication_year INT,
    genre VARCHAR(100), -- Consider a separate Categories table for larger systems
    cover_image_url VARCHAR(512),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for Many-to-Many relationship between Books and Authors
CREATE TABLE BookAuthors (
    book_id INT NOT NULL REFERENCES Books(book_id) ON DELETE CASCADE,
    author_id INT NOT NULL REFERENCES Authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

-- Table for individual physical copies of Books
CREATE TABLE BookCopies (
    copy_id SERIAL PRIMARY KEY,
    book_id INT NOT NULL REFERENCES Books(book_id) ON DELETE CASCADE,
    barcode VARCHAR(100) UNIQUE, -- Library's internal barcode for the physical copy
    status VARCHAR(20) NOT NULL DEFAULT 'available'
        CHECK (status IN ('available', 'borrowed', 'reserved', 'maintenance', 'damaged', 'lost')),
    -- 'reserved' means it's held for a user from the Reservations table
    condition_notes TEXT,
    added_date DATE DEFAULT CURRENT_DATE
);

-- Table for tracking borrowed books (active loans)
CREATE TABLE Borrowings (
    borrowing_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE RESTRICT,
    copy_id INT NOT NULL REFERENCES BookCopies(copy_id) ON DELETE RESTRICT,
    borrow_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    due_date DATE NOT NULL,
    return_date TIMESTAMPTZ NULL, -- NULL indicates the book is NOT YET RETURNED
    fine_amount DECIMAL(10, 2) DEFAULT 0.00, -- Can be calculated or manually set
    notes TEXT,
    CONSTRAINT uq_active_borrowing_copy UNIQUE (copy_id, return_date)
    -- Ensures a copy isn't actively borrowed by more than one person if return_date is NULL.
    -- For databases not supporting partial unique indexes, this logic might be in the application.
    -- A simpler unique constraint on (copy_id) might be used if you ensure the BookCopies.status is
    -- updated to 'available' immediately upon return and before another borrow.
);

-- Table for users placing a hold/reservation on a Book (title) when all copies are unavailable
CREATE TABLE Reservations (
    reservation_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    book_id INT NOT NULL REFERENCES Books(book_id) ON DELETE CASCADE, -- User reserves a general book title
    reservation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'available', 'fulfilled', 'cancelled', 'expired')),
    -- 'pending': User is waiting.
    -- 'available': A copy is now available and user has been notified.
    -- 'fulfilled': User picked up the reserved book (and a Borrowing record was created).
    -- 'cancelled': User cancelled the reservation.
    -- 'expired': User didn't pick up the book in time.
    notification_sent_at TIMESTAMPTZ NULL, -- When user was notified a copy is ready
    expires_at TIMESTAMPTZ NULL -- How long the user has to pick up the reserved book
);

-- === INDEXES for Performance ===
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_books_title ON Books(title);
CREATE INDEX idx_books_isbn ON Books(isbn);
CREATE INDEX idx_authors_name ON Authors(author_name);
CREATE INDEX idx_bookcopies_book_id ON BookCopies(book_id);
CREATE INDEX idx_bookcopies_status ON BookCopies(status);
CREATE INDEX idx_borrowings_user_id ON Borrowings(user_id);
CREATE INDEX idx_borrowings_copy_id ON Borrowings(copy_id);
CREATE INDEX idx_borrowings_return_date ON Borrowings(return_date); -- Important for finding overdue/active
CREATE INDEX idx_reservations_user_id ON Reservations(user_id);
CREATE INDEX idx_reservations_book_id ON Reservations(book_id);
CREATE INDEX idx_reservations_status ON Reservations(status);
