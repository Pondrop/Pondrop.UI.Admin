import { PageContainer } from './styles';
import { ILayoutProps } from './types';
import { Header } from 'components';

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header title="Pondrop Sample Business Portal" />
      <PageContainer>{children}</PageContainer>
    </>
  );
};

export default Layout;
