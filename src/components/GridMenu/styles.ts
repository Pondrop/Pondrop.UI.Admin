import styled from "@emotion/styled";
import { Checkbox } from "@mui/material";
import { GridColumnMenuContainer } from "@mui/x-data-grid";
import { FixedSizeList } from "react-window";

export const MenuWrapper = styled(GridColumnMenuContainer, {
  shouldForwardProp: (prop) => !['items', 'isLoading'].includes(prop)
})<{ items: number, isLoading: boolean }>`
  border: 1px solid rgba(114, 120, 126, 0.5);
  border-radius: 12px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  width: 247px;
  height: ${({ items = 0, isLoading }) => isLoading ? 290 : items * 42}px;
  max-height: 290px;
  padding: 10px 0;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    font-weight: 600;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const LabelDiv = styled.div`
  line-height: 42px;
  font-size: 14px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 180px;
  margin-right: 16px;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 4px;
  color: rgba(28, 27, 31, 0.5);
`;

export const StyledList = styled(FixedSizeList)`
  max-height: 290px;

  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
