import { PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "../constants";
import { IFilterItem, IGridState, ISortItem } from "../types";

const setTemplatesFilter = (state: IGridState, action: PayloadAction<IFilterItem[]>) => {
  return {
    ...state,
    filterItem: [...action.payload]
  };
};

const setTemplatesSearchValue = (state: IGridState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setTemplatesSortValue = (state: IGridState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const resetTemplatesToInitialState = (state: IGridState, action: PayloadAction<undefined>) => {
  return {
    ...state,
    ...initialState,
  };
};

export const actions = { resetTemplatesToInitialState, setTemplatesFilter, setTemplatesSearchValue, setTemplatesSortValue };
