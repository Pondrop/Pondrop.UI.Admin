import styled, { css } from 'styled-components';

export const CallOutWrapper = styled.div(
  (props) => css`
    background-color: ${props.theme.bgWhite};
    padding: 16px 12px;
    margin-bottom: 18px;
    border: 1px solid #dfe3e6;
    border-radius: 4px;
    border-left: 4px solid ${props.theme.primary};
  `,
);
