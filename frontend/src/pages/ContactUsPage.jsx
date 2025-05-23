// src/pages/ContactUsPage.jsx
import React, { useState } from 'react';
import '../styles/ContactUsPage.css'; // Or AuthForm.css + ContactUsPageSpecific.css
import leftImage from '../assets/Contactus.jpg'; // Ensure path is correct
import mailIcon from '../assets/envelope.png';
import idCardIcon from '../assets/user.png';
import chatIcon from '../assets/message.png';

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isMessageFocused, setIsMessageFocused] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) { // Clear error for field being typed in
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (form.name.trim().split(' ').length < 2) newErrors.name = 'Please enter your full name';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.message.trim()) newErrors.message = 'Message cannot be empty';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Contact Form Submitted:', form);
      alert('Message sent! (Data in console)'); // Placeholder
      setForm({ name: '', email: '', message: '' }); // Clear form
    }
  };

  return (
    <div className="cu-page-container"> {/* Changed to cu- for Contact Us prefix */}

      <main className="cu-content-wrapper"> {/* Main scrollable area */}
        <div className="cu-split-layout"> {/* Similar to About Us for consistency */}
          <div className="cu-image-section"> {/* Was contact-left */}
            <img src={leftImage} alt="Contact Us Visual" className="cu-image" /> {/* Was contact-image */}
          </div>

          <div className="cu-form-section"> {/* Was contact-right */}
            <div className="cu-form-wrapper"> {/* To contain the form elements */}
              <h1 className="cu-title">Get in Touch</h1> {/* Was contact-heading */}

              <form onSubmit={handleSubmit} className="cu-form" noValidate>
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-with-icon">
                    <img src={idCardIcon} alt="" />
                    <input
                      type="text" id="name" name="name"
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  </div>
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <img src={mailIcon} alt="" />
                    <input
                      type="email" id="email" name="email"
                      placeholder="Your email address"
                      value={form.email} onChange={handleChange}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="message">Your Message</label>
                  <div className="textarea-wrapper">
                    {/* Show icon only if textarea is empty AND not focused */}
                    {!form.message && !isMessageFocused && (
                      <img src={chatIcon} alt="" className="textarea-icon-placeholder" />
                    )}
                    <textarea
                      id="message" name="message"
                      placeholder="Write your message here..."
                      value={form.message} onChange={handleChange}
                      onFocus={() => setIsMessageFocused(true)}
                      onBlur={() => setIsMessageFocused(false)}
                      rows="5"
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                  </div>
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>

                <button type="submit" className="cu-submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
