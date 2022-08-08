import { ChangeEventHandler, HTMLAttributes, ReactNode } from 'react';

export interface FormInputTextProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  floatingLabel?: boolean;
  hasError?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  icon?: ReactNode;
}
