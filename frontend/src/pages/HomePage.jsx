// src/pages/HomePage.jsx
import React from 'react';
import BookList from '../components/BookList';
import '../styles/HomePage.css'; // Styles specific to HomePage content

// Import book cover images
import book1Img from "../assets/B1.jpg";
import book2Img from "../assets/B2.jpg";
import book3Img from "../assets/B3.jpg";
import book4Img from "../assets/B4.jpg";
import book5Img from "../assets/B5.jpg";
import book6Img from "../assets/B6.jpg";
import book7Img from "../assets/B7.jpg";
import book8Img from "../assets/B8.jpg";
import book9Img from "../assets/B9.jpg";
import book10Img from "../assets/B10.jpg";

// Define book data for different lists/genres
const trendingBooksData = [
  { id: 1, imageSrc: book1Img, title: "The Silent Patient", bookPathId: "1" },
  { id: 2, imageSrc: book2Img, title: "Where the Crawdads Sing", bookPathId: "2" },
  { id: 3, imageSrc: book3Img, title: "Atomic Habits", bookPathId: "3" },
  { id: 4, imageSrc: book4Img, title: "Project Hail Mary", bookPathId: "4" },
  { id: 5, imageSrc: book5Img, title: "The Midnight Library", bookPathId: "5" },
  { id: 11, imageSrc: book1Img, title: "The Silent Patient II", bookPathId: "11" },
  { id: 12, imageSrc: book2Img, title: "Crawdads Sing Again", bookPathId: "12" },
  { id: 1, imageSrc: book1Img, title: "The Silent Patient", bookPathId: "1" },
  { id: 2, imageSrc: book2Img, title: "Where the Crawdads Sing", bookPathId: "2" },
  { id: 3, imageSrc: book3Img, title: "Atomic Habits", bookPathId: "3" },
  { id: 4, imageSrc: book4Img, title: "Project Hail Mary", bookPathId: "4" },
  { id: 5, imageSrc: book5Img, title: "The Midnight Library", bookPathId: "5" },
  { id: 11, imageSrc: book1Img, title: "The Silent Patient II", bookPathId: "11" },
  { id: 12, imageSrc: book2Img, title: "Crawdads Sing Again", bookPathId: "12" },
];

const fictionBooksData = [
  { id: 6, imageSrc: book6Img, title: "It Ends with Us", bookPathId: "6" },
  { id: 7, imageSrc: book7Img, title: "Verity", bookPathId: "7" },
  { id: 8, imageSrc: book8Img, title: "The Seven Husbands of Evelyn Hugo", bookPathId: "8" },
  { id: 13, imageSrc: book3Img, title: "Atomic Habits (Fiction)", bookPathId: "13" },
  { id: 14, imageSrc: book4Img, title: "Project Hail Mary (Fiction)", bookPathId: "14" },
  { id: 6, imageSrc: book6Img, title: "It Ends with Us", bookPathId: "6" },
  { id: 7, imageSrc: book7Img, title: "Verity", bookPathId: "7" },
  { id: 8, imageSrc: book8Img, title: "The Seven Husbands of Evelyn Hugo", bookPathId: "8" },
  { id: 13, imageSrc: book3Img, title: "Atomic Habits (Fiction)", bookPathId: "13" },
  { id: 14, imageSrc: book4Img, title: "Project Hail Mary (Fiction)", bookPathId: "14" },
  { id: 13, imageSrc: book3Img, title: "Atomic Habits (Fiction)", bookPathId: "13" },
  { id: 14, imageSrc: book4Img, title: "Project Hail Mary (Fiction)", bookPathId: "14" },
  { id: 6, imageSrc: book6Img, title: "It Ends with Us", bookPathId: "6" },
  { id: 7, imageSrc: book7Img, title: "Verity", bookPathId: "7" },
];

const romanceBooksData = [
  { id: 9, imageSrc: book9Img, title: "Reminders of Him", bookPathId: "9" },
  { id: 10, imageSrc: book10Img, title: "Ugly Love", isFlipped: true, bookPathId: "10" },
  { id: 15, imageSrc: book5Img, title: "The Midnight Library (Romance)", bookPathId: "15" },
  { id: 16, imageSrc: book1Img, title: "Silent Patient in Love", bookPathId: "16" },
  { id: 17, imageSrc: book2Img, title: "Crawdads in Love", bookPathId: "17" },
  { id: 9, imageSrc: book9Img, title: "Reminders of Him", bookPathId: "9" },
  { id: 10, imageSrc: book10Img, title: "Ugly Love", isFlipped: true, bookPathId: "10" },
  { id: 15, imageSrc: book5Img, title: "The Midnight Library (Romance)", bookPathId: "15" },
  { id: 16, imageSrc: book1Img, title: "Silent Patient in Love", bookPathId: "16" },
  { id: 17, imageSrc: book2Img, title: "Crawdads in Love", bookPathId: "17" },
  { id: 9, imageSrc: book9Img, title: "Reminders of Him", bookPathId: "9" },
  { id: 10, imageSrc: book10Img, title: "Ugly Love", isFlipped: true, bookPathId: "10" },
  { id: 15, imageSrc: book5Img, title: "The Midnight Library (Romance)", bookPathId: "15" },
  { id: 16, imageSrc: book1Img, title: "Silent Patient in Love", bookPathId: "16" },
  { id: 17, imageSrc: book2Img, title: "Crawdads in Love", bookPathId: "17" },
];


function HomePage() {


  return (
    <div className="page-container">

      <main className="homepage-content">

        <BookList
          title="Trending Now"
          books={trendingBooksData}
        />

        <BookList
          title="Fiction Favorites"
          books={fictionBooksData}
        />

        <BookList
          title="Popular Romance"
          books={romanceBooksData}
        />
      </main>
    </div>
  );
}

export default HomePage;
