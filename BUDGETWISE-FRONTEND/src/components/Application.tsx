// Application.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '../redux/slices/authSlice';

const Application: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthState = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          // Replace the URL with your actual API endpoint
          const response = await fetch('/api/auth/validate', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });

          if (response.ok) {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
              const user = JSON.parse(userInfo);
              dispatch(setCredentials({ token: authToken, user }));
            }
          } else {
            // Token is invalid or expired
            dispatch(logout());
          }
        } catch (error) {
          console.error('Token validation error:', error);
          dispatch(logout());
        }
      }
    };

    checkAuthState();
  }, [dispatch]);

  // ... rest of your Application component
};

export default Application;
