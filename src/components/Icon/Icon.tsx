import { IconContainer } from './styles';
import { IIconProps } from './types';

const Icon = ({ children, fillColor, strokeColor }: IIconProps) => {
  return (
    <IconContainer fillColor={fillColor} strokeColor={strokeColor}>
      {children}
    </IconContainer>
  );
};

export default Icon;
