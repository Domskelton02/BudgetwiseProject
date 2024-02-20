import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../services/apiService';
import { setCredentials as setAuthCredentials } from '../redux/slices/authSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Container, Typography, Stack, Alert, Box, Card, CardContent, Link } from '@mui/material';

const LoginPage: React.FC = () => {
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(loginCredentials);
      dispatch(setAuthCredentials(data));
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || 'Failed to login');
      }
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
            >
              Sign In
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
