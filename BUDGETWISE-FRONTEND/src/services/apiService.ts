// src/services/apiService.ts

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3000/v1',
});


export const login = async (credentials: { email: string; password: string }) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export default API;
