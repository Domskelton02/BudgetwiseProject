import API from '../services/apiService';

// Function to validate the token with the backend
export const validateToken = async (token) => {
  try {
    // Use the API instance to send the token to the backend for validation
    const response = await API.get('/auth/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Assuming the backend sends back some data on success
    return response.data;
  } catch (error) {
    console.error('Token validation error:', error);
    // Re-throw or handle as needed
    throw error;
  }
};

// Function to get the token from local storage
export const getToken = () => localStorage.getItem('authToken');

// Function to set the token in local storage
export const setToken = (token) => localStorage.setItem('authToken', token);

// Function to remove the token from local storage
export const removeToken = () => localStorage.removeItem('authToken');
