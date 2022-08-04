import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchTransactions } from './transactionsAPI';
import { IRepaymentDetails } from 'models';

export interface ITransactionsState {
  value: IRepaymentDetails[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state
const initialState: ITransactionsState = {
  value: [],
  status: 'idle',
};

// Actions
export const getTransactionsAsync = createAsyncThunk('transactions/fetchTransactions', async (amount: number) => {
  const response = await fetchTransactions(amount);
  return response.data;
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: (state) => {
      state.value = [
        {
          repaymentDate: '',
          repaymentAmount: 1,
          fees: 1,
          directDebitDate: '',
          directDebitAmount: 1,
          Status: '',
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransactionsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { getTransactions } = transactionsSlice.actions;

// Selectors
export const selectTransactions = (state: RootState) => state.transactions;

// Reducer
export default transactionsSlice.reducer;
