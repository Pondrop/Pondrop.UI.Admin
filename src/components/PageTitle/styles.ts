import styled from 'styled-components';

export const PageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  font-size: 23px;
  font-weight: 300;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.primary};
  @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    font-size: 39px;
  }
`;

export const EndElement = styled.div`
  font-size: 16px;
  margin-top: 8px;
  @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 20px;
    margin-top: 0;
  }
`;

export const Icon = styled.div`
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryAccent};
  color: ${({ theme }) => theme.primary};
  width: 75px;
  height: 75px;
  line-height: 75px;
  font-size: 29px;
`;
