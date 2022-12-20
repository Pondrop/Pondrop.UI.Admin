import styled from "@emotion/styled";
import { InputBase, MenuItem, Select, TextField } from "@mui/material";

export const StyledTextInput = styled(TextField)`
  width: 100%;

  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }

  & input {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    padding: 16px 12px;
    border-radius: 8px;
    color: #001f2a;

    &::placeholder {
      color: #72787e;
      opacity: 1;
    }
  }

  .MuiOutlinedInput-root,.MuiPaper-root-MuiDialog-paper {
    border-color: rgba(0, 0, 0, 0.24) !important;
    border-radius: 8px !important;
  }
`;

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen: boolean }>`
  & .MuiInputBase-input {
    ${({ isOpen }) => isOpen ? `
      border: 1px solid #006492 !important;
      border-radius: 8px 8px 0 0 !important;
    ` : `
      border: 1px solid rgba(0, 0, 0, 0.24) !important;
      border-radius: 8px !important;
    `}
  }
`;

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
