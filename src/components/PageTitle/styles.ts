import styled, { css } from 'styled-components';

export const PageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div(
  (props) => css`
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: baseline;
    font-size: 23px;
    font-weight: 300;
    color: ${props.theme.primary};
    @media all and (min-width: ${props.theme.breakpoints.md}) {
      flex-direction: row;
      font-size: 39px;
    }
  `,
);

export const EndElement = styled.div(
  (props) => css`
    font-size: 16px;
    margin-top: 8px;
    @media all and (min-width: ${props.theme.breakpoints.md}) {
      font-size: 20px;
      margin-top: 0;
    }
  `,
);

export const Icon = styled.div(
  (props) => css`
    text-align: center;
    border-radius: 50%;
    background-color: ${props.theme.primaryAccent};
    color: ${props.theme.primary};
    width: 75px;
    height: 75px;
    line-height: 75px;
    font-size: 29px;
  `,
);
