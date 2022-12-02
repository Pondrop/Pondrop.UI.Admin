import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-container{
    .MuiPaper-root {
      width: fit-content;
      height: fit-content;
      max-width: 90vw;
      max-height: 90vh;
    }
  }

  img {
    width: fit-content;
    height: fit-content;
    max-width: 70vw;
    max-height: 70vh;
  }

  svg {
    height: 0.75em;
    width: 0.75em;
  }

  span {
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }

  .dialog-title {
    padding: 16px;
    height: 16px;
    font-weight: 400;
    color: #1c1b1f,
  }

  .dialog-content {
    padding: 0 16px 10px;
  }
`;
