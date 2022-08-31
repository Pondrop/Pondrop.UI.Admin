import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
  width: 321px;
  
  & input {
    height: 24px;
    padding: 16px 14px 14px;
  }

  & svg {
    margin-left: 12px;
  }
`;
