import styled, { css } from 'styled-components';

export const FormMainContainer = styled.form(
  (props) => css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: ${props.theme.borderRadiusMd};
    background-color: ${props.theme.bgLight};
  `,
);

export const FormRow = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    & > *:not(:last-child) {
      margin-bottom: 8px;
    }

    @media all and (min-width: ${props.theme.breakpoints.md}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > *:not(:last-child) {
        margin-bottom: 0;
      }
    }
  `,
);
