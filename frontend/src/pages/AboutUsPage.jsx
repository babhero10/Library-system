// src/pages/AboutUsPage.jsx
import React from 'react';
import '../styles/AboutUsPage.css';
import aboutUsImage from '../assets/Aboutus.jpg'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // IMPORT HEADER

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="au-page-container"> {/* Changed to au- for About Us prefix */}
      <Header userName="Rowan" /> {/* ADD HEADER */}

      <main className="au-content-wrapper"> {/* Main scrollable area */}
        <div className="au-split-layout">
          <div className="au-image-section">
            <img src={aboutUsImage} alt="Our Library Space" className="au-image" />
          </div>

          <div className="au-text-section">
            <h1 className="au-title">About Our Library System</h1>
            <p className="au-description">
              At Library System, we make it easy for readers to explore a wide collection of books and reserve them online for free. 
              Our goal is to connect users with the books they love through a simple and convenient platform. Whether you're searching 
              for fiction, non-fiction, academic, or reference materials, our system lets you browse, check availability, and reserve 
              titles with just a few clicks. We're here to make accessing books easier and more enjoyable for everyone.
            </p>
            <button className="au-contact-button" onClick={() => navigate('/contact')}>
              Get In Touch
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;
