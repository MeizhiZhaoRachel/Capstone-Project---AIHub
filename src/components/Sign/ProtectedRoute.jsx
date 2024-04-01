import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary

function ProtectedRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth(); // Use currentUser from AuthContext

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
}

export default ProtectedRoute;
