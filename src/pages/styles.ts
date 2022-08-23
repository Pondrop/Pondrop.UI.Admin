import styled from "@emotion/styled";

import { TextField, Typography } from "@mui/material";

export const ContentWrapper = styled.div`
  width: calc(100vw - 440px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  position: absolute;
  right: 0;
  padding: 16px 92px 48px;

  & span {
    color: #72787e;
  }

  ::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    height: 7px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
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
