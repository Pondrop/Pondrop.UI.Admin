import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { fetchStores } from './api';
import { initialState } from './initialState';

export const getStoresAsync = createAsyncThunk('transactions/fetchStores', async (amount: number) => {
  const response = await fetchStores(amount);
  return response.data;
});

export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    getStores: (state) => {
      state.value = [
        {
          storeId: 0,
          storeName: '',
          storeType: '',
          address: '',
          status: '',
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStoresAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const selectStores = (state: RootState) => state.stores;
export const { getStores } = storeSlice.actions;
export default storeSlice.reducer;
