import axios, { AxiosResponse } from 'axios';
import {
  UserData,
  LoginCredentials,
  RefreshToken,
  ForgotPasswordRequest,
  LoginResponse
} from '../types';

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3000/v1',
});

export const authService = {
  register: (userData: UserData) => API.post<UserData>('/auth/register', userData),
  login: (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => API.post<LoginResponse>('/auth/login', credentials),
  logout: (refreshToken: RefreshToken) => API.post<string>('/auth/logout', refreshToken),
  refreshTokens: (refreshToken: RefreshToken) => API.post<string>('/auth/refresh-tokens', refreshToken),
  forgotPassword: (email: ForgotPasswordRequest) => API.post<string>('/auth/forgot-password', email),
  resetPassword: (data: any) => API.post<string>('/auth/reset-password', data),
  sendVerificationEmail: () => API.post<string>('/auth/send-verification-email'),
  verifyEmail: (token: any) => API.post<string>('/auth/verify-email', token),
};

export const userService = {
  createUser: (userData: UserData) => API.post<UserData>('/users', userData),
  getUsers: (queryParams: any) => API.get<UserData[]>('/users', { params: queryParams }),
  getUser: (userId: string) => API.get<UserData>(`/users/${userId}`),
  updateUser: (userId: string, userData: UserData) => API.patch<UserData>(`/users/${userId}`, userData),
  deleteUser: (userId: string) => API.delete<string>(`/users/${userId}`),
};

export default API;
