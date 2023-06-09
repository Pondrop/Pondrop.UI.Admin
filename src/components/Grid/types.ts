import { MouseEvent } from 'react';
import { GridCallbackDetails, GridColDef, GridFilterModel, GridInitialState, GridInputSelectionModel, GridRowParams, GridSelectionModel, GridSortModel, MuiEvent } from '@mui/x-data-grid-pro';

// Types
import { IFacetValue, IFilterItem } from "store/api/types";

// Props passed to Grid component
export interface IGridProps {
  data?: unknown[];
  columns: GridColDef[];
  id: string;
  dataIdKey: string;
  isFetching: boolean;
  onFilterModelChange?: (model: GridFilterModel) => void;
  filterItem?: IFilterItem[];
  handleOnFilterClick?: (value: string, currColumn: string, currFilterItems: IFilterItem[]) => void;
  rowCount?: number;
  onPageChange?: (page: number, details: GridCallbackDetails) => void;
  onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
  menuData?: IFacetValue;
  onSortModelChange?: (model: GridSortModel) => void;
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
  hideFooter?: boolean;
  page?: number;
  borderColor?: string;
  disableColumnMenu?: boolean;
  isRowSelectable?: (params: GridRowParams) => boolean;
}
