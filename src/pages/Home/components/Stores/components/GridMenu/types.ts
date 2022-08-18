import { GridColumnMenuProps, GridRowsProp } from "@mui/x-data-grid";

export interface ICustomMenuProps extends GridColumnMenuProps {
  data?: GridRowsProp[];
}
