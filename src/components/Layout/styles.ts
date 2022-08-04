import styled, { css } from 'styled-components';

export const PageContainer = styled.main(
  (props) => css`
    background-color: ${props.theme.bgLight};

    @media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      max-width: ${({ theme }) => theme.pageWidth};
      margin: 0 auto;
      padding: 0 24px;
    }
  `,
);
