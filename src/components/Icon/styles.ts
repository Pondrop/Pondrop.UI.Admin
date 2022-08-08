import styled, { css } from 'styled-components';

import { IIconContainerProps } from './types';

export const IconContainer = styled.span<IIconContainerProps>`
  ${({ fillColor }) => fillColor && css`
    & svg {
      fill: ${fillColor};
    }
  `}

  ${({ strokeColor }) => strokeColor && css`
    & svg {
      stroke: ${strokeColor};
    }
  `}
`;
