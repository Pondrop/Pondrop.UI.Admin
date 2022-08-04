import { ButtonGroupContainer } from './styles';
import { IButtonGroupProps } from './types';

const ButtonGroup = ({ children, gap, inline, wide }: IButtonGroupProps) => {
  return (
    <ButtonGroupContainer inline={inline} gap={gap} wide={wide}>
      {children}
    </ButtonGroupContainer>
  );
};

export default ButtonGroup;
