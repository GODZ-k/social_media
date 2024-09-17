import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoutes({ children }) {
  const user = useSelector(state => state.auth.status);

  if (user) {
    // Redirect logged-in users to the homepage (or another page)
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoutes;
