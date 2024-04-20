import React from "react";
import { Link } from "react-router-dom";
import "../../style/HomePage/Header.css";
import { useAuth } from "../Sign/AuthContext";
import UserMenu from "./UserMenu";

function Header() {
  // Accessing the user state from the UserContext
  const { currentUser, signOut } = useAuth();

  return (
    <header className="custom-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-img"></div>
          <p>AIHUB</p>
        </div>
        <div className="header-right">
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
              /* If user is signed in, display nickname */
              <UserMenu />
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
        </div>
      </div>
    </header>
  );
}

export default Header;
