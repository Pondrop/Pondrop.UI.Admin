import styled from "styled-components";

import { IAvatarContainerProps, IAvatarImageProps } from "./types";

export const AvatarContainer = styled.div<IAvatarContainerProps>`
  background-color: ${({ bgColor, theme }) => bgColor ? bgColor : theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width ? width : '50px'};
  height: ${({ height }) => height ? height : '50px'};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ fontColor }) => fontColor && `color: ${fontColor};`}
  ${({ variant }) => {
    let borderRadius;
    if (variant === 'square') borderRadius = "0%";
    else if (variant === 'roundedCorners') borderRadius = "10%";
    else borderRadius = "50%";

    return `border-radius: ${borderRadius};`;
  }}
`;

export const AvatarGroupContainer = styled.div`
  & > img:not(:first-of-type) {
    position: relative;
    margin-left: -8px;
  }
`;

export const AvatarImage = styled.img<IAvatarImageProps>`
  width: ${({ width }) => width ? width : '50px'};
  height: ${({ height }) => height ? height : '50px'};
  ${({ variant }) => {
    let borderRadius;
    if (variant === 'square') borderRadius = "0%";
    else if (variant === 'roundedCorners') borderRadius = "10%";
    else borderRadius = "50%";

    return `border-radius: ${borderRadius};`;
  }}
`;