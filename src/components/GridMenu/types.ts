import { ChangeEvent } from "react";
import { GridColDef, GridColumnMenuProps, GridRowsProp } from "@mui/x-data-grid";

import { IFacetValue, IFilterItem } from "store/api/types";

export interface ICustomMenuProps extends GridColumnMenuProps {
  data?: GridRowsProp[];
  filterItem: IFilterItem;
  handleOnFilterClick?: (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => void;
  menuData: IFacetValue;
}
