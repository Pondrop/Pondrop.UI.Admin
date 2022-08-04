import { ButtonContainer, EndIconContainer, HeadIconContainer, StartIconContainer } from './styles';
import { IButtonProps } from './types';

const Button = ({
  color,
  label,
  variant,
  disabled = false,
  tabIndex,
  wide = false,
  centered,
  startIcon,
  endIcon,
  headIcon,
  onClick,
}: IButtonProps) => {
  return (
    <ButtonContainer
      color={color}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      wide={wide}
      centered={centered}
      tabIndex={disabled ? -1 : tabIndex}
    >
      {startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
      <span>{label}</span>
      {endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
      {headIcon && <HeadIconContainer>{headIcon}</HeadIconContainer>}
    </ButtonContainer>
  );
};

export default Button;
