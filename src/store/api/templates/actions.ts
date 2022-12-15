import { PayloadAction } from "@reduxjs/toolkit";

import { ITemplateState } from "./initialState";
import { initialState } from "../constants";
import { IFilterItem, ISortItem } from "../types";

const setTemplatesFilter = (state: ITemplateState, action: PayloadAction<IFilterItem[]>) => {
  return {
    ...state,
    filterItem: [...action.payload]
  };
};

const setTemplatesSearchValue = (state: ITemplateState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setTemplatesSortValue = (state: ITemplateState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const resetTemplatesToInitialState = (state: ITemplateState, action: PayloadAction<undefined>) => {
  return {
    ...state,
    ...initialState,
  };
};

const setDidCreateTemplate = (state: ITemplateState, action: PayloadAction<boolean>) => {
  return {
    ...state,
    didCreateTemplate: action.payload
  };
};

export const actions = { resetTemplatesToInitialState, setDidCreateTemplate, setTemplatesFilter, setTemplatesSearchValue, setTemplatesSortValue };
