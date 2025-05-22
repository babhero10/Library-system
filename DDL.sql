DROP DATABASE IF EXISTS librarysystem;
CREATE DATABASE librarysystem CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE librarysystem;

CREATE TABLE Users (
    user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    phone_number VARCHAR(20),
    role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE Authors (
    author_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ol_author_key VARCHAR(50) UNIQUE,
    author_name VARCHAR(255) NOT NULL,
    biography TEXT,
    author_image_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_author_name_bio UNIQUE (author_name(100), biography(100))
);


CREATE TABLE Genres (
    genre_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Books (
    book_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ol_work_key VARCHAR(50) UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publication_year INT,
    language VARCHAR(50),
    cover_image_url VARCHAR(512),
    target_stock_count INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE BookAuthors (
    book_id BIGINT UNSIGNED NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);

CREATE TABLE BookGenres (
    book_id BIGINT UNSIGNED NOT NULL,
    genre_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE
);

CREATE TABLE BookCopies (
    copy_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available'
        CHECK (status IN ('available', 'borrowed', 'reserved', 'maintenance', 'damaged', 'lost')),
    condition_notes TEXT,
    added_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE
);

CREATE TABLE Borrowings (
    borrowing_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    copy_id BIGINT UNSIGNED NOT NULL,
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE NOT NULL,
    return_date TIMESTAMP NULL,
    fine_amount DECIMAL(10, 2) DEFAULT 0.00,
    extended_count INT DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (copy_id) REFERENCES BookCopies(copy_id) ON DELETE RESTRICT
);

CREATE TABLE Reservations (
    reservation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'available', 'fulfilled', 'cancelled', 'expired')),
    notification_sent_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE
);

CREATE TABLE Notifications (
    notification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('reservation_available', 'due_date_reminder', 'overdue_alert', 'general_announcement')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'read', 'failed')),
    related_reservation_id BIGINT UNSIGNED REFERENCES Reservations(reservation_id) ON DELETE SET NULL,
    related_borrowing_id BIGINT UNSIGNED REFERENCES Borrowings(borrowing_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_full_name ON Users(full_name(191));

CREATE INDEX idx_authors_name ON Authors(author_name(191));
CREATE INDEX idx_authors_ol_author_key ON Authors(ol_author_key);

CREATE INDEX idx_genres_name ON Genres(genre_name);

CREATE INDEX idx_books_title ON Books(title(191));
CREATE INDEX idx_books_ol_work_key ON Books(ol_work_key);
CREATE INDEX idx_books_language ON Books(language);

CREATE INDEX idx_bookcopies_book_id ON BookCopies(book_id);
CREATE INDEX idx_bookcopies_status ON BookCopies(status);

CREATE INDEX idx_borrowings_user_id ON Borrowings(user_id);
CREATE INDEX idx_borrowings_copy_id ON Borrowings(copy_id);
CREATE INDEX idx_borrowings_due_date ON Borrowings(due_date);
CREATE INDEX idx_borrowings_return_date ON Borrowings(return_date);

CREATE INDEX idx_reservations_user_id ON Reservations(user_id);
CREATE INDEX idx_reservations_book_id ON Reservations(book_id);
CREATE INDEX idx_reservations_status ON Reservations(status);

CREATE INDEX idx_notifications_user_id ON Notifications(user_id);
CREATE INDEX idx_notifications_status ON Notifications(status);
CREATE INDEX idx_notifications_type ON Notifications(type);

