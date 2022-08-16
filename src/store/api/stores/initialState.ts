import { IFilterState } from "./types";

export const initialState: IFilterState = {
  filterItem: {
    columnField: '',
    value: [],
    operatorValue: ''
  }
};
