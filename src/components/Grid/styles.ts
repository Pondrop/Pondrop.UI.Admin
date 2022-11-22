import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid, {
  shouldForwardProp: (prop) => !['withBorder', 'hasClickEvent', 'withPadding', 'rowHeight', 'borderColor'].includes(prop)
})<{ withBorder: boolean, hasClickEvent: boolean, withPadding?: boolean, rowHeight?: number, borderColor?: string }>`
  ${({ withPadding = true }) => withPadding && 'padding: 8px 16px;'}
  
  ${({ withBorder, borderColor }) => withBorder ? `
    border-radius: 12px;
    border: 1px solid ${borderColor ? `${borderColor}` : '#dde3ea; box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1)'};
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
    min-height: ${({ rowHeight }) => rowHeight ?? 52 }px !important;
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

export const StyledChipWrapper = styled(Paper)`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  background: transparent;

  .chip-component {
    margin: 4px;
  }
`;
