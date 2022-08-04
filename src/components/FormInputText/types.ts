import { ChangeEventHandler } from "react";

export interface FormInputTextProps {
  name: string;
  value: string;
  label?: string;
  floatingLabel?: boolean;
  hasError?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}