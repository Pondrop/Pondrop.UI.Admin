import styled, { css } from 'styled-components';

export const ProfileSettings = styled.div(
  (props) => css`
    margin-top: 64px;
    & > div:first-child {
      display: flex;
      h2 {
        align-self: center;
        margin: 0px 0px 0px 20px;
      }
    }
    & > div:nth-child(2) {
      margin: 20px 0px;
      & > div:nth-child(2) {
        display: flex;
        align-items: center;
        margin-top: 2px;
        h6 {
          margin: 0px 5px 0px 0px;
        }
      }
      & > div:nth-child(3) {
        margin-top: 20px;
        width: 25%;
        @media all and (max-width: ${props.theme.breakpoints.sm}) {
          width: 100%;
        }
      }
    }
  `,
);
