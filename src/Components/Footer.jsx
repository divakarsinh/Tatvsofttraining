// Footer.js
import React from 'react';
// import './Footer.css'; // You can define styles for the footer in this file

const Footer = () => {
  return (
    <footer className="footer">
      {/* Your footer content */}
      <p>&copy; {new Date().getFullYear()} Your App Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
