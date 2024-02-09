import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { setError } from './errorSlice';
export const subscribeToUsers = createAsyncThunk(
  'users/subscribeToUsers',
  async (_, { getState }, chunkAPI) => {
    try {
      const { path, orderedBy, limit, where1, where2 } =
        getState().users.params;
      const currentTime = new Date().getTime();
      const lastUpdate = getState().orders.lastUpdate;
      if (lastUpdate + 6000 < currentTime) {
        // console.log('updated');
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
            // console.log('updated');
          }, remainingTime);
        });
      }
    } catch (error) {
      console.log(error);
      chunkAPI.dispatch(setError(error.message));
      return chunkAPI.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    lastUpdate: '',
    params: {
      path: 'users',
      limit: 20,
      where1: '',
      where2: '',
      orderedBy: 'lastLogin',
    },
  },
  reducers: {
    clearUsers: (state) => {
      state.orders = [];
    },
    usersUpdated: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(subscribeToUsers.pending, (state) => {
      //     state.status = 'loading';
      //   })
      .addCase(subscribeToUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload;
          state.lastUpdate = new Date().getTime();
        }
      })
      .addCase(subscribeToUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// export const { clearOrdersDesigns, orderUpdated } = ordersDesingsSlice.actions;
export const selectUsers = (state) => state.users.users;
export default usersSlice.reducer;
