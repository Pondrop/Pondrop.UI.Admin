import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)<{ withBorder: boolean }>`
  padding: 16px 16px 0;
  
  ${({ withBorder }) => withBorder ? `
    border-radius: 12px;
    border: 1px solid #dde3ea;
  ` : 'border: none;'}

  & .MuiDataGrid-columnSeparator {
    display: none;
  }

  & .MuiDataGrid-row--lastVisible.MuiDataGrid-cell {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  & .MuiDataGrid-footerContainer {
    justify-content: center;
  }

  & .MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows {
    color: rgba(0, 0, 0, 0.5);
  }

  & .MuiInputBase-root {
    color: rgba(0, 0, 0, 0.5);
    margin-left: 0;
    margin-right: 25px;
  }

  & .MuiTablePagination-actions {
    margin-left: 23px;

    & button {
      padding: 8px 12px;
    }

    & :not(.Mui-disabled) {
      svg {
        fill: rgb(0, 0, 0);
      }
    }

    & .Mui-disabled {
      svg {
        fill: rgba(0, 0, 0, 0.5);
      }
    }
  }

  & .MuiDataGrid-cell {
    padding: 10px;
  }

  & .MuiDataGrid-cellContent {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & .MuiDataGrid-cell:focus {
    outline: none;
  }

  & .MuiDataGrid-row {
    cursor: pointer;
  }
`;

export const StyledCellContent = styled(Typography)`
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
