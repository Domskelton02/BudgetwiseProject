// src/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the structure of the authentication state
interface User {
  id: string;
  email: string;
  // Add other user fields as necessary
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}

// Initial state of the authentication slice
const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the user's login state
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Here you would also add logic to validate the token with the backend
    },
    // Action to remove the user's login state
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken'); // Remove the token from localStorage
    },
    // You can add more reducers as needed for your authentication logic
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout } = authSlice.actions;

// Selectors for using the state within components
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
