// Application.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import { setCredentials, logout } from '../redux/slices/authSlice';

const Application: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthState = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        // If there's no token, ensure the user is considered logged out.
        dispatch(logout());
        return;
      }

      try {
        // Assume validateToken is an API call that validates the authToken.
        // You need to implement this API call based on your backend.
        const isValidToken = await validateToken(authToken);
        if (isValidToken) {
          const userInfo = localStorage.getItem('userInfo');
          if (userInfo) {
            const user = JSON.parse(userInfo);
            dispatch(setCredentials({ token: authToken, user }));
          }
        } else {
          // If the token is invalid, clear the auth state.
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error validating token:', error);
        dispatch(logout());
      }
    };

    checkAuthState();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default Application;

async function validateToken(token: string): Promise<boolean> {
  // Implement the API call to your backend to validate the token
  // This function should return true if the token is valid, false otherwise
  // Example:
  /*
  const response = await fetch('/api/validateToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response.ok;
  */
  throw new Error("validateToken function is not implemented.");
}
