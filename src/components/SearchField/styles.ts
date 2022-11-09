import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => !['isfullsize', 'width', 'padding'].includes(prop)
})<{ isfullsize: boolean, width?: number, padding: string }>`
  width: ${({ isfullsize, width }) => isfullsize ? '321px' : `${width}px` };
  
  & input {
    height: 24px;
    padding: ${({ padding }) => padding} !important;
  }

  ${({ isfullsize }) => isfullsize && 
    `& svg {
      margin-left: 12px;
    }`
  }

  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }
`;
