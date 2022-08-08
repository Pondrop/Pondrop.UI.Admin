import React from 'react';

import { HomeWrapper } from './styles';
import Stores from './components/Stores';

const Home: React.FunctionComponent = (): JSX.Element => {
  return (
    <HomeWrapper>
      <Stores />
    </HomeWrapper>
  );
};

export default Home;
