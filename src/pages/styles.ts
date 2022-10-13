import styled from "@emotion/styled";

import { Breadcrumbs, Button, Tab, Tabs, Typography } from "@mui/material";

export const ContentWrapper = styled.div`
  overflow-y: auto;
  position: absolute;
  right: 0;

  & span {
    color: #72787e;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    height: 8px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const MainContent = styled(ContentWrapper)<{ paddingSide: number, paddingTop: number }>`
  width: ${({ paddingSide }) => `calc(100vw - ${256 + (paddingSide * 2)}px);`}
  max-height: calc(100vh - ${({ paddingTop }) => `${paddingTop + 24}`}px);
  padding: ${({ paddingSide, paddingTop }) => `${paddingTop}px ${paddingSide}px`} 24px;

  .main-header {
    padding: 0;
  }

  .MuiAlert-root {
    border: 1px solid #bef7be;
  }
`;

export const ContentDetails = styled(ContentWrapper)`
  width: calc(100vw - 255px);
  max-height: calc(100vh - 36px);
  padding-top: 36px;

  .right-margin {
    margin-right: 24px;
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

export const StyledSubtitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'paddingBottom'
})<{ paddingBottom?: number }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 0 32px ${({ paddingBottom = 40 }) => paddingBottom}px;
  color: #001F2A;
`;

export const RowAlignWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

// previously RowAlignDetails
export const SpaceBetweenDiv = styled(RowAlignWrapper)<{ withmargin?: boolean }>`
  justify-content: space-between;
  ${({ withmargin = true }) => withmargin && 'margin: 4px 0;'}

  .linked-products {
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
`;

export const RowAlignDiv = styled(SpaceBetweenDiv)`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 26px;
`;

export const ColAlignDiv = styled.div`
  display: flex;
  flex-direction: column;

  .ul {
    padding-inline-start: 16px !important;
  }
`;

export const StyledBreadcrumbs = styled(Breadcrumbs, {
  shouldForwardProp: (prop) => prop !== 'withPadding'
})<{ withPadding?: boolean }>`
  ${({ withPadding = true }) => withPadding && 'padding: 0 32px 50px;'}
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
  position: relative;
  z-index: 1;
  .MuiTabs-flexContainer {
    margin-left: 32px;
  }

  .MuiTab-root {
    font-size: 12px;
    line-height: 16px;
    color: #001E2C;
    text-transform: none;
    border-width: 1px 1px 0px 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 8px 8px 0px 0px;
  }

  .MuiTab-root.Mui-selected {
    color: #001E2C;
    background-color: #fafcff;
    border-color: rgba(0, 0, 0, 0.12);
  }

  .MuiTabs-indicator {
    display: none;
  }
`;

export const StyledTab = styled(Tab)`
`;

export const CircularLoaderWrapper = styled.div<{ height: string }>`
  height: ${({ height }) => height};
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
  height: calc(100vh - 289px);
  width: calc(100% - 1px);
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  top: -2px;
  left: 1px;
  overflow-y: scroll;
  padding-bottom: 24px;

  ::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    height: 7px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .card-details {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const StyledCard = styled.div<{ width: string, height?: string }>`
  margin: 16px 0 0 32px;
  padding: 16px;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? 'fit-content'};
  background-color: #ffffff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  span {
    font-size: 14px;
    line-height: 28px;
    color: #000000 !important;
  }

  .row-label {
    font-weight: 600;
    min-width: 100px;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .row-value {
    font-weight: 400;
    max-width: ${({ width }) => `calc(${width} - 170px)`};
  }

  .singleline {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .multiline {
    overflow: hidden;
    line-height: 16px;
    text-overflow: ellipsis;
  }

  .create-components {
    width: 300px;
  }

  .req-icon {
    color: red;
  }
`;

export const StyledCardTitle = styled(Typography)`
  line-height: 24px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;

  .info-icon {
    .MuiSvgIcon-root {
      height: 13px;
      width: 13px;
    }
  }

  svg {
    fill: #006492;
  }

  .MuiIconButton-root {
    height: 24px;
    width: 24px;
  }
`;

export const StyledCategoryBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'height'
})<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: 10px 24px;
  line-height: 20px;
  text-transform: none;
  border-radius: 100px;
  background-color: #006492;

  &:hover {
    background-color: rgba(20, 120, 166, 0.96);
  }

  &:active {
    background-color: rgba(20, 120, 166, 0.92);
  }
`;

export const CategoryBtnWrapper = styled.div<{ rightmargin: number }>`
  align-self: center;
  margin-right: ${({ rightmargin }) => rightmargin}px;
`;

export const ErrorMsgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: red;
  margin-left: 8px;
  align-items: center;

  .info-icon {
    .MuiSvgIcon-root {
      fill: red;
      height: 18px;
      width: 18px;
    }
  }
`;
