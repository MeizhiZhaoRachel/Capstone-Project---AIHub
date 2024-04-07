import React from "react";
import { Link } from "react-router-dom";
import "../../style/HomePage/Header.css";
import { useAuth } from "../Sign/AuthContext";

function Header() {
  // Accessing the user state from the UserContext
  const { currentUser } = useAuth();


  return (
    <header className="custom-header">
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bootstrap"
          viewBox="0 0 16 16"
        >
          <path d="M5.062 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23zm0 3.762V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377z" />
          <path d="M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4zm4-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3z" />
        </svg>
      </div>
      <nav className="nav-links">
        <ul>
        <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/productlist">Categories </Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className="action-buttons">
        {currentUser ? (
          // If user is signed in, display nickname
          <div className="user-nickname">{currentUser.nickname}</div>
        ) : (
          // If not signed in, show Login/Sign-up buttons
          <>
            <Link to="/signin" className="login-button">
              Login
            </Link>
            <Link to="/signup" className="signup-button">
              Sign-up
            </Link>
          </>
        )}
        </div>
    </header>
  );
}


export default Header;
