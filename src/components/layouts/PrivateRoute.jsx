import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading'

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  
  if (auth.loading) {
    return <Loading />; // Or a spinner
  }

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
