import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import ordersDesingsReducer from './slices/ordersDesingsSlise';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';
import ordersFiltersReducer from './slices/ordersFiltersSlice';
import cafeReducer from './slices/cafeSlice'
const store = configureStore({
  reducer: {
    cafe: cafeReducer,
    user: userReducer,
    users: usersReducer,
    error: errorReducer,
    ordersDesings: ordersDesingsReducer,
    orders: ordersReducer,
    ordersFilters: ordersFiltersReducer,
  },
});

export default store;
