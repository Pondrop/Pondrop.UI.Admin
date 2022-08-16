import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, IFilterState } from "./types";

const setFilter = (state: IFilterState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value
    }
  };
};

export const actions = { setFilter };
