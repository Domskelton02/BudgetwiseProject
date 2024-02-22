import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Selector to get the login state from the Redux store
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  // Redirect to login page if not logged in, otherwise render the Outlet which contains the child routes
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
