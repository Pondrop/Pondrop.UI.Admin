import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { taskInitialState } from "./initialState";

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskInitialState,
  reducers: actions,
});

export const selectTasks = (state: RootState) => state.tasks;

export const { setTasksFilter, setTasksSearchValue, setTasksSortValue } = tasksSlice.actions;

export default tasksSlice.reducer;
