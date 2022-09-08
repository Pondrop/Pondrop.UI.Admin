import { GridColumnMenuProps, GridRowsProp } from "@mui/x-data-grid";

import { IFacetValue, IFilterItem } from "store/api/types";

export interface ICustomMenuProps extends GridColumnMenuProps {
  data?: GridRowsProp[];
  filterItem: IFilterItem;
  handleOnFilterClick?: (value: string, currentColumn: string) => void;
  menuData: IFacetValue;
  isMenuLoading?: boolean;
}
