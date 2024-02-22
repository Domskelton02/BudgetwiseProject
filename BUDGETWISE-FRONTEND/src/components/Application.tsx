// Application.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import { setCredentials } from '../redux/slices/authSlice';

const Application: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialization logic
    const authToken = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    
    if (authToken && userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(setCredentials({ token: authToken, user }));
    }
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
