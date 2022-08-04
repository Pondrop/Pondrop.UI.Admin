import styled, { css } from 'styled-components';

export const TransactionsWrapper = styled.div(
  (props) => css`
    background-color: ${props.theme.bgWhite};
    border: 1px solid #dfe3e6;
    border-radius: 4px;

    .transactionTitle {
      background-color: #f7f7f8;
      padding: 12px;
      margin: 0;
      border-bottom: 1px solid #dfe3e6;
    }

    .content {
      padding: 12px;

      .guidanceText {
        display: block;
        color: ${props.theme.textExtraDark};
        margin-bottom: 12px;
      }
    }
  `,
);
