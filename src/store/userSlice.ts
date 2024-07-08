import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  filter: string;
}

const initialState: UserState = {
  filter: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});


export const { setFilter } = userSlice.actions;
export default userSlice;
