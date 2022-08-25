import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const StyledTabContent = styled.div`
  position: relative;
  background-color: #fafcff;
  height: calc(100vh - 265px);
  width: calc(100% - 1px);
  z-index: -1;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  top: -2px;
  left: 1px;
`;

export const StyledCard = styled.div<{ width: number }>`
  margin: 16px 0 0 32px;
  padding: 16px;
  width: ${({ width }) => `${width - 32}px`};
  height: 232px;
  background-color: #ffffff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  span {
    font-size: 14px;
    line-height: 28px;
    color: #000000;
  }

  .row-label {
    font-weight: 600;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .row-value {
    font-weight: 400;
  }
`;

export const RowAlignWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowAlignDetails = styled(RowAlignWrapper)`
  display: flex;
  justify-content: space-between;
`;

export const StyledCardTitle = styled(Typography)`
  line-height: 24px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;
`;
