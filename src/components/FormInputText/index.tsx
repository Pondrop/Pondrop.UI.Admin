import { Field, FormInputTextContainer, IconWrapper, Label } from './styles';
import { FormInputTextProps } from './types';

const FormInputText = ({
  name,
  label,
  floatingLabel,
  value,
  hasError,
  onChange,
  type = 'text',
  placeholder,
  icon,
  onKeyDown,
}: FormInputTextProps) => {
  return (
    <FormInputTextContainer>
      {label && !floatingLabel && <Label htmlFor={name}>{label}</Label>}
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Field
        type={type}
        name={name}
        id={name}
        value={value}
        hasError={hasError}
        onChange={onChange}
        placeholder={placeholder}
        icon={icon}
        onKeyDown={onKeyDown}
      />
      {floatingLabel && (
        <Label htmlFor={name} floatingLabel={floatingLabel}>
          {label}
        </Label>
      )}
    </FormInputTextContainer>
  );
};

export default FormInputText;
