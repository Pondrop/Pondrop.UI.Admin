import { ReactChild } from 'react';

export type IButtonGroupProps = {
  children: ReactChild;
  gap: number;
  inline?: boolean;
  wide?: boolean;
};

export type IButtonGroupContainerProps = Omit<IButtonGroupProps, 'children'>;
