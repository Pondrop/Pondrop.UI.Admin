import styled from "@emotion/styled";
import { Box, Tabs, Typography } from "@mui/material";

export const StyledSteps = styled(Tabs)`
  background-color: #ffffff;
  margin: 0 64px;
  border: 1px solid #DDE3EA;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.14);
  border-radius: 4px;

  .MuiTab-root {
    width: calc(100% / 3);
    max-width: calc(100% / 3);
  }

  .MuiTabs-indicator {
    background-color: #006492;
  }
`;

export const CircleDiv = styled.div<{ isactive: boolean }>`
  width: 20px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  background-color: ${({ isactive }) => isactive ? '#006492' : 'rgba(0, 0, 0, 0.76)'};
  border-radius: 50%;
  color: #ffffff;
  font-weight: 700;
  margin-right: 9px;
`;

export const TabLabelTypography = styled(Typography, {
  shouldForwardProp: (prop) => !['isActive', 'isSuccess'].includes(prop)
})<{ isActive: boolean, isSuccess: boolean }>`
  font-size: 14px;
  line-height: 20px;
  text-transform: none;
  font-weight: 500;
  color: ${({ isActive, isSuccess }) => {
    if (isSuccess) return '#0a9829';
    else if (isActive) return '#006492';
    else return 'rgba(0, 0, 0, 0.76)';
  }};
`;

export const StyledBox = styled(Box)`
  display: inline-flex;
  align-items: center;

  .check-icon {
    margin: 0 6px 0 0;
    display: flex;
    svg {
      fill: #0A9829;
      height: 24px;
      width: 24px;
    }
  }
`;
