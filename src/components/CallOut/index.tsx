import React from 'react';
import { CallOutWrapper } from './styles';
import { ICallOutProps } from './types';

const CallOut: React.FunctionComponent = ({ children }: ICallOutProps): JSX.Element => {
  return <CallOutWrapper>{children}</CallOutWrapper>;
};

export default CallOut;
