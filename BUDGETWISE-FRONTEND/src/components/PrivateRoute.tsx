import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
