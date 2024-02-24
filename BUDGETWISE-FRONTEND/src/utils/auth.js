import API from '../services/apiService';

export const validateToken = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000/v1/auth/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Assuming the backend sends back some data on success
  } catch (error) {
    console.error('Token validation error:', error);
    throw error; // Re-throw or handle as needed
  }
};


export const getToken = () => localStorage.getItem('authToken');

export const setToken = (token) => localStorage.setItem('authToken', token);

export const removeToken = () => localStorage.removeItem('authToken');

// Optionally, implement a function to validate the token with the backend
// This could involve calling an endpoint that verifies the token's validity

