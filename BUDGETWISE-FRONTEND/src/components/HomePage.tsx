import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/authSlice'; // Adjust the path as needed
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Budgetwise
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Manage your finances effectively and efficiently.
          </Typography>
          <Box sx={{ '& > *': { m: 1 } }}>
            {isLoggedIn ? (
              <Button component={RouterLink} to="/dashboard" variant="contained" color="primary">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button component={RouterLink} to="/login" variant="contained" color="primary">
                  Login
                </Button>
                <Button component={RouterLink} to="/register" variant="outlined">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
