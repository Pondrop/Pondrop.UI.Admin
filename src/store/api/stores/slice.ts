import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { initialState } from "./initialState";

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: actions,
});

export const selectStores = (state: RootState) => state.store;

export const { setStoresFilter, setStoresSearchValue } = storeSlice.actions;

export default storeSlice.reducer;
