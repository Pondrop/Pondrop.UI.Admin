import { useLocation, Link } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderContent,
  HeaderEndElement,
  HeaderMainContainer,
  HeaderNavigation,
  HeaderNavigationSticky,
  HeaderNavigationStickyItem,
  LogoContainer,
  TitleContainer,
  TitleText,
} from './styles';
import { IHeaderProps } from './types';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

const Header = ({ title, logo, menu, endElement }: IHeaderProps) => {
  const { pathname } = useLocation();

  return (
    <HeaderMainContainer>
      <HeaderContainer>
        <TitleContainer>
          {logo && (
            <Link to={'/'}>
              <LogoContainer>{logo}</LogoContainer>
            </Link>
          )}
          {title && <TitleText>{title}</TitleText>}
        </TitleContainer>
        <HeaderContent>
          {/* NAVIGATION */}
          <HeaderNavigationSticky>
            {menu &&
              menu.map((item) => (
                <HeaderNavigationStickyItem
                  key={item.path}
                  selected={
                    (pathname === '/' && item.path === '/') || (item.path !== '/' && pathname.includes(item.path))
                  }
                >
                  <Link to={item.path}>{item.label}</Link>
                </HeaderNavigationStickyItem>
              ))}
          </HeaderNavigationSticky>
          {/* NAVIGATION WIDE SCREENS */}
          <HeaderNavigation>
            <ButtonGroup gap={0} inline>
              <>
                {menu &&
                  menu.map((item) => (
                    <Link to={item.path} key={item.path}>
                      <Button label={item.label} color="primary"></Button>
                    </Link>
                  ))}
              </>
            </ButtonGroup>
          </HeaderNavigation>
          {/* HEADER END ELEMENT */}
          {endElement && <HeaderEndElement>{endElement}</HeaderEndElement>}
        </HeaderContent>
      </HeaderContainer>
    </HeaderMainContainer>
  );
};

export default Header;
