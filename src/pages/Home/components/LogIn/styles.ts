import styled, { css } from 'styled-components';

export const LoginDiv = styled.div(
  (props) => css`
    background-color: ${props.theme.bgWhite};
    border: 1px solid #dfe3e6;
    border-radius: 16px;
    max-width: 400px;
    max-height: 600px;
    margin: auto;
    padding: 48px 20px;

    .form {
      padding: 8px 0;
    }

    .btn {
      margin-top: 48px;
    }
  `,
);
