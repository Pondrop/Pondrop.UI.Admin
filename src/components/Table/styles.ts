import styled from 'styled-components';

import { ITableContainer, ITableCell, ITableHeaderCell } from './types';

export const ScrollContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 12px;
`;

export const TableContainer = styled.table<ITableContainer>`
  border-spacing: 0;
  border-collapse: separate;
  ${({ width }) => width && `width: ${width};`}
  ${({ alignment }) =>
    alignment &&
    `
    th,
    td {
      text-align: ${alignment};
    }
  `}
`;

export const TableHeader = styled.thead`
  font-size: 13px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textWhite};
`;

export const TableRow = styled.tr<{ withLabels?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.borderColorLight};
  & *:not(:first-child) {
    padding-left: 10px;
    padding-right: 10px;
  }
  & th,
  td:first-child {
    padding-left: 20px;
    padding-right: 20px;
  }
  ${({ withLabels }) =>
    withLabels &&
    `
    td:first-child {
      padding-left: 40px;
      padding-right: 40px;
    }
  `}
  &:last-child {
    td {
      border-bottom: none;
    }
  }
`;

export const TableHeaderCell = styled.th<ITableHeaderCell>`
  border-bottom: 2px solid ${({ theme }) => theme.borderColorLight};
  text-transform: uppercase;
  text-align: left;
  padding: 9px 0px;
  white-space: nowrap;

  ${({ width }) => width && `width: ${width};`}

  div {
    display: flex;
    justify-content: start;
    align-items: center;
    cursor: pointer;

    span {
      display: flex;
    }
  }

  span {
    svg {
      visibility: hidden;
    }
  }

  &:hover {
    svg {
      visibility: visible;
      fill: ${({ theme }) => theme.textWhite};
    }
  }

  span {
    ${({ sortType }) => {
      if (sortType === 'asc')
        return `
        svg {
          transition: transform 0.3s;
          transform: rotate(180deg);
        }
      `;
      else if (sortType === 'desc')
        return `
        svg {
          transition: transform 0.5s;
          transform: rotate(0deg);
        }
      `;
    }}
  }

  svg {
    width: 12px;
    height: 12px;
    cursor: pointer;
    visibility: hidden;
    margin-left: 4px;
  }
`;

export const TableBody = styled.tbody<{ bgColor?: string }>`
  background: ${({ bgColor, theme }) => (bgColor ? bgColor : theme.bgLight)};
`;

export const TableCell = styled.td<ITableCell>`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColorLight};
  color: ${({ theme }) => theme.textExtraDark};
  width: ${({ width }) => width};

  ${({ icon, theme }) =>
    icon &&
    `
    text-align: right;
    svg {
      width: 12px;
      height: 12px;
      cursor: pointer;
      stroke: ${theme.primary};
    }
  `}

  ${({ labelIndicator, theme }) =>
    labelIndicator &&
    `
    font-weight: bold;
    font-size: 16px;
    color: ${theme.primary};
  `}
`;
