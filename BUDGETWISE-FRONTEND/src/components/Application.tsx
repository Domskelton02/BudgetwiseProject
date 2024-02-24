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
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import { setCredentials, logout } from '../redux/slices/authSlice';
import API from '../services/apiService'; // Import the API instance for unified API calls

const Application: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuthState = async () => {
      const token = localStorage.getItem('authToken');
      const userInfo = localStorage.getItem('userInfo');

      if (token && userInfo) {
        try {
          // Use the API instance for token validation
          await API.get('/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = JSON.parse(userInfo);
          dispatch(setCredentials({ token, user }));
        } catch (error) {
          console.error('Error validating token:', error);
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
        <Route path="/register" element={<Register />} />
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
