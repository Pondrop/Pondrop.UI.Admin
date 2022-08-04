import styled from 'styled-components';

export const FormMainContainer = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  background-color: ${({ theme }) => theme.bgLight};
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  & > *:not(:last-child) {
    margin-bottom: 8px;
  }

  @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > *:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;
