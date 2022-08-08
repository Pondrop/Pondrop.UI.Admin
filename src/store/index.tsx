import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storesReducer from 'store/stores/slice';
import userReducer from 'store/user/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// global store
export const store = configureStore({
  reducer: {
    stores: storesReducer,
    user: userReducer,
  },
});

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
