import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { setError } from './errorSlice';
export const subscribeToCafe = createAsyncThunk(
  'cafe/subscribeToCafe',
  async (_, { getState }, chunkAPI) => {
    console.log('subscribe to orders');
    try {
      const { path, orderedBy, limit, where1, where2 } = getState().cafe.params;
      const currentTime = new Date().getTime();
      const lastUpdate = getState().cafe.lastUpdate;
      if (lastUpdate + 6000 < currentTime) {
        return await getDocsColectionFromDB(
          path,
          orderedBy,
          limit,
          where1,
          where2
        );
      } else {
        const remainingTime = lastUpdate + 60000 - currentTime;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              getDocsColectionFromDB(path, orderedBy, limit, where1, where2)
            );
          }, remainingTime);
        });
      }
    } catch (error) {
      chunkAPI.dispatch(setError(error.message));
      return chunkAPI.rejectWithValue(error);
    }
  }
);

const cafeSlice = createSlice({
  name: 'cafe',
  initialState: {
    cafeList: [],
    lastUpdate: '',
    params: {
      path: 'cafe',
      limit: 200,
      where1: '',
      where2: '',
      orderedBy: 'name',
    },
  },
  //   reducers: {
  //     clearOrdersDesigns: (state) => {
  //       state.orders = [];
  //     },
  //     orderUpdated: (state, action) => {
  //       state.orders = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      //   .addCase(subscribeToOrdersDesings.pending, (state) => {
      //     state.status = 'loading';
      //   })
      .addCase(subscribeToCafe.fulfilled, (state, action) => {
        if (action.payload) {
          state.cafeList = action.payload;
          state.lastUpdate = new Date().getTime();
        }
      })
      .addCase(subscribeToCafe.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});

// export const { clearOrdersDesigns, orderUpdated } = ordersDesingsSlice.actions;
export const selectCafeList = (state) => state.cafe.cafeList;
export default cafeSlice.reducer;
//
