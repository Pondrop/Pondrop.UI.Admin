import { useAppSelector } from 'app/hooks';
import { FormWrapper } from 'pages/Register/styles';
import { FormCell, FormInputText } from 'components';
import { FormRow } from 'components/FormMain/styles';
import { selectRegisterState } from 'features/register/registerSlice';
import useHandleChangeFieldValue from '../../hooks/useHandleChangeFieldValue';

const SideLabelInputs = () => {
  const { registerFormData } = useAppSelector(selectRegisterState);
  const { firstName, lastName } = registerFormData;
  const handleChangeFieldValue = useHandleChangeFieldValue();

  return (
    <FormWrapper>
      <h2 className="title">Inputs - Side Label</h2>
      <div className="content">
        <FormRow>
          <FormCell cellWidth="10%">
            <label htmlFor="firstname">First name</label>
          </FormCell>
          <FormCell cellWidth="85%">
            <FormInputText name="firstName" onChange={handleChangeFieldValue} value={firstName} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="10%">
            <label htmlFor="lastName">Last name</label>
          </FormCell>
          <FormCell cellWidth="85%">
            <FormInputText name="lastName" onChange={handleChangeFieldValue} value={lastName} />
          </FormCell>
        </FormRow>
      </div>
    </FormWrapper>
  );
};

export default SideLabelInputs;
