// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Make sure the import path is correct

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useAuth();

  // If there's no current user, redirect to the sign-in page
  return currentUser ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
