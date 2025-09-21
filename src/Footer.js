// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer
      className="py-3 text-center text-muted"
      style={{
        backgroundColor: '#f2f2f2',
        borderTop: '1px solid #ccc',
        fontSize: '0.9rem',
      }}
    >
      <p className="mb-1">© {new Date().getFullYear()} FoodCart App. All rights reserved.</p>
      <small>Designed by Lingala using React & Bootstrap</small>
    </footer>
  );
}

export default Footer;
