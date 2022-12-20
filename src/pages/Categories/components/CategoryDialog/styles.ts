import styled from "@emotion/styled";
import { InputBase, MenuItem } from "@mui/material";

export const StyledInputBase = styled(InputBase)`
  & .MuiInputBase-input {
    line-height: 16px;
    font-size: 12px;
    padding: 16px 12px;
    color: #001f2a;

    & legend {
      display: none;
    }

    & fieldset {
      top: 0;
    }

    .MuiSelect-select {
      padding: 0;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  height: 32px;
  font-size: 12px;
  padding: 8px;
  margin: 0 8px;

  &:focus {
    background-color: transparent;
  }

  &:hover {
    background-color: rgba(0,0,0,0.04);
  }
`;
