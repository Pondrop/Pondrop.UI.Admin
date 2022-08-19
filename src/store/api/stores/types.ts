import { IFilterItem } from "../types";

export interface IStoreState {
  filterItem: IFilterItem;
  searchValue?: string;
}
