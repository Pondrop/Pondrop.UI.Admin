import { initialState } from '../constants';
import { IGridState } from "../types";

export const campaignInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'campaignPublishedDate',
    sort: 'asc'
  }
};
