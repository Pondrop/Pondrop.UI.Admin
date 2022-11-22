import styled from "@emotion/styled";
import { Dialog, TextField } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-container{
    .MuiPaper-root {
      width: 100%;
      max-width: 520px;
      height: fit-content;
    }
  }

  span, textarea {
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
    padding: 0px 32px 32px;
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