import { FocusEvent, MouseEvent } from "react";

export interface ISearchFieldProps {
  onEnterPress?: (searchValue: string) => void;
  value: string;
  id: string;
  isfullsize?: boolean;
  width?: number;
  onChange?: (searchValue: string) => void;
  variant?: "standard" | "outlined" | "filled";
  padding: string;
  placeholder?: string;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}
