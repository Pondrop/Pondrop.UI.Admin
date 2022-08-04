import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface RegisterFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
}

export interface IRegisterState {
  registerFormData: RegisterFormData;
}

const defaultRegisterFormData: RegisterFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  country: '',
};

// Initial state
const initialState: IRegisterState = {
  registerFormData: defaultRegisterFormData,
};

// Actions
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterFormData: (state, action: PayloadAction<RegisterFormData>) => {
      state.registerFormData = action.payload;
    },
    resetRegisterFormData: (state) => {
      state.registerFormData = defaultRegisterFormData;
    },
  },
});

export const { setRegisterFormData, resetRegisterFormData } = registerSlice.actions;

// Selectors
export const selectRegisterState = (state: RootState) => state.register;

// Reducer
export default registerSlice.reducer;
