export interface IIdentity {
  email: string;
  password: string;
}

export interface IUserState {
  identity: IIdentity;
  isLogged: boolean;
  status: 'idle' | 'loading' | 'failed';
}
