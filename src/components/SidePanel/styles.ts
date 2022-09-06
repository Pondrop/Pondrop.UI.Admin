import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const PanelWrapper = styled.div`
  width: 223px;
  height: calc(100vh - 32px);
  border-right: 1px solid #dde3ea;
  padding: 16px;
  position: fixed;

  .panel-btn {
    color: #001e2f;
    font-weight: 600;

    &:hover {
      background-color: rgba(171, 200, 224, 0.54);
    }
  }

  .signout-btn {
    color: #ba1a1a;

    &:hover {
      background-color: rgba(200, 15, 15, 0.08);
    }
  }

  & img {
    padding: 16px;
  }
`;

export const StyledButton = styled(Button)<{ isActive?: boolean }>`
  width: 100%;
  height: 48px;
  justify-content: start;
  padding: 12px;
  margin: 8px 0;
  text-transform: none;
  background-color: ${({ isActive = false }) => isActive ? 'rgba(194, 231, 255, 0.5)' : 'transparent'};

  & span {
    margin: 0px;
  }

  & svg {
    margin-right: 16px;
  }
`;
