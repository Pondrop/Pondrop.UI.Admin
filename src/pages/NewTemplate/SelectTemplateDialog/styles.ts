import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";

export const StyledDialogContent = styled(DialogContent)`
  .select-template-modal {
    .MuiOutlinedInput-root {
      border-radius: 8px;
    }

    .MuiOutlinedInput-input {
      font-size: 12px;
    }

    .MuiSvgIcon-root {
      height: 20px !important;
      width: 20px !important;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

