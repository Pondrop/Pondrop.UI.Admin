import { useAppSelector } from 'app/hooks';
import { FormWrapper } from 'pages/Register/styles';
import { FormCell, FormInputText } from 'components';
import { FormRow } from 'components/FormMain/styles';
import { selectRegisterState } from 'features/register/registerSlice';
import useHandleChangeFieldValue from '../../hooks/useHandleChangeFieldValue';

const FloatingLabelInputs = () => {
  const { registerFormData } = useAppSelector(selectRegisterState);
  const { email, address } = registerFormData;
  const handleChangeFieldValue = useHandleChangeFieldValue();

  return (
    <FormWrapper>
      <h2 className="title">Inputs - Floating Label</h2>
      <div className="content">
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText name="email" onChange={handleChangeFieldValue} value={email} label="E-mail" floatingLabel />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText
              name="address"
              onChange={handleChangeFieldValue}
              value={address}
              label="Residential address"
              floatingLabel
            />
          </FormCell>
        </FormRow>
      </div>
    </FormWrapper>
  );
};

export default FloatingLabelInputs;
