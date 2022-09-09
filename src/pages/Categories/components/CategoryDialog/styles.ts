import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-container{
    .MuiPaper-root {
      width: 100%;
      max-width: 510px;
      height: 250px;
    }
  }

  span {
    font-size: 14px;
    line-height: 28px;
    color: #000000;
  }

  .row-label {
    font-weight: 600;
    min-width: 100px;
  }

  .row-value {
    font-weight: 400;
    max-width: 300px;
  }

  .create-components {
    width: 300px;
  }

  .req-icon {
    color: red;
  }
`;
