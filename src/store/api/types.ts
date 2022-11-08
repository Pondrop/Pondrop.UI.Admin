import { GridSortDirection } from "@mui/x-data-grid";

export interface IValue {
  [key: string]: number | string | string[];
}

export interface IFacetDetails {
  count: number;
  value: string;
}

export interface IFacetValue {
  [key: string]: IFacetDetails[];
}

export interface IApiResponse {
  value: IValue[];
  "@odata.context"?: string;
  "@odata.nextLink"?: string;
  "@odata.count": number;
  "@search.facets"?: IFacetValue;
}

export interface IFilterItem {
  columnField: string;
  value: string | string[];
  operatorValue: string;
}

export interface ISortItem {
  field: string;
  sort: GridSortDirection;
}

export interface IGridState {
  filterItem: IFilterItem;
  searchValue?: string;
  sortValue: ISortItem;
  selectedIds?: string[] | number[];
  selectedCategories?: string[];
}

export interface IProductState extends IGridState {
  selectedParent: string;
}

export interface ICategories {
  id: string;
  name: string;
  type?: string;
}

export interface IProductValue {
  Id: string;
  Name: string;
  GTIN: string;
  Categories: ICategories[];
}

export interface IParentCategAPI {
  items: IValue[];
  count: number;
  limit: number;
  offset: number;
}
