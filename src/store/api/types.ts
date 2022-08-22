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

export interface IGridState {
  filterItem: IFilterItem;
  searchValue?: string;
}

