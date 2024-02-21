import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute';
import { setCredentials } from './redux/slices/authSlice'; // Assuming these actions are implemented
import './App.css';

// Define your theme for Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Application />
      </ThemeProvider>
    </Provider>
  );
};

// Refactored Application component
const Application = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for a stored auth token and user info in local storage
    const authToken = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo'); // Assuming you store user info in local storage

    if (authToken && userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(setCredentials({ token: authToken, user }));
    }

    // Do not return a cleanup function that logs out the user
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
