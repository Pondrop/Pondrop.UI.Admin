import { ChangeEvent, useState } from 'react';

import { useAppDispatch } from 'store';
import { ReactComponent as SearchIcon } from 'assets/icons/icon-search.svg';
import { Button, FormInputText } from 'components';
import { setUser } from 'store/user/slice';
import { LoginDiv } from './styles';

const Login = () => {
  const dispatch = useAppDispatch();

  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPWValue] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePWChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPWValue(e.target.value);
  };

  const handleSignIn = () => {
    const signInPayload = {
      email: emailValue,
      password: pwValue,
    };
    dispatch(setUser(signInPayload));
  };

  return (
    <LoginDiv>
      <div>
        <div className="form">
          <FormInputText
            name="email"
            placeholder="E-mail"
            value={emailValue}
            onChange={handleEmailChange}
            icon={<SearchIcon />}
          />
        </div>
        <div className="form">
          <FormInputText
            name="password"
            placeholder="Password"
            value={pwValue}
            onChange={handlePWChange}
            type="password"
          />
        </div>
        <div className="btn">
          <Button
            label="Sign in"
            color="primary"
            variant="contained"
            onClick={handleSignIn}
            disabled={emailValue === '' || pwValue === ''}
          />
        </div>
      </div>
    </LoginDiv>
  );
};

export default Login;
