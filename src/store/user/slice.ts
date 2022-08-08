import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from './initialState';

import { IIdentity } from './types';

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

export const selectUser = (state: RootState) => state.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
