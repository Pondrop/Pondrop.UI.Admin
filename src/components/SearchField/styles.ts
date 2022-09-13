import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => !['isfullsize', 'width'].includes(prop)
})<{ isfullsize: boolean, width?: number }>`
  width: ${({ isfullsize, width }) => isfullsize ? '321px' : `${width}px` };
  
  & input {
    height: 24px;
    padding: ${({ isfullsize }) => isfullsize ? '16px 14px 14px' : '4px 2px' };
  }

  ${({ isfullsize }) => isfullsize && 
    `& svg {
      margin-left: 12px;
    }`
  }

  
`;
