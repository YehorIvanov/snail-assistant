import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import ordersDesingsReducer from './slices/ordersDesingsSlise';
const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    ordersDesings: ordersDesingsReducer,
  },
});

export default store;
