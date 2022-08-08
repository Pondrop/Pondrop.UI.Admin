import styled, { css } from 'styled-components';

import { ITableContainer, ITableCell, ITableHeaderCell } from './types';

export const ScrollContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 12px;
`;

export const TableContainer = styled.table<ITableContainer>`
  border-spacing: 0;
  border-collapse: separate;
  ${({ width }) => width && css`width: ${width};`}
  ${({ alignment }) =>
    alignment && css`
      th,
      td {
        text-align: ${alignment};
      }
    `
  }
`;

export const TableHeader = styled.thead(
  (props) => css`
    font-size: 13px;
    background: ${props.theme.primary};
    color: ${props.theme.textWhite};
  `
);

export const TableRow = styled.tr<{ withLabels?: boolean }>(
  (props) => css`
    border-bottom: 1px solid ${props.theme.borderColorLight};
    & *:not(:first-child) {
      padding-left: 10px;
      padding-right: 10px;
    }
    & th,
    td:first-child {
      padding-left: 20px;
      padding-right: 20px;
    }
    ${props.withLabels &&
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
  `
);

export const TableHeaderCell = styled.th<ITableHeaderCell>(
  (props) => css`
    border-bottom: 2px solid ${props.theme.borderColorLight};
    text-transform: uppercase;
    text-align: left;
    padding: 9px 0px;
    white-space: nowrap;

    ${props.width && `width: ${props.width};`}

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
        fill: ${props.theme.textWhite};
      }
    }

    span {
      ${() => {
        if (props.sortType === 'asc')
          return `
          svg {
            transition: transform 0.3s;
            transform: rotate(180deg);
          }
        `;
        else if (props.sortType === 'desc')
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
  `
);

export const TableBody = styled.tbody<{ bgColor?: string }>(
  (props) => css`
    background: ${props.bgColor ? props.bgColor : props.theme.bgLight};
  `
);

export const TableCell = styled.td<ITableCell>(
  (props) => css`
    padding: 10px 0;
    border-bottom: 1px solid ${props.theme.borderColorLight};
    color: ${props.theme.textExtraDark};
    width: ${props.width};

    ${props.icon &&
      `
      text-align: right;
      svg {
        width: 12px;
        height: 12px;
        cursor: pointer;
        stroke: ${props.theme.primary};
      }
    `}

    ${props.labelIndicator &&
      `
      font-weight: bold;
      font-size: 16px;
      color: ${props.theme.primary};
    `}
  `
);
