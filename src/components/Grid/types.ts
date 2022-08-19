import { ChangeEvent } from "react";
import { GridColDef, GridFilterModel } from "@mui/x-data-grid";

import { IFilterItem, IValue } from "store/api/types";

export interface IGridProps {
  data?: IValue[];
  columns: GridColDef[];
  id: string;
  isFetching: boolean;
  onFilterModelChange: (model: GridFilterModel) => void;
  filterItem: IFilterItem;
  handleOnFilterClick?: (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => void;
}
