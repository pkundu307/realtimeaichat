import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  userInfo: object | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Thunk to handle login API call
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
