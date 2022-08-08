import { IUserState } from './types';

export const initialState: IUserState = {
  identity: {
    email: '',
    password: '',
  },
  isLogged: false,
  status: 'idle',
};
