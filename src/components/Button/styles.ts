import styled, { css } from 'styled-components';

import { IButtonContainerProps } from './types';

// Button Types
export const ContainedButton = css<IButtonContainerProps>`
  ${({ color, disabled, theme }) => {
    let containedStyles;

    if (disabled) {
      containedStyles = `
        color: ${theme.textMedium};
        background-color: ${theme.disabled};
        pointer-events: none;
        border: none;
        border-color: transparent;

        &:hover {
          background-color: ${theme.disabled};
        }
      `;
    } else {
      containedStyles = `
        color: ${theme.textWhite};
        background-color: ${theme[color]};
        border: 2px solid ${theme[color]};

        &:hover {
          background-color: ${color === 'primary' ? theme.primaryAccent : theme.secondaryAccent};
          color: ${theme.textLight};
          border-color: ${color === 'primary' ? theme.primaryAccent : theme.secondaryAccent};
        }
      `;
    }

    return `
      ${containedStyles}

      box-sizing: border-box;
      border-radius: ${theme.borderRadiusMd};
      padding: ${theme.btPadding};

      &:hover {
        & svg {
          fill: ${theme.textLight};
        }

        text-decoration: none;
      }
    `
  }}
`;

export const OutlinedButton = css<IButtonContainerProps>`
  ${({ color, disabled, theme }) => {
    let outlinedStyles;

    if (disabled) {
      outlinedStyles = `
        color: ${theme.disabled};
        background-color: ${theme.bgWhite};
        border: 2px solid ${theme.disabled};
        pointer-events: none;

        &:hover {
          background-color: ${theme.bgWhite};
        }
      `;
    } else {
      outlinedStyles = `
        color: ${theme[color]};
        background-color: transparent;
        border: 2px solid ${theme[color]};

        &:hover {
          background-color: ${theme[color]};
          color: ${theme.textExtraLight};
          border-color: transparent;
        }
      `;
    }

    return `
      ${outlinedStyles}

      box-sizing: border-box;
      border-radius: ${theme.borderRadiusMd};
      padding: ${theme.btPadding};

      &:hover {
        & svg {
          fill: ${theme.textWhite};
        }

        text-decoration: none;
      }
    `
  }}
`;

export const TextButton = css<IButtonContainerProps>`
  ${({ color, theme }) => (`
    color: ${theme[color]};
    background-color: transparent;
    border: none;

    &:hover {
      color: ${color === 'primary' ? theme.primaryAccent : theme.secondaryAccent};
      text-decoration: underline;
      background-color: transparent;
    }
  `)}
`;

const ButtonType = {
  contained: ContainedButton,
  outlined: OutlinedButton,
  default: TextButton
};

export const StyledButton = styled.button<IButtonContainerProps>(
  (props) => css`
    position: relative;
    min-height: ${props.theme.btHeight};
    display: flex;
    align-items: center;
    user-select: none;
    font-size: 16px;
    margin: 4px;
    cursor: ${props.disabled ? 'default' : 'pointer'};

    & svg {
      display: block;
    }

    ${props.wide && 'width: 100%;'}
    ${props.centered && 'justify-content: center;'}

    ${ButtonType[props.variant ?? 'default']}
  `
);

export const StartIconContainer = styled.div`
  margin-right: 10px;
`;

export const EndIconContainer = styled.div`
  margin-left: 10px;
`;

export const HeadIconContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
  margin-left: 8px;
`;
