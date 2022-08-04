import styled, { css } from 'styled-components';

import { IButtonContainerProps } from './types';

export const ButtonContainer = styled.button<IButtonContainerProps>`
  position: relative;
  min-height: ${({ theme }) => theme.btHeight};
  display: flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
  margin: 4px;
  width: 100%;
  justify-content: center;

  & svg {
    display: block;
  }

  &:hover {
    text-decoration: underline;
  }

  ${({ color, disabled, theme, variant }) => {
    // Logic for setting css based on variant and disabled value
    let tempColor;
    let tempBgColor = 'transparent';
    let tempBorder = 'none';
    let hoverBgColor = 'transparent';
    let hoverColor;
    let hoverBorderColor;

    if (variant === 'contained' && !disabled) {
      tempColor = theme.textWhite;
      tempBgColor = color === 'primary' ? theme.primary : theme.secondary;
      tempBorder = `2px solid ${color === 'primary' ? theme.primary : theme.secondary}`;
      hoverBgColor = color === 'primary' ? theme.primaryAccent : theme.secondaryAccent;
      hoverColor = theme.textLight;
      hoverBorderColor = color === 'primary' ? theme.primaryAccent : theme.secondaryAccent;
    } else if (variant === 'outlined' && !disabled) {
      tempColor = color === 'primary' ? theme.primary : theme.secondary;
      tempBorder = `2px solid ${color === 'primary' ? theme.primary : theme.secondary}`;
      hoverBgColor = color === 'primary' ? theme.primaryAccent : theme.secondaryAccent;
      hoverColor = theme.textExtraLight;
      hoverBorderColor = 'transparent';
    } else if (variant === 'contained' && disabled) {
      tempColor = theme.textMedium;
      tempBgColor = theme.disabled;
      hoverBgColor = theme.disabled;
    } else if (variant === 'outlined' && disabled) {
      tempColor = theme.disabled;
      tempBgColor = theme.bgWhite;
      hoverBgColor = theme.bgWhite;
      tempBorder = `2px solid ${theme.disabled}`;
    } else {
      tempColor = color === 'primary' ? theme.primary : theme.secondary;
    }

    return css`
      &:hover {
        color: ${color === 'primary' ? theme.primaryAccent : theme.secondaryAccent};
        background-color: ${hoverBgColor};
        ${hoverColor && `color: ${hoverColor};`}
        ${hoverBorderColor && `border-color: ${hoverBorderColor};`}

        ${variant === 'outlined' &&
        `
          & svg {
            fill: ${theme.textWhite};
          }
        `}
        ${variant && `text-decoration: none;`}
      }

      cursor: ${disabled ? 'default' : 'pointer'};
      color: ${tempColor};
      background-color: ${tempBgColor};
      border: ${tempBorder};
      ${variant &&
      `
        box-sizing: border-box;
        border-radius: ${theme.borderRadiusMd};
        padding: ${theme.btPadding};
      `}

      ${disabled && 'pointer-events: none;'}
      ${disabled &&
      variant === 'contained' &&
      `
        border-color: transparent;
      `}
    `;
  }};

  ${({ wide }) => wide && 'width: 100%;'}
  ${({ centered }) => centered && 'justify-content: center;'}
`;

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
