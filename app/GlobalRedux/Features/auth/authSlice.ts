import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  // id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

const initialState: UserState = {
  // id: null,
  name: null,
  email: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      // state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    clearUser(state) {
      // state.id = null;
      state.name = null;
      state.email = null;
      state.image = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
