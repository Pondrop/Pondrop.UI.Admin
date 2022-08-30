import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { storeApi } from './api/stores/api';
import { productsApi } from './api/products/api';
import productsReducer from './api/products/slice';
import storeReducer from './api/stores/slice';
import userReducer from './user/slice';

// global store
export const store = configureStore({
  reducer: {
    store: storeReducer,
    user: userReducer,
    products: productsReducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(storeApi.middleware)
      .concat(productsApi.middleware),
});

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
