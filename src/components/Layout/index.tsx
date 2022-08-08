import { Fragment } from 'react';

import { PageContainer } from './styles';
import { ILayoutProps } from './types';
import { Header } from 'components';

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Fragment>
      <Header title="Pondrop Admin Portal" />
      <PageContainer>{children}</PageContainer>
    </Fragment>
  );
};

export default Layout;
