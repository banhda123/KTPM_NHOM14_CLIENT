import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthController.isAuthenticated();
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute; 