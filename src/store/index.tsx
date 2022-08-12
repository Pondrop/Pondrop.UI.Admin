import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { storeApi } from './api/stores/api';
import userReducer from 'store/user/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// global store
export const store = configureStore({
  reducer: {
    user: userReducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware),
});

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
