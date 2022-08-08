import { ToggleContainer, ToggleSlider } from './styles';
import { IToggleProps } from './types';

const Toggle = ({ color, value, disabled, onChange }: IToggleProps) => {
  return (
    <ToggleContainer color={color} disabled={disabled}>
      <input type="checkbox" onChange={onChange} checked={value} />
      <ToggleSlider color={color} />
    </ToggleContainer>
  );
};

export default Toggle;
