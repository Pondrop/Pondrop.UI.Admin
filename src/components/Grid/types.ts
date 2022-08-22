import { ChangeEvent } from "react";
import { GridCallbackDetails, GridColDef, GridFilterModel } from "@mui/x-data-grid";

import { IFacetValue, IFilterItem, IValue } from "store/api/types";

export interface IGridProps {
  data?: IValue[];
  columns: GridColDef[];
  id: string;
  isFetching: boolean;
  onFilterModelChange: (model: GridFilterModel, details: GridCallbackDetails) => void;
  filterItem: IFilterItem;
  handleOnFilterClick?: (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => void;
  rowCount: number;
  onPageChange: (page: number, details: GridCallbackDetails) => void;
  onPageSizeChange: (pageSize: number, details: GridCallbackDetails) => void;
  menuData: IFacetValue;
}
