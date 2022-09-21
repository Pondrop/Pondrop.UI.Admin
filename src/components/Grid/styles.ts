import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid, {
  shouldForwardProp: (prop) => !['withBorder', 'hasClickEvent'].includes(prop)
})<{ withBorder: boolean, hasClickEvent: boolean }>`
  padding: 8px 16px;
  
  ${({ withBorder }) => withBorder ? `
    border-radius: 12px;
    border: 1px solid #dde3ea;
  ` : 'border: none;'}

  & .MuiDataGrid-columnHeaders {
    min-height: 48px !important;
    max-height: 48px !important;
    line-height: 48px !important;
    font-size: 12px;
  }

  & .MuiDataGrid-virtualScroller {
    margin-top: 48px !important;
  }

  & .MuiDataGrid-columnSeparator {
    display: none;
  }

  & .MuiDataGrid-row--lastVisible.MuiDataGrid-cell {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  & .MuiDataGrid-footerContainer {
    justify-content: center;
    height: 44px;
    padding: 16px 0 4px;
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

  ${({ hasClickEvent }) => hasClickEvent && `
    & .MuiDataGrid-row {
      cursor: pointer;
    }
  `}
`;

export const StyledCellContent = styled(Typography)`
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
