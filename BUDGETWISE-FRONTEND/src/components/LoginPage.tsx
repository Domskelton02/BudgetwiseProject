import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../services/apiService';
import { setCredentials as setAuthCredentials } from '../redux/slices/authSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Container, Typography, Stack, Alert, Box, Card, CardContent, Link } from '@mui/material';

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  interface LoginResponse {
    token: string;
    user: {
      id: string;
      email: string;
      // Add other user fields as necessary
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(loginCredentials);
      const data: LoginResponse = response.data; // Cast the response data to the LoginResponse type
      dispatch(setAuthCredentials({ token: data.token, user: data.user }));
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

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
