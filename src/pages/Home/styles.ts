import styled, { css } from 'styled-components';

export const RegisterForm = styled.div(
  (props) => css`
    width: 100%;
    @media all and (min-width: ${props.theme.breakpoints.md}) {
      width: 80%;
      min-width: 830px;
      max-width: 1000px;
    }
  `,
);

export const PageHeader = styled.p(
  () => css`
    padding: 32px 0 64px 0;
  `,
);

export const NavLinks = styled.div(
  (props) => css`
    background-color: ${props.theme.bgWhite};
    padding: 12px 0;
    border-bottom: 1px solid #dfe3e6;
  `,
);

export const HomeWrapper = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
  `,
);
