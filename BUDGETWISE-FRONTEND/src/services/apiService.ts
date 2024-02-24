import axios, { AxiosResponse } from 'axios';
import {
  UserData,
  LoginCredentials,
  RefreshToken,
  ForgotPasswordRequest,
  LoginResponse
} from '../types';

// Create an Axios instance with a base URL from environment variables or fallback to a default
const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3000/v1',
});

// Define a service for handling authentication-related operations
export const authService = {
  register: (userData: UserData): Promise<AxiosResponse<UserData>> => API.post('/auth/register', userData),
  login: (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => API.post('/auth/login', credentials),
  logout: (refreshToken: RefreshToken): Promise<AxiosResponse<string>> => API.post('/auth/logout', refreshToken),
  refreshTokens: (refreshToken: RefreshToken): Promise<AxiosResponse<string>> => API.post('/auth/refresh-tokens', refreshToken),
  forgotPassword: (email: ForgotPasswordRequest): Promise<AxiosResponse<string>> => API.post('/auth/forgot-password', email),
  resetPassword: (data: any): Promise<AxiosResponse<string>> => API.post('/auth/reset-password', data),
  sendVerificationEmail: (): Promise<AxiosResponse<string>> => API.post('/auth/send-verification-email'),
  verifyEmail: (token: any): Promise<AxiosResponse<string>> => API.post('/auth/verify-email', token),
};

// Define a service for handling user-related operations
export const userService = {
  createUser: (userData: UserData): Promise<AxiosResponse<UserData>> => API.post('/users', userData),
  getUsers: (queryParams: any): Promise<AxiosResponse<UserData[]>> => API.get('/users', { params: queryParams }),
  getUser: (userId: string): Promise<AxiosResponse<UserData>> => API.get(`/users/${userId}`),
  updateUser: (userId: string, userData: UserData): Promise<AxiosResponse<UserData>> => API.patch(`/users/${userId}`, userData),
  deleteUser: (userId: string): Promise<AxiosResponse<string>> => API.delete(`/users/${userId}`),
};

// Export the configured Axios instance for use in other parts of the application
export default API;
