import { ReactChild } from 'react';

export type ITooltipProps = {
  label: string;
  children: ReactChild;
  position?: 'left' | 'right' | 'bottom';
  background?: string;
  width?: string;
  fontColor?: string;
  fontSize?: string;
  arrow?: boolean;
};

export type ITooltipBox = Pick<ITooltipProps, 'position' | 'background' | 'width' | 'arrow'>;
export type ITooltipMessage = Pick<ITooltipProps, 'fontColor' | 'fontSize'>;
