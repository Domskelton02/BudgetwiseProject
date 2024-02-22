// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Application from './components/Application'; // Import Application
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
        <Application /> {/* Use Application here */}
      </ThemeProvider>
    </Provider>
  );
};

export default App;