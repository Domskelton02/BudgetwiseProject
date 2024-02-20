import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Make sure the path is correct

export const store = configureStore({
  reducer: {
    auth: authReducer, // Use 'auth' or a different key that makes sense for your app
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
