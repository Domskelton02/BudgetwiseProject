import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the import path as necessary
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme'; // Adjust the import path as necessary
import LoginPage from './components/LoginPage'; // Adjust the import path as necessary
import HomePage from './components/HomePage'; // Adjust the import path as necessary
import './App.css'; // Tailwind CSS and any additional styles

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Material-UI component for baseline CSS */}
        <Router>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} exact />
            {/* Define additional routes here */}
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
