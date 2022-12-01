import { GridColumnMenuProps, GridRowsProp } from '@mui/x-data-grid-pro';

import { IFacetValue, IFilterItem } from 'store/api/types';

export interface IBasicFilter {
  field: string;
  value: string | string[];
}

export interface ICustomMenuProps extends GridColumnMenuProps {
  data?: GridRowsProp[];
  filterItems: IFilterItem[];
  handleOnFilterClick?: (value: string, currColumn: string, currFilterItems: IFilterItem[]) => void;
  menuData: IFacetValue;
  isMenuLoading?: boolean;
}
