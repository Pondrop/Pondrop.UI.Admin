import { PayloadAction } from "@reduxjs/toolkit";

import { ICampaignState } from "./initialState";
import { IFilterItem, ISortItem } from "../types";

const setCampaignsFilter = (state: ICampaignState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value,
      operatorValue: action.payload.operatorValue
    }
  };
};

const setCampaignsSearchValue = (state: ICampaignState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setCampaignsSortValue = (state: ICampaignState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const setDidCreateCampaign = (state: ICampaignState, action: PayloadAction<boolean>) => {
  return {
    ...state,
    didCreateCampaign: action.payload
  };
};

export const actions = { setCampaignsFilter, setCampaignsSearchValue, setCampaignsSortValue, setDidCreateCampaign };
