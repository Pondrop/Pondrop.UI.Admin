import styled from 'styled-components';

import { FormInputTextProps } from './types';

export const Label = styled.label<Pick<FormInputTextProps, 'floatingLabel'>>`
  display: block;
  font-size: 1rem;
  transition: all 0.1s ease-in-out;

  ${({ floatingLabel, theme }) => {
    if (floatingLabel)
      return `
      position: absolute;
      top: 15px;
      left: 17px;
    `;
    else
      return `
      color: ${theme.textExtraDark};
      margin-bottom: 10px;
    `;
  }}
`;

export const Field = styled.input<Pick<FormInputTextProps, 'hasError'>>`
  flex: 1 0 auto;
  width: auto;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.bgDark};
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  padding: 8px 16px;
  color: ${({ theme }) => theme.textExtraDark};
  font-size: 18px;
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.primary};
  }

  ${({ hasError, theme }) => hasError && `border: 2px solid ${theme.error};`}
`;

export const FormInputTextContainer = styled.div<Pick<FormInputTextProps, 'floatingLabel'>>`
  display: flex;
  position: relative;
  width: 100%;

  ${({ floatingLabel }) => !floatingLabel && 'flex-direction: column;'}
  ${Field}:focus + ${Label} {
    top: 5px;
    font-size: 9px;
  }
  ${Field}:not(:placeholder-shown) + ${Label} {
    top: 5px;
    font-size: 9px;
  }
`;
