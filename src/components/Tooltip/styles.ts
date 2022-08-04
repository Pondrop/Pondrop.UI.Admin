import styled from "styled-components";

import { ITooltipBox, ITooltipMessage } from "./types";

export const TooltipContainer = styled.div`
  text-align: center;
  display: inline-block;
  position: relative;
`;

export const TooltipBox = styled.div<ITooltipBox>`
  ${({ width }) => width && `width: ${width};`}
  overflow-wrap: break-word;
  & > div {
    background: ${({ background, theme }) => background ? background : theme.bgDark};
  }
  position: absolute;
  z-index: 10;
  ${({ arrow }) => arrow && `
    ::after {
      content: "";
      position: absolute;
    }
  `}

  ${({ background, position, theme }) => {
    if (position === "left") return `
      top: 50%;
      right: 100%;
      padding-right: 5px;
      transform: translateY(-50%);
      &::after {
        border-left: 5px solid
          ${background ? background : theme.bgDark};
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 0px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    `;
    else if (position === "right") return `
      top: 50%;
      left: 100%;
      padding-left: 5px;
      transform: translateY(-50%);
      &::after {
        border-right: 5px solid
          ${background ? background : theme.bgDark};
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    `;
    else if (position === "bottom") return `
      top: 100%;
      left: 50%;
      padding-top: 5px;
      transform: translateX(-50%);
      &::after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid
          ${background ? background : theme.bgDark};
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    `;
    else return `
      bottom: 100%;
      left: 50%;
      padding: 0 0 5px 0;
      transform: translateX(-50%);
      &::after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid
          ${background ? background : theme.bgDark};
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    `;
  }}
`;

export const TooltipMessage = styled.div<ITooltipMessage>`
  border-radius: 3px;
  color: ${({ fontColor, theme}) => fontColor ? fontColor : theme.textWhite};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`};
  padding: 5px 10px;
  text-align: center;
`;

export const TooltipTarget = styled.div`
  display: inline-block;
`;