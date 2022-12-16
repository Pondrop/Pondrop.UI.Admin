import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextInput = styled(TextField)`
  width: 100%;

  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }

  input, textarea {
    height: 16px;
    line-height: 16px;
    font-size: 12px !important;
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

export const StyledBtnWrapper = styled.div`
  display: flex;
  align-self: center;
  margin-bottom: 24px;
`;
