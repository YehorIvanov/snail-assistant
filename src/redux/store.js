import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import ordersDesingsReducer from './slices/ordersDesingsSlise';
import ordersReducer from './slices/ordersSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    ordersDesings: ordersDesingsReducer,
    orders: ordersReducer,
  },
});

export default store;
