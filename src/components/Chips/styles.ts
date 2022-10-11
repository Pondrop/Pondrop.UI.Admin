import { Chip } from "@mui/material";
import styled from "@emotion/styled";

export const StyledChip = styled(Chip)`
  background-color: #c9e6ff;
  font-size: 12px;
  font-weight: 400;
  width: fit-content;

  &:hover {
    background-color: rgba(201, 222, 243, 0.92);
  }

  &:active {
    background-color: rgba(180, 200, 220, 0.8);
  }

  & span {
    color: #000000 !important;
  }
`;
