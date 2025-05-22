import React from 'react';
import '../styles/AboutUsPage.css';
import aboutUsImage from '../assets/Aboutus.jpg'; // Replace with correct image
import { useNavigate } from 'react-router-dom';

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page-container">
      <div className="about-image-section">
        <img src={aboutUsImage} alt="About Us" className="about-image" />
      </div>

      <div className="about-content-section">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          At Library System, we make it easy for readers to explore a wide collection of books and reserve them online for free. 
          Our goal is to connect users with the books they love through a simple and convenient platform. Whether you're searching 
          for fiction, non-fiction, academic, or reference materials, our system lets you browse, check availability, and reserve 
          titles with just a few clicks. We're here to make accessing books easier and more enjoyable for everyone.
        </p>
        <button className="contact-button" onClick={() => navigate('/book/:id')}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUsPage;