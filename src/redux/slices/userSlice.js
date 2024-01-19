import { createSlice } from '@reduxjs/toolkit';
const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    unsetUser: () => {
      return initialState;
    },
  },
});
export const { setUser, unsetUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
