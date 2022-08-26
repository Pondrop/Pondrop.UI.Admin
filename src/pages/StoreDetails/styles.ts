import styled from "@emotion/styled";
import { Breadcrumbs, Tab, Tabs, Typography } from "@mui/material";

export const ContentWrapper = styled.div`
  width: calc(100vw - 255px);
  max-height: calc(100vh - 36px);
  overflow-y: auto;
  position: absolute;
  right: 0;
  padding-top: 36px;

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

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 0 32px 50px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.38);

  .MuiBreadcrumbs-separator {
    margin: 0 16px;
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
