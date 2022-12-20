import styled from "@emotion/styled";

import { Breadcrumbs, Button, Dialog, Select, Tab, Tabs, TextField, Typography } from "@mui/material";

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

  .campaign-review {
    margin: 8px 64px 0 32px;
  }

  .last-review {
    margin: 8px 64px 34px 32px;

    .placeholder {
      color: #72787e;
    }
  
    & .MuiInputBase-root {
      width: 450px;
    }
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
    color: rgba(171, 200, 224, 0.54) !important;
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
  }

  .row-label {
    font-weight: 600;
    width: 200px;
    color: #000000 !important;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .row-value {
    font-weight: 400;
    max-width: ${({ width }) => `calc(${width} - 170px)`};
    color: #000000 !important;
  }

  .link {
    cursor: pointer;
    text-decoration: underline;
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

  .linked-products, .select-focus, .select-store {
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

  .info-icon {
    align-self: center;
    svg {
      fill: #006492;
    }

    .MuiSvgIcon-root {
      height: 13px;
      width: 13px;
    }
  }

  .edit-icon {
    svg {
      fill: #006492;
    }
  }
`;

export const StyledCardTitle = styled(Typography)`
  line-height: 24px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;

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

export const StyleOutlinedBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'height'
})<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: 10px 24px;
  line-height: 20px;
  text-transform: none;
  border-radius: 100px;
  color: #006492;
  border-color: #006492;
`;

export const CategoryBtnWrapper = styled.div<{ rightmargin: number }>`
  align-self: center;
  margin-right: ${({ rightmargin }) => rightmargin}px;
`;

export const MessageWrapper = styled.div<{ color: string, withMargin?: boolean }>`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: ${({ color }) => color};
  ${({ withMargin = true }) => withMargin &&'margin-left: 8px;'}
  align-items: center;

  .info-icon {
    .MuiSvgIcon-root {
      fill: red;
      height: 18px;
      width: 18px;
    }
  }
`;

export const StyledTextInput = styled(TextField)`
  width: 100%;

  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }

  & input {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    padding: 16px 12px;
    border-radius: 8px;
    color: #001f2a;

    &::placeholder {
      color: #72787e;
      opacity: 1;
    }
  }

  .MuiOutlinedInput-root,.MuiPaper-root-MuiDialog-paper {
    border-color: rgba(0, 0, 0, 0.24) !important;
    border-radius: 8px !important;
  }
`;

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'dialogWidth'
})<{ dialogWidth: number }>`
  .MuiDialog-container{
    .MuiPaper-root {
      width: 100%;
      max-width: ${({ dialogWidth }) => dialogWidth}px;
      height: fit-content;
    }
  }

  span, textarea {
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }

  .row-label {
    font-weight: 700;
  }

  .row-value {
    font-weight: 400;
    max-width: 300px;
  }

  .req-icon {
    color: red;
  }

  .dialog-title {
    padding: 32px 32px 24px;
    font-weight: 400;
    color: #1c1b1f,
  }

  .dialog-content {
    padding: 0 32px 20px;
  }

  .dialog-actions {
    padding: 12px 32px 32px;
    justify-content: flex-start;
  }

  .label-div {
    margin-bottom: 12px;
  }

  .placeholder {
    color: #72787e;
  }

  & .MuiInputBase-root {
    width: 100%;
  }
`;

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen: boolean }>`
  & .MuiInputBase-input {
    ${({ isOpen }) => isOpen ? `
      border: 1px solid #006492 !important;
      border-radius: 8px 8px 0 0 !important;
    ` : `
      border: 1px solid rgba(0, 0, 0, 0.24) !important;
      border-radius: 8px !important;
    `}
  }
`;
