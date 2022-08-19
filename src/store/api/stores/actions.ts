import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem } from "../types";
import { IStoreState } from "./types";

const setFilter = (state: IStoreState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value,
      operatorValue: action.payload.operatorValue
    }
  };
};

const setSearchValue = (state: IStoreState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

export const actions = { setFilter, setSearchValue };
