import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import ordersDesingsReducer from './slices/ordersDesingsSlise';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    error: errorReducer,
    ordersDesings: ordersDesingsReducer,
    orders: ordersReducer,
  },
});

export default store;
