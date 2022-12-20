import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)`
  height: 32px;
  font-size: 12px;
  padding: 8px;
  margin: 0 8px;

  &:focus {
    background-color: transparent;
  }

  &:hover {
    background-color: rgba(0,0,0,0.04);
  }
`;
