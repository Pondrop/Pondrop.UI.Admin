import styled from "@emotion/styled";

import { Breadcrumbs, Tab, Tabs, TextField, Typography } from "@mui/material";

export const ContentWrapper = styled.div`
  overflow-y: auto;
  position: absolute;
  right: 0;

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

export const MainContent = styled(ContentWrapper)`
  width: calc(100vw - 440px);
  max-height: calc(100vh - 64px);
  padding: 16px 92px 48px;
`;

export const ContentDetails = styled(ContentWrapper)`
  width: calc(100vw - 255px);
  max-height: calc(100vh - 36px);
  padding-top: 36px;
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

export const StyledTypography = styled(Typography)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
`;

export const StyledTitle = styled(Typography)`
  font-weight: 600;
  padding: 0 32px;
  color: #001E2F;
`;

export const StyledSubtitle = styled(Typography)`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 0 32px 40px;
  color: #001F2A;
`;

export const RowAlignWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

// previously RowAlignDetails
export const SpaceBetweenDiv = styled(RowAlignWrapper)`
  justify-content: space-between;
`;

export const RowAlignDiv = styled(SpaceBetweenDiv)`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 26px;
`;

export const ColAlignDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 0 32px 50px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.38);

  .MuiBreadcrumbs-separator {
    margin: 0 16px;
  }

  .link {
    color: rgba(0, 0, 0, 0.38);

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    margin-left: 32px;
  }

  .MuiTab-root.Mui-selected {
    font-size: 12px;
    line-height: 16px;
    color: #001E2C;
    text-transform: none;
    background-color: #fafcff;
    border-width: 1px 1px 0px 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    border-radius: 8px 8px 0px 0px;
  }

  .MuiTabs-indicator {
    display: none;
  }
`;

export const StyledTab = styled(Tab)`
  .Mui-selected {
    font-size: 12px;
    line-height: 16px;
    color: #001E2C;
  }
`;

export const CircularLoaderWrapper = styled.div`
  height: calc(100vh - 36px);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: rgba(171, 200, 224, 0.54);
  }
`;

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

export const StyledCardTitle = styled(Typography)`
  line-height: 24px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;
`;
