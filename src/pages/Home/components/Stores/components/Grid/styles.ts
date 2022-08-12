import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)`
  padding: 16px 16px 0;
  border-radius: 12px;
  border: 1px solid #dde3ea;

  & .MuiDataGrid-columnSeparator {
    display: none;
  }

  & .MuiDataGrid-row--lastVisible.MuiDataGrid-cell {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  & .MuiDataGrid-footerContainer {
    justify-content: center;
  }

  & .MuiTablePagination-selectLabel,.MuiInputBase-root,.MuiTablePagination-displayedRows {
    color: rgba(0, 0, 0, 0.5);
  }

  & .MuiTablePagination-actions {
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
    max-height: 61px !important;
  }

  & .MuiDataGrid-cellContent {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: none;
  }
`;
