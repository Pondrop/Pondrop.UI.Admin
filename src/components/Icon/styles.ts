import styled from "styled-components";

import { IIconContainerProps } from "./types";

export const IconContainer = styled.span<IIconContainerProps>`
  ${({ fillColor }) => fillColor && `
    & svg {
      fill: ${fillColor};
    }
  `}

  ${({ strokeColor }) => strokeColor && `
    & svg {
      stroke: ${strokeColor};
    }
  `}
`;