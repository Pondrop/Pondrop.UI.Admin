import { Field, FormInputTextContainer, Label } from './styles';
import { FormInputTextProps } from './types';

const FormInputText = ({
  name,
  label,
  floatingLabel,
  value,
  hasError,
  onChange,
  type = 'text',
}: FormInputTextProps) => {
  return (
    <FormInputTextContainer>
      {label && !floatingLabel && <Label htmlFor={name}>{label}</Label>}
      <Field type={type} name={name} id={name} value={value} hasError={hasError} onChange={onChange} placeholder=" " />
      {floatingLabel && (
        <Label htmlFor={name} floatingLabel={floatingLabel}>
          {label}
        </Label>
      )}
    </FormInputTextContainer>
  );
};

export default FormInputText;
