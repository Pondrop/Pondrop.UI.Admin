import styled from "@emotion/styled";
import { Button, List, ListItemButton } from "@mui/material";

export const DivWrapper = styled.div`
  border-radius: 12px;
  border: 1px solid #dde3ea;
  width: 248px;
  height: fit-content;
  max-height: 695px;
  padding: 8px 16px 16px;
  margin-right: 16px;

  .category-sections {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #001e2f;
  }
`;

export const StyledList = styled(List)`
  padding: 0 0 15px 0;
`;

export const StyledListItemButton = styled(ListItemButton)`
  height: 40px;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  padding: 10px;

  .item {
    font-size: 14px;
    line-height: 20px;
  }

  .category-label {
    color: rgba(0,0,0,1);
  }

  .category-value {
    color: rgba(0,0,0,0.6);
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ManageCategoriesBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'height'
})<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: 10px 32px;
  line-height: 20px;
  text-transform: none;
  border-radius: 100px;
  border: 1px solid #72787E;
  background-color: transparent;
  color: #006492;

  &:hover {
    background: rgba(0, 100, 146, 0.08);
  }

  &:active {
    background: rgba(0, 100, 146, 0.12);
  }
`;
