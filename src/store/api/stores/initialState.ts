import { IStoreState } from "./types";

export const initialState: IStoreState = {
  filterItem: {
    columnField: '',
    value: [],
    operatorValue: ''
  },
  searchValue: ''
};
