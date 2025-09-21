// Contact.js
import React from 'react';

function Contact() {
  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5 mb-5"
      style={{ minHeight: '60vh' }}
    >
      <div
        className="card shadow-lg p-4 text-start"
        style={{
          width: '40%',
          backgroundColor: '#f0f4f8',
          borderRadius: '10px',
        }}
      >
        <h4 className="mb-4 text-primary text-center">📬 Contact Us</h4>
        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
