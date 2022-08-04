import styled, { css } from 'styled-components';

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSpinner = styled.svg(
  (props) => css`
    animation: rotate 1s linear infinite;
    margin: 50px auto;
    width: 50px;

    & .path {
      stroke: ${props.theme.primary};
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `,
);
