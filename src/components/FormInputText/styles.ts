import styled, { css } from 'styled-components';

import { FormInputTextProps } from './types';

export const Label = styled.label<Pick<FormInputTextProps, 'floatingLabel'>>`
  display: block;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  ${({ floatingLabel, theme }) => {
    if (floatingLabel)
      return css`
      position: absolute;
      top: 19px;
      left: 20px;
    `;
    else
      return css`
      color: ${theme.textExtraDark};
      margin-bottom: 10px;
    `;
  }}
`;

export const Field = styled.input<Pick<FormInputTextProps, 'hasError' | 'icon'>>(
  (props) => css`
    flex: 1 0 auto;
    width: auto;
    height: 36px;
    border: 1px solid ${props.theme.bgDark};
    border-radius: ${props.theme.borderRadiusMd};
    padding: 8px 16px 8px ${props.icon ? `56` : `16`}px;
    color: ${props.theme.textExtraDark};
    font-size: 18px;
    &:focus {
      outline: none;
      border: 1px solid ${props.theme.primary};
    }

    ${props.hasError && `border: 2px solid ${props.theme.error};`}
`);

export const FormInputTextContainer = styled.div<Pick<FormInputTextProps, 'floatingLabel'>>(
  (props) => css`
    display: flex;
    position: relative;
    width: 100%;

    ${!props.floatingLabel && 'flex-direction: column;'}
    ${Field}:focus + ${Label} {
      top: 5px;
      font-size: 9px;
    }
    ${Field}:not(:placeholder-shown) + ${Label} {
      top: 5px;
      font-size: 9px;
    }
  `
);

export const IconWrapper = styled.div`
  position: absolute;
  height: 54px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
