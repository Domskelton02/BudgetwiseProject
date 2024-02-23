// Application.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import Register from './Register'; // Import Register
import PrivateRoute from './PrivateRoute';
import { setCredentials, logout } from '../redux/slices/authSlice';

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('/api/v1/auth/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

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
        <Route path="/register" element={<Register />} /> {/* Register route added */}
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
