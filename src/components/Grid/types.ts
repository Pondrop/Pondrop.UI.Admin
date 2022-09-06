import { MouseEvent } from "react";
import { GridCallbackDetails, GridColDef, GridFilterModel, GridInitialState, GridRowParams, GridSortModel, MuiEvent } from "@mui/x-data-grid";

import { IFacetValue, IFilterItem, IValue } from "store/api/types";

export interface IGridProps {
  data?: IValue[];
  columns: GridColDef[];
  id: string;
  isFetching: boolean;
  onFilterModelChange: (model: GridFilterModel) => void;
  filterItem: IFilterItem;
  handleOnFilterClick?: (value: string, currentColumn: string) => void;
  rowCount: number;
  onPageChange: (page: number, details: GridCallbackDetails) => void;
  onPageSizeChange: (pageSize: number, details: GridCallbackDetails) => void;
  menuData: IFacetValue;
  onSortModelChange: (model: GridSortModel) => void;
  initialState?: GridInitialState;
  onRowClick?: (params: GridRowParams, event: MuiEvent<MouseEvent>, details: GridCallbackDetails) => void;
  withBorder?: boolean;
}
