import { initialState } from '../constants';
import { IGridState } from "../types";

export const taskInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'submittedUtc',
    sort: 'desc'
  }
};
