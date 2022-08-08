import { ReactNode } from 'react';

export type IIconProps = {
  children: ReactNode;
  fillColor?: string;
  strokeColor?: string;
};

export type IIconContainerProps = Omit<IIconProps, 'children'>;
