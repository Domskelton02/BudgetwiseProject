import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../services/apiService';
import { setCredentials as setAuthCredentials } from '../redux/slices/authSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Container, Typography, Stack, Alert, Box, Card, CardContent, Link } from '@mui/material';
import { validateToken } from '../utils/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // Add other user fields as necessary
  };
}

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle change in text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  // Submit the login form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(loginCredentials);
      console.log(response.data);
      const data: LoginResponse = response.data;
      localStorage.setItem('authToken', data.token); // Store the token in local storage
      dispatch(setAuthCredentials({ token: data.token, user: data.user }));
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Check for existing auth token on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      validateToken(token).then((validationResult) => {
        if (validationResult.valid) {
          // Assuming validationResult contains user data; adjust accordingly
          dispatch(setAuthCredentials({ token, user: validationResult.user }));
          navigate('/dashboard');
        } else {
          localStorage.removeItem('authToken'); // Token is invalid, remove it
          // Optionally, redirect to login or display a message
        }
      }).catch((error) => {
        console.error('Error validating token:', error);
        localStorage.removeItem('authToken'); // On error, assume token is invalid and remove it
        // Optionally, redirect to login or display a message
      });
    }
  }, [dispatch, navigate]);
  

  return (
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px'
    }}>
      <Card sx={{ mt: 8, mb: 2, padding: 3, width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Budget Wise
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Enter your email"
              value={loginCredentials.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={loginCredentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              Register
            </Link>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot Password?
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
