import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchApplications } from './applicationsAPI';
import { IApplications } from 'models';

export interface IApplicationssState {
  value: IApplications[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state
const initialState: IApplicationssState = {
  value: [],
  status: 'idle',
};

// Actions
export const getApplicationsAsync = createAsyncThunk('applications/fetchApplications', async () => {
  const response = await fetchApplications();
  return response.data;
});

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApplicationsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const {} = applicationsSlice.actions;

// Selectors
export const selectApplications = (state: RootState) => state.applications;

// Reducer
export default applicationsSlice.reducer;
