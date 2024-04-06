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

  // It sends the user's sign-in credentials to the server and updates the app state with the response
  const signIn = async (formData) => {
    try {
      const response = await fetch('https://aihub.au/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Sign in failed');
      // within the response JSON object received from the server, 
      // there's a property named token, and this property is being extracted into a standalone variable also named token
      const { token } = await response.json();
      // ??
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
      // adjust according to API response
      authenticateUser(user, null); 
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
