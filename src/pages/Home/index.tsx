import React from 'react';

import { useAppSelector } from 'app/hooks';
import { selectUser } from 'features/user/userSlice';
import { HomeWrapper } from './styles';
import { CallOut } from 'components';
import Login from './components/LogIn';

const Home: React.FunctionComponent = (): JSX.Element => {
  const user = useAppSelector(selectUser);

  return <HomeWrapper>{user.isLogged ? <CallOut>Logged in!</CallOut> : <Login />}</HomeWrapper>;
};

export default Home;
