import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { initialState } from "../constants";
import { actions } from "./actions";

export const templateSlice = createSlice({
  name: 'templates',
  initialState: initialState,
  reducers: actions,
});

export const selectTemplates = (state: RootState) => state.templates;

export const { resetTemplatesToInitialState, setTemplatesFilter, setTemplatesSearchValue, setTemplatesSortValue } = templateSlice.actions;

export default templateSlice.reducer;
