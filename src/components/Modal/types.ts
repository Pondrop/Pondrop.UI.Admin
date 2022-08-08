import { ReactNode } from 'react';

export interface IModalProps {
  heading: string;
  content: string | ReactNode;
  animate?: boolean;
  childHeading?: string;
  childContent?: string;
  animationType?: string;
  onSubmit: (action: string, nested?: boolean, child?: boolean) => void;
  childModalVisibility?: boolean;
  modalFooter?: boolean;
}

export type IModalBodyProps = Pick<IModalProps, 'animate' | 'childModalVisibility' | 'animationType'>;
