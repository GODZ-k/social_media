import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const user = useSelector(state => state.auth.status);
  const location = useLocation();

  if (!user) {
    // Redirect unauthenticated users to the sign-in page
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Render the protected route
  return children;
}

export default ProtectedRoutes;
