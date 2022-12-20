import styled from "@emotion/styled";

import { StyledDialog } from "pages/styles";

export const StyledCustomDialog = styled(StyledDialog)`
  .MuiDialog-container{
    .MuiPaper-root {
      width: fit-content;
      height: fit-content;
      max-width: 90vw !important;
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
