import React from "react";
import "../style/Header.css";


function Header() {
  return (
    <header className="custom-header">
      <div class="container">
      <div className="header-content">
        <div className="logo">
          logo
          </div>
          <nav className="nav-links">
            <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>About</li>
            </ul>
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

