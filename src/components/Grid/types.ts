import { MouseEvent } from "react";
import { GridCallbackDetails, GridColDef, GridFilterModel, GridInitialState, GridInputSelectionModel, GridRowParams, GridSelectionModel, GridSortModel, MuiEvent } from "@mui/x-data-grid";

import { IFacetValue, IFilterItem } from "store/api/types";
import { IBasicFilter } from "components/GridMenu/types";

export interface IGridProps {
  data?: unknown[];
  columns: GridColDef[];
  id: string;
  isFetching: boolean;
  onFilterModelChange: (model: GridFilterModel) => void;
  filterItem: IFilterItem;
  handleOnFilterClick?: (value: string, currColumn: string, filters: IBasicFilter) => void;
  rowCount: number;
  onPageChange: (page: number, details: GridCallbackDetails) => void;
  onPageSizeChange: (pageSize: number, details: GridCallbackDetails) => void;
  menuData: IFacetValue;
  onSortModelChange: (model: GridSortModel) => void;
  initialState?: GridInitialState;
  onRowClick?: (params: GridRowParams, event: MuiEvent<MouseEvent>, details: GridCallbackDetails) => void;
  withBorder?: boolean;
  isMenuLoading?: boolean;
  searchValue?: string;
  withPadding?: boolean;
  withCheckboxSelection?: boolean;
  rowHeight?: number;
  onSelectionModelChange?: (selectionModel: GridSelectionModel) => void;
  selectionModel?: GridInputSelectionModel;
  hideFooterSelectedRowCount?: boolean;
}
