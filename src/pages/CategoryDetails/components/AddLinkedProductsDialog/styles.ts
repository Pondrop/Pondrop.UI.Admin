import styled from "@emotion/styled";
import { Dialog, DialogContent, InputBase, MenuItem, Select, TextField } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-container{
    .MuiPaper-root {
      width: 100%;
      max-width: 856px;
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

export const StyledDialogContent = styled(DialogContent)`
  .linked-products-modal {
    .MuiOutlinedInput-root {
      border-radius: 8px;
    }

    .MuiOutlinedInput-input {
      font-size: 12px;
    }

    .MuiSvgIcon-root {
      height: 20px !important;
      width: 20px !important;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

