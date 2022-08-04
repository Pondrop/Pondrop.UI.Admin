import styled, { css, keyframes } from 'styled-components';

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonLoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const SkeletonBar = styled.div(
  () => css`
    display: inline-block;
    height: 18px;
    width: 100%;
    animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
    background-color: #eee;
    background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200px 100%;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    margin-top: 0;
  `,
);
