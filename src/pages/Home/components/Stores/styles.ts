import styled, { css } from 'styled-components';

export const StoresWrapper = styled.div(
  (props) => css`
    background-color: ${props.theme.bgWhite};
    border: 1px solid #dfe3e6;
    border-radius: 4px;

    .content {
      padding: 12px;

      .form {
        margin-bottom: 12px;

        svg {
          fill: ${({ theme }) => theme.bgDark };
        }
      }
    }
  `,
);
