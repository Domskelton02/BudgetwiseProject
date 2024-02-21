import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/authSlice'; // Adjust the import path as necessary
import { userService } from '../services/apiService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define the type for the user data based on your actual data structure
type User = {
  id: string;
  name: string;
  email: string;
  // Add other user fields as necessary
};

// If you have a specific theme for the dashboard, define it here
const dashboardTheme = createTheme({
  // ...theme settings
});

const Dashboard = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the current user from the Redux store
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    // ...fetch user data logic
  }, [currentUser]);

  if (!currentUser) return <div>Please log in to view this page.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Wrap your component with the Material-UI ThemeProvider if specific theming is needed
  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        {userData && (
          <div className="user-details">
            {/* Display user data here */}
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
