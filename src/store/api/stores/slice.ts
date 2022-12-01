import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { storeInitialState } from "./initialState";

export const storeSlice = createSlice({
  name: 'store',
  initialState: storeInitialState,
  reducers: actions,
});

export const selectStores = (state: RootState) => state.store;

export const { resetStoresToInitialState, setStoresFilter, setStoresSearchValue, setStoresSelectedIds, setStoresSortValue, setStoresSelectedProviders } = storeSlice.actions;

export default storeSlice.reducer;
