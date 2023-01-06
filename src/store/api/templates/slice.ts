import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { templateInitialState } from "./initialState";

export const templateSlice = createSlice({
  name: 'templates',
  initialState: templateInitialState,
  reducers: actions,
});

export const selectTemplates = (state: RootState) => state.templates;

export const { resetTemplatesToInitialState, setDidCreateTemplate, setNewTemplateSelectedFieldIds, setSelectedFields, setTemplatesFilter, setTemplatesSearchValue, setTemplatesSortValue } = templateSlice.actions;

export default templateSlice.reducer;
