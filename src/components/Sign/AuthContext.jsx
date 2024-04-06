import React, { createContext, useContext, useState } from 'react';

// Create a Context object for authentication data
const AuthContext = createContext();

// Define a provider component to encapsulate the authentication logic and state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null); // Store the JWT token

  // Function to update state with user and token
  // A token, in the context of web authentication, 
  // is a cryptographically signed piece of data 
  // issued by a server to authenticate and authorize a user or application accessing a secured resource
  const authenticateUser = (user, token) => {
    setCurrentUser(user);
    setAuthToken(token);
    // Optionally, store the token in localStorage or sessionStorage for persistence across page reloads
    localStorage.setItem('authToken', token);
  };

  const signIn = async (formData) => {
    try {
      const response = await fetch('https://aihub.au/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Sign in failed');
      const { token } = await response.json();
      // Simulate getting user data, in a real app, you might return this data from your API
      authenticateUser({ email: formData.email }, token);
    } catch (error) {
      console.error('SignIn Error:', error);
      // Handle error state as needed
    }
  };

  const signUp = async (formData) => {
    try {
      const response = await fetch('https://aihub.au/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Sign up failed');
      const user = await response.json();

      authenticateUser(user, null); // Adjust based on your API response
    } catch (error) {
      console.error('SignUp Error:', error);
    }
  };

  const signOut = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
