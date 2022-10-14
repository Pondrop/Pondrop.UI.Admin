import styled from "@emotion/styled";
import { Dialog, InputBase, MenuItem, Select, TextField } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-container{
    .MuiPaper-root {
      width: 100%;
      max-width: 560px;
      height: fit-content;
    }
  }

  span {
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }

  .row-label {
    font-weight: 700;
  }

  .row-value {
    font-weight: 400;
    max-width: 300px;
  }

  .req-icon {
    color: red;
  }

  .dialog-title {
    padding: 32px 32px 24px;
    font-weight: 400;
    color: #1c1b1f,
  }

  .dialog-content {
    padding: 0 32px 20px;
  }

  .dialog-actions {
    padding: 12px 32px 32px;
    justify-content: flex-start;
  }

  .label-div {
    margin-bottom: 12px;
  }

  .placeholder {
    color: #72787e;
  }

  & .MuiInputBase-root {
    width: 100%;
  }
`;

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
