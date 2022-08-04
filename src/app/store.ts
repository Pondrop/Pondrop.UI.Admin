import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import transactionsReducer from 'features/transactions/transactionsSlice';
import userReducer from 'features/user/userSlice';
import applicationsReducer from 'features/applications/applicationsSlice';
import registerReducer from 'features/register/registerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    transactions: transactionsReducer,
    user: userReducer,
    register: registerReducer,
    applications: applicationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
