import styled from "styled-components";

import { IButtonGroupContainerProps } from "./types";

export const ButtonGroupContainer = styled.div<IButtonGroupContainerProps>`
  display: flex;
  padding: 0;

  ${({ wide }) => wide && `flex: 1 0 auto;`}
  ${({ gap, inline, theme }) => {
    if (inline) return `
      flex-direction: column;
      & > *:not(:first-child) {
        margin-top: ${gap}px;
      }
      @media all and (min-width: ${theme.breakpoints.sm}) {
        flex-direction: row;
        & > *:not(:first-child) {
          margin-top: 0;
          margin-left: ${gap}px;
        }
      }
    `;
    else return `
      flex-direction: column;
      & > *:not(:first-child) {
        margin-top: ${gap}px;
      }
    `;
  }}
`;