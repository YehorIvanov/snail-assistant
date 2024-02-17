import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  barista: '',
  admin: '',
  status: '',
  cafe: '',
  name: '',
  notStatus: '',
};

const ordersFiltersSlice = createSlice({
  name: 'ordersFilters',
  initialState,
  reducers: {
    setOrdersFilters: (state, action) => {
      return action.payload;
    },
    unsetOrdersFilters: () => {
      return initialState;
    },
  },
});
export const { setOrdersFilters, unsetOrdersFilters } =
  ordersFiltersSlice.actions;
export const selectOrdersFilters = (state) => state.ordersFilters;
export default ordersFiltersSlice.reducer;
