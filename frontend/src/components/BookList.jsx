// src/components/BookList.jsx
import React, { useRef, useState, useEffect } from 'react';
import Book from './Book';
import '../styles/BookList.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function BookList({ title, books, className, lightBackground }) { 
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const navigate = useNavigate();

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 1);
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1);
    } else { setShowLeftArrow(false); setShowRightArrow(false); }
  };

  useEffect(() => {
    const currentContainer = scrollContainerRef.current;
    if (currentContainer) {
      checkScrollability();
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(currentContainer);
      const timeoutId = setTimeout(checkScrollability, 200);
      return () => {
        if (currentContainer) { resizeObserver.unobserve(currentContainer); }
        clearTimeout(timeoutId);
      };
    }
  }, [books]);

  const handleScrollEvent = () => checkScrollability();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleBookNavigateInternal = (bookPathId) => {
    if (bookPathId) {
      navigate(`/book/${bookPathId}`);
    } else {
      console.warn("BookList: bookPathId is undefined for a book.");
    }
  };

  if (!books || books.length === 0) {
    return null;
  }

  const wrapperClassName = `book-list-scroll-wrapper ${
    showLeftArrow ? 'show-fade-left' : ''
  } ${showRightArrow ? 'show-fade-right' : ''} ${
    lightBackground ? 'light-fade-bg' : ''
  } ${className || ''}`;

  return (
    <div className="book-list-container">
      {title && <h2 className="book-list-title">{title}</h2>}
      <div className={wrapperClassName}>
        {showLeftArrow && (
          <button className="scroll-arrow left-arrow" onClick={() => scroll('left')} aria-label="Scroll left">
            <FaChevronLeft />
          </button>
        )}
        <div className="books-horizontal-scroll" ref={scrollContainerRef} onScroll={handleScrollEvent}>
          {books.map(book => (
            <Book
              key={book.id}
              imageSrc={book.imageSrc}
              title={book.title}
              onClick={() => handleBookNavigateInternal(book.bookPathId || book.id)}
              className={`book-list-item ${book.isFlipped ? 'flipped' : ''}`}
            />
          ))}
        </div>
        {showRightArrow && (
          <button className="scroll-arrow right-arrow" onClick={() => scroll('right')} aria-label="Scroll right">
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
export default BookList;
