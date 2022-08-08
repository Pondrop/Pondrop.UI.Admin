import { ChangeEventHandler } from 'react';

export interface IToggleProps {
  value: boolean;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export type IToggleContainer = Pick<IToggleProps, 'color' | 'disabled'>;
