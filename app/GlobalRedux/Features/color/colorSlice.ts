import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
  selectedColor: string;
}

const initialState: ColorState = {
  selectedColor: '#000000', // Default to black color
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<string>) {
      state.selectedColor = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
