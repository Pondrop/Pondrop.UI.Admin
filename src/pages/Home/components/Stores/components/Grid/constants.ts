import { GridColDef } from "@mui/x-data-grid";

export const gridColumns: GridColDef[] = [
  { field: 'Provider', headerName: 'Provider', width: 150 },
  { field: 'Name', headerName: 'Store Name', width: 100 },
  { field: 'Street', headerName: 'Street', flex: 1 },
  { field: 'City', headerName: 'City', width: 100 },
  { field: 'State', headerName: 'State', width: 100 },
  { field: 'Zip_Code', headerName: 'Post Code', width: 150 },
];
