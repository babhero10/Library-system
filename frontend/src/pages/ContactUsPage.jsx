import React, { useState } from 'react';
import '../styles/ContactUsPage.css';
import leftImage from '../assets/Contactus.jpg';
import mailIcon from '../assets/envelope.png';
import idCardIcon from '../assets/user.png';
import chatIcon from '../assets/message.png';

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error as user types
  };

  const validate = () => {
    const newErrors = {};

    // Name: required & at least two words
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().split(' ').length < 2) {
      newErrors.name = 'Please enter your full name (first and last)';
    }

    // Email: required & valid format
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Submitted:', form);
    // Submit logic here
  };

  return (
    <div className="contact-page">
      <div className="contact-left">
        <img src={leftImage} alt="Library visual" className="contact-image" />
      </div>

      <div className="contact-right">
        <h1 className="contact-heading">Contact Us</h1>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Name Input */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <div className="input-with-icon">
              <img src={idCardIcon} alt="Name Icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <img src={mailIcon} alt="Email Icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Please enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Message Input */}
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <div className="textarea-wrapper">
              <textarea
                id="message"
                name="message"
                placeholder="Please enter your message"
                value={form.message}
                onChange={handleChange}
              />
              {!form.message && (
                <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
              )}
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
