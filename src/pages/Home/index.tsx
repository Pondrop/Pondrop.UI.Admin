import React from 'react';

import SidePanel from './components/SidePanel';
import Stores from './components/Stores';
import { HomeWrapper } from './styles';

const Home: React.FunctionComponent = (): JSX.Element => {
  return (
    <HomeWrapper>
      <SidePanel />
      <Stores />
    </HomeWrapper>
  );
};

export default Home;
