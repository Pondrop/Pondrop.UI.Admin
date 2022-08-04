import styled from 'styled-components';

export const HeaderMainContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgWhite};
  padding: 8px 24px;

  @media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 24px;
  }

  min-height: 52px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColorLight};
`;

export const HeaderContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  max-width: ${({ theme }) => theme.pageWidth};
  margin: 0 auto;
`;

export const HeaderContent = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`;

export const LogoContainer = styled.div`
  width: 120px;
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleText = styled.h1`
  display: none;
  margin: 0;
  @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const HeaderNavigationSticky = styled.nav`
  display: flex;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 85px;
  width: 100%;
  @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const HeaderNavigationStickyItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 33%;
  background-color: ${({ selected, theme }) => (selected ? theme.primary : theme.primaryAccent)};
  &:not(:first-child):not(:last-child) {
    border-left: 2px solid ${({ theme }) => theme.bgWhite};
    border-right: 2px solid ${({ theme }) => theme.bgWhite};
  }
  & a {
    color: ${({ theme }) => theme.textExtraLight};
    text-decoration: none;
  }
`;

export const HeaderNavigation = styled.nav`
  display: none;
  @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    margin-right: 36px;
  }
`;

export const HeaderEndElement = styled.div`
  flex: 0 1 180px;
  display: block;
`;
