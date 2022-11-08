import styled from "@emotion/styled";
import { Popper, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
  width: 100%;
  
  & input {
    height: 24px;
    padding: 16px 14px 14px !important;
  }

  & svg {
    margin-left: 12px;
  }

  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }
`;

export const StyledPopper = styled(Popper)`
  border: 1px solid rgba(114, 120, 126, 0.5);
  border-radius: 12px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;
