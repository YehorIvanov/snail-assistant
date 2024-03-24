import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { setError } from './errorSlice';
export const subscribeToRecipes = createAsyncThunk(
  'recipes/subscribeToRecipes',
  async (_, { getState }, chunkAPI) => {
    try {
      const { path, orderedBy, limit, where1, where2 } =
        getState().recipes.params;
      const currentTime = new Date().getTime();
      const lastUpdate = getState().recipes.lastUpdate;
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

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipesList: [],
    lastUpdate: '',
    params: {
      path: 'recipes',
      limit: 200,
      where1: '',
      where2: '',
      orderedBy: 'docName',
    },
  },
  reducers: {
    setRecipesParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(subscribeToRecipes.fulfilled, (state, action) => {
        if (action.payload) {
          state.recipesList = action.payload;
          state.lastUpdate = new Date().getTime();
        }
      })
      .addCase(subscribeToRecipes.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});

export const selectRecipesList = (state) => state.recipes.recipesList;
export const { setRecipesarams } = recipesSlice.actions;
export default recipesSlice.reducer;
