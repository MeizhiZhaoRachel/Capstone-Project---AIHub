import React from "react";
import "../style/Header.css";


function Header() {
  return (
    <header className="custom-header">
      <div class="container">
      <div className="header-content">
        
          <nav className="nav-links">
            <p>Home</p>
            <p>Categories</p>
            <p>About Us</p>
          </nav>

          <div className="action-buttons">
            <button type="button" className="login-button">Login</button>
            <button type="button" className="signup-button">Sign-up</button>
          </div>
          </div>
        </div>
      
    </header>
  );
}

export default Header;

