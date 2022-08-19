import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const PanelWrapper = styled.div`
  width: 223px;
  height: calc(100vh - 32px);
  border-right: 1px solid #dde3ea;
  padding: 16px;

  .store-btn {
    background-color: rgba(194, 231, 255, 0.5);
    color: #001e2f;
    font-weight: 600;

    &:hover {
      background-color: rgb(171, 200, 224, 0.54);
    }
  }

  .logout-btn {
    color: #ba1a1a;

    &:hover {
      background-color: rgba(200, 15, 15, 0.08);
    }
  }

  & img {
    padding: 16px;
    cursor: pointer;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 48px;
  justify-content: start;
  padding: 12px;
  margin: 16px 0;
  text-transform: none;

  & span {
    margin: 0px;
  }

  & svg {
    margin-right: 16px;
  }
`;
