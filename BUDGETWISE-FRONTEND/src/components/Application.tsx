// Application.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import { setCredentials, logout } from '../redux/slices/authSlice';

async function validateToken(token) {
  try {
    // Replace with your actual backend endpoint
    const response = await fetch('/api/v1/auth/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    // If your backend sends a specific response body, parse it here
    // const data = await response.json();
    // return data.valid;

    // If the backend endpoint simply returns a 200 OK for valid tokens,
    // then the token is valid if we get to this point
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}

const Application: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuthState = async () => {
      const token = localStorage.getItem('authToken');
      const userInfo = localStorage.getItem('userInfo');

      if (token && userInfo) {
        const isValidToken = await validateToken(token);
        if (isValidToken) {
          const user = JSON.parse(userInfo);
          dispatch(setCredentials({ token, user }));
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userInfo');
          dispatch(logout());
        }
      }
    };

    initAuthState();
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
