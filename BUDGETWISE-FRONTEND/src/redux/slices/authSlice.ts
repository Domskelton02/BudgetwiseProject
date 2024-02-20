// src/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the structure of the authentication state
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    id: string;
    email: string;
  } | null;
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
    setCredentials: (state, action: PayloadAction<{ token: string; user: { id: string; email: string } }>) => {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
    },
    // Action to remove the user's login state
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
    // Add more reducers as needed for your authentication logic
  },
});

// Export the action creators
export const { setCredentials, logout } = authSlice.actions;

// Selectors for using the state within components
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.user;

// Export the reducer
export default authSlice.reducer;
