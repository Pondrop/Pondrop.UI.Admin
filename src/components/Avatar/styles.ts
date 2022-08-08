import styled, { css } from 'styled-components';

import { IAvatarContainerProps, IAvatarImageProps } from './types';

export const borderRadius = {
  square: '0%',
  roundedCorners: '10%',
  default: '50%',
};

export const AvatarContainer = styled.div<IAvatarContainerProps>(
  (props) => css`
    background-color: ${props.bgColor ? props.bgColor : props.theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: ${borderRadius[props.variant ?? 'default']};
    width: ${props.width || '50px'};
    height: ${props.height || '50px'};
    color: ${props.fontColor || props.theme.textWhite};
    ${props.fontSize && `font-size: ${props.fontSize};`}
  `,
);

export const AvatarGroupContainer = styled.div`
  & > img:not(:first-of-type) {
    position: relative;
    margin-left: -8px;
  }
`;

export const AvatarImage = styled.img<IAvatarImageProps>(
  (props) => css`
    width: ${props.width ? props.width : '50px'};
    height: ${props.height ? props.height : '50px'};
    border-radius: ${borderRadius[props.variant ?? 'default']};
  `,
);
