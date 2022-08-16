import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, IFilterState } from "./types";

const setFilter = (state: IFilterState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value,
      operatorValue: action.payload.operatorValue
    }
  };
};

export const actions = { setFilter };
