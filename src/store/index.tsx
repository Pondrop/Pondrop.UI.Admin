import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { categoriesApi, categoriesMicroService } from './api/categories/api';
import { storeApi } from './api/stores/api';
import { productsApi } from './api/products/api';
import { tasksApi } from './api/tasks/api';
import categoriesReducer from './api/categories/slice';
import productsReducer from './api/products/slice';
import storeReducer from './api/stores/slice';
import tasksReducer from './api/tasks/slice';
import userReducer from './user/slice';

// global store
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    store: storeReducer,
    tasks: tasksReducer,
    user: userReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [categoriesMicroService.reducerPath]: categoriesMicroService.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(storeApi.middleware)
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(categoriesMicroService.middleware)
      .concat(tasksApi.middleware),
});

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
