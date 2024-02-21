// src/utils/auth.js
export const getToken = () => localStorage.getItem('authToken');

export const setToken = (token) => localStorage.setItem('authToken', token);

export const removeToken = () => localStorage.removeItem('authToken');

// Optionally, implement a function to validate the token with the backend
// This could involve calling an endpoint that verifies the token's validity
export const validateToken = async (token) => {
  // Use your existing apiService to send the token to the backend for validation
  // Return user data or a validation result based on the backend response
};
