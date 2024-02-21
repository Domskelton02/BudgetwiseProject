import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import your components
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard'; // Assuming this is the path to your Dashboard component
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute'; // Custom component to handle protected routes

import './App.css';

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
        <Router>
          <Routes>
            {/* Updated Route Configuration */}
            <Route path="/" element={<HomePage />} /> {/* Unprotected HomePage Route */}
            <Route path="/login" element={<LoginPage />} /> {/* Unprotected LoginPage Route */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> {/* Protected Dashboard Route */}
            
            {/* Redirect any unmatched path to the HomePage */}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
