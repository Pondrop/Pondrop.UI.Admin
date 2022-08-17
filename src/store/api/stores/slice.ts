import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { initialState } from "./initialState";

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: actions,
});

export const selectStore = (state: RootState) => state.store;

export const { setFilter, setSearchValue } = storeSlice.actions;

export default storeSlice.reducer;
