import styled from "@emotion/styled";

import { TextField, Typography } from "@mui/material";

export const StoresWrapper = styled.div`
  width: calc(100vw - 440px);
  padding: 16px 92px;

  & span {
    color: #72787e;
  }
`;

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

export const StyledTitle = styled(Typography)`
  font-weight: 600;
`;

export const RowAlignDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 26px;
`;

export const ColAlignDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
