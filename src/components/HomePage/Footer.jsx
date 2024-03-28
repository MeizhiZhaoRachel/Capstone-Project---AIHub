import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Footer.css";

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-logo">AIHub</div>
      <div className="footer-text">
        <p>
          Our mission is to enhance quality assurance and promote close
          collaboration and trust between users and developers by building a
          robust rating and review system. By leveraging blockchain technology,
          TrustAI provides users with a fair, transparent and secure platform to
          rate and review AI services and models.
        </p>
      </div>
      <div className="footer-column1">
        <h6>Categories</h6>
        <ul className="footer-list">
        </ul>
      </div>
      <div className="footer-column2">
        <h6>About AIHub</h6>
        <ul className="footer-list">
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
        </ul>
      </div>
      <div className="footer-column3">
        <h6>Customer</h6>
        <ul className="footer-list">
          <li><Link to="/signin">Log in</Link></li>
          <li><Link to="/signup">Sign-up</Link></li>
        </ul>
      </div>
      <div className="footer-media">
      </div>
      <div className="footer-copyright">
        <p>©2024 AIHub - All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
