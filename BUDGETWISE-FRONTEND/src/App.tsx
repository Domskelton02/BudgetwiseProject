import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute';
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
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} /> {/* Protected HomePage Route */}
            {/* Redirect any unmatched path to the LoginPage */}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
