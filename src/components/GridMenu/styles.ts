import styled from "@emotion/styled";
import { GridColumnMenuContainer } from "@mui/x-data-grid";

export const MenuWrapper = styled(GridColumnMenuContainer)`
  border-radius: 12px;
  width: 247px;
  max-height: 290px;
  padding: 10px 0;
  overflow-y: auto;
  overflow-x: hidden;

  & .MuiFormControlLabel-root {
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    width: 210px;
    padding: 0 16px;
    margin: 0;

    & svg {
      fill: rgba(28, 27, 31, 0.5);
    }

    & span {
      font-size: 14px;
    }

    & .MuiButtonBase-root {
      padding: 9px 11px 9px 0px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      
      & span {
        font-weight: 600;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;