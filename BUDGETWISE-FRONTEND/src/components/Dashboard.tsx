import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/authSlice'; // Adjust the import path as necessary
import { userService } from '../services/apiService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Typography, Container, Box } from '@mui/material';

type User = {
  id: string;
  name: string;
  email: string;
};

// If you have a specific theme for the dashboard, define it here
const dashboardTheme = createTheme({
  // ...theme settings
});

const Dashboard = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser?.id) {
      userService.getUser(currentUser.id)
        .then(response => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data. Please try again.');
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (!currentUser) return <div>Please log in to view this page.</div>;
  if (loading) return <Container><CircularProgress /></Container>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Your Dashboard, {userData?.name}
          </Typography>
          <Typography variant="body1">Email: {userData?.email}</Typography>
          {/* Add more user details as needed */}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
