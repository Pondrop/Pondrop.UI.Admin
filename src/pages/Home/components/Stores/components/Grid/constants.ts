import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";

export const gridColumns: GridColDef[] = [
  { field: 'Provider', headerName: 'Provider', filterOperators: getGridStringOperators(),width: 150 },
  { field: 'Name', headerName: 'Store Name', filterOperators: getGridStringOperators(), width: 150 },
  { field: 'Street', headerName: 'Street', filterOperators: getGridStringOperators(), flex: 1 },
  { field: 'City', headerName: 'City', filterOperators: getGridStringOperators(), width: 100 },
  { field: 'State', headerName: 'State', filterOperators: getGridStringOperators(), width: 100 },
  { field: 'Zip_Code', headerName: 'Post Code', filterOperators: getGridStringOperators(), width: 150 },
];
