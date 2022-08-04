import { ReactNode } from "react";

export interface IButtonProps {
  color: "primary" | "secondary";
  label?: string;
  variant?: "contained" | "outlined";
  disabled?: boolean;
  wide?: boolean;
  centered?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  headIcon?: ReactNode;
  tabIndex?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type IButtonContainerProps = Pick<IButtonProps, 'color' | 'variant' | 'disabled' | 'wide' | 'centered'>;