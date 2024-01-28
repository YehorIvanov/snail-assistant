import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { setError } from './errorSlice';
export const subscribeToOrders = createAsyncThunk(
  'ordersDesings/subscribeToOrders',
  async (_, { getState }, chunkAPI) => {
    try {
      const { path, limit, where1, where2 } = getState().ordersDesings.params;
      const currentTime = new Date().getTime();
      const lastUpdate = getState().ordersDesings.lastUpdate;
      if (lastUpdate + 6000 < currentTime) {
        console.log('updated');
        return await getDocsColectionFromDB(path, limit, where1, where2);
      } else {
        const remainingTime = lastUpdate + 60000 - currentTime;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(getDocsColectionFromDB(path, limit, where1, where2));
            console.log('updated');
          }, remainingTime);
        });
      }
    } catch (error) {
      chunkAPI.dispatch(setError(error.message));
      return chunkAPI.rejectWithValue(error);
    }
  }
);

const ordersDesingsSlice = createSlice({
  name: 'ordersDesings',
  initialState: {
    orders: [],
    lastUpdate: '',
    params: { path: 'ordersDesings', limit: 20, where1: '', where2: '' },
  },
  reducers: {
    clearOrdersDesigns: (state) => {
      state.orders = [];
    },
    orderUpdated: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscribeToOrders.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders = action.payload;
          state.lastUpdate = new Date().getTime();
        }
      })
      .addCase(subscribeToOrders.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearOrdersDesigns, orderUpdated } = ordersDesingsSlice.actions;
export const selectOrdersDesigns = (state) => state.ordersDesings.orders;
export default ordersDesingsSlice.reducer;
