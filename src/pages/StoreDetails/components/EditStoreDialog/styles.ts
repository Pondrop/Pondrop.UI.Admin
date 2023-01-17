import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";

export const StyledDialogContent = styled(DialogContent)`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

