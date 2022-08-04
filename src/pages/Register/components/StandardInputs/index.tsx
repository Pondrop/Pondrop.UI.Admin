import { useAppSelector } from 'app/hooks';
import { FormWrapper } from 'pages/Register/styles';
import { FormCell, FormInputText } from 'components';
import { FormRow } from 'components/FormMain/styles';
import { selectRegisterState } from 'features/register/registerSlice';
import useHandleChangeFieldValue from '../../hooks/useHandleChangeFieldValue';

const StandardInputs = () => {
  const { registerFormData } = useAppSelector(selectRegisterState);
  const { city, country } = registerFormData;
  const handleChangeFieldValue = useHandleChangeFieldValue();

  return (
    <FormWrapper>
      <h2 className="title">Inputs - Standard</h2>
      <div className="content">
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText name="city" onChange={handleChangeFieldValue} value={city} label="City" />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText name="country" onChange={handleChangeFieldValue} value={country} label="Country" />
          </FormCell>
        </FormRow>
      </div>
    </FormWrapper>
  );
};

export default StandardInputs;
