import styled, { css } from 'styled-components';

export const RegisterForm = styled.div(
  () => css`
    width: 100%;
  `,
);

export const FormWrapper = styled.div(
  (props) => css`
    margin-bottom: 12px;
    border: 1px solid #dfe3e6;

    .title {
      background-color: #f7f7f8;
      padding: 12px;
      margin: 0;
      border-bottom: 1px solid #dfe3e6;
    }

    .content {
      background-color: ${props.theme.bgWhite};
      padding: 12px;

      .guidanceText {
        display: block;
        color: ${props.theme.textExtraDark};
        margin-bottom: 12px;
      }
    }
  `,
);

export const PageHeader = styled.p(
  () => css`
    padding: 32px 0 64px 0;
  `,
);

export const RegisterWrapper = styled.div(
  (props) => css`
    padding: 12px 24px;

    .details-card {
      background-color: ${props.theme.bgWhite};
      padding: 16px 12px;
      margin-bottom: 18px;
      border: 1px solid #dfe3e6;
      border-radius: 4px;
      border-left: 4px solid ${props.theme.primary};
    }
  `,
);
