import { initialState } from '../constants';
import { IGridState } from "../types";

export const storeInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'Provider',
    sort: 'asc'
  }
};
