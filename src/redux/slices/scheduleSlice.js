import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { setError } from './errorSlice';
export const subscribeToSchedule = createAsyncThunk(
  'schedule/subscribeToSchedule',
  async (_, { getState }, chunkAPI) => {
    try {
      const { path, orderedBy, limit, where1, where2 } =
        getState().schedule.params;
      const currentTime = new Date().getTime();
      const lastUpdate = getState().schedule.lastUpdate;
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

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedule: [],
    lastUpdate: '',
    params: {
      path: 'schedule',
      limit: 200,
      where1: '',
      where2: '',
      orderedBy: 'docName',
    },
  },
  reducers: {
    setScheduleParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(subscribeToSchedule.fulfilled, (state, action) => {
        if (action.payload) {
          state.schedule = action.payload;
          console.log(action);
          state.lastUpdate = new Date().getTime();
        }
      })
      .addCase(subscribeToSchedule.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});

export const selectSchedule = (state) => state.schedule.schedule;
export const { setScheduleParams } = scheduleSlice.actions;
export default scheduleSlice.reducer;
//
