"use client"
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/auth/authSlice';
import colorReducer from './Features/color/colorSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
