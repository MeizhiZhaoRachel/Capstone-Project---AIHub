// AuthContext.js (Combined Context for User Data and Authentication)
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Use this for user details

  // Handle sign-in action
  const signIn = async (userData) => {
    // Simulate a sign-in process (e.g., authenticate with a backend server)
    // For demonstration, directly setting the user
    setCurrentUser(userData);
  };

  // Handle sign-up action
  const signUp = async (userData) => {
    // Simulate a sign-up process
    // This could involve sending the userData to a backend for registration
    // For now, just setting the currentUser as if they've signed up
    setCurrentUser(userData);
  };

  // Handle sign-out action
  const signOut = () => {
    setCurrentUser(null); // Clear the user data on sign-out
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
