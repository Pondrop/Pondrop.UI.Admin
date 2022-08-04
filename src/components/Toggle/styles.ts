import styled from "styled-components";

import { IToggleContainer } from "./types";

export const ToggleContainer = styled.label<IToggleContainer>`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + span:before {
    transform: translateX(46px);
  }
  input + span:after {
    position: absolute;
    content: "OFF";
    color: ${({ theme }) => theme.textLight};
    font-weight: bold;
    font-size: 12px;
    top: 9px;
    right: 16px;
    z-index: -1;
  }
  input:checked + span:after {
    content: "ON";
    color: ${({ color, theme }) => color !== "secondary"
      ? theme.primaryAccent
      : theme.secondaryAccent};
    left: 14px;
  }
  input:checked + span {
    background-color: ${({ theme }) => theme.bgLight};
  }
  input:focus + span {
    box-shadow: 0 0 1px ${({ theme }) => theme.bgLight};
  }

  ${({ disabled }) => disabled && `pointer-events: none;`}
`;

export const ToggleSlider = styled.span<Pick<IToggleContainer, 'color'>>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.bgLight};
  transition: 0.4s;
  z-index: 1;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ color, theme }) => color === "primary"
      ? theme.primary
      : color === "secondary"
      ? theme.secondary
      : theme.disabled};
    border-radius: 50%;
    transition: 0.4s;
  }
`;