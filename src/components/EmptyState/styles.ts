import styled from "@emotion/styled";

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  svg {
    fill: rgba(0, 0, 0, 0.5);
  }

  span {
    color: rgba(0, 0, 0, 0.5);
    line-height: 32px;
  }
`;
