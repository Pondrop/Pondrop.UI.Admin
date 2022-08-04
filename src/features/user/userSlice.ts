import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IIdentity } from 'models';

export interface IUserState {
  identity: IIdentity;
  isLogged: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IUserState = {
  identity: {
    email: '',
    password: '',
  },
  isLogged: false,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IIdentity>) => {
      return {
        ...state,
        identity: {
          ...action.payload
        },
        isLogged: true,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
