import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { campaignsApi } from './api/campaigns/api';
import { categoriesApi, categoriesMicroService } from './api/categories/api';
import { storeApi } from './api/stores/api';
import { productsApi, productsMicroService } from './api/products/api';
import { tasksApi, submissionsMicroService } from './api/tasks/api';
import campaignsReducer from './api/campaigns/slice';
import categoriesReducer from './api/categories/slice';
import productsReducer from './api/products/slice';
import storeReducer from './api/stores/slice';
import tasksReducer from './api/tasks/slice';
import templatesReducer from './api/templates/slice';
import userReducer from './user/slice';

// global store
export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    categories: categoriesReducer,
    products: productsReducer,
    store: storeReducer,
    tasks: tasksReducer,
    templates: templatesReducer,
    user: userReducer,
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [categoriesMicroService.reducerPath]: categoriesMicroService.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [submissionsMicroService.reducerPath]: submissionsMicroService.reducer,
    [productsMicroService.reducerPath]: productsMicroService.reducer,
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
      .concat(tasksApi.middleware)
      .concat(submissionsMicroService.middleware)
      .concat(campaignsApi.middleware)
      .concat(productsMicroService.middleware),
});

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
