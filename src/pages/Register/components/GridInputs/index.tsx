import { useAppSelector } from 'app/hooks';
import { FormWrapper } from 'pages/Register/styles';
import { Button, FormCell, FormInputText, Icon } from 'components';
import { FormRow } from 'components/FormMain/styles';
import { selectRegisterState } from 'features/register/registerSlice';
import { lightTheme } from 'theme';
import { ReactComponent as IconSearch } from 'assets/icons/icon-search.svg';
import useHandleChangeFieldValue from '../../hooks/useHandleChangeFieldValue';

const GridInputs = () => {
  const { registerFormData } = useAppSelector(selectRegisterState);
  const { firstName, middleName, lastName, address } = registerFormData;
  const handleChangeFieldValue = useHandleChangeFieldValue();

  const handleClickSearchAddress = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    alert('No results for: ' + address);
  };

  return (
    <FormWrapper>
      <h2 className="title">Inputs - Grid Style</h2>
      <div className="content">
        <FormRow>
          <FormCell cellWidth="10%">
            <label htmlFor="firstName">First name</label>
          </FormCell>
          <FormCell cellWidth="85%">
            <FormInputText name="firstName" onChange={handleChangeFieldValue} value={firstName} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="10%">
            <label htmlFor="firstName">Last name</label>
          </FormCell>
          <FormCell cellWidth="30%">
            <FormInputText name="firstName" onChange={handleChangeFieldValue} value={firstName} />
          </FormCell>
          <FormCell cellWidth="10%">
            <label htmlFor="lastName">Last name</label>
          </FormCell>
          <FormCell cellWidth="35%">
            <FormInputText name="lastName" onChange={handleChangeFieldValue} value={lastName} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="auto">
            <label htmlFor="firstName">First name</label>
          </FormCell>
          <FormCell cellWidth="auto">
            <FormInputText name="firstName" onChange={handleChangeFieldValue} value={lastName} />
          </FormCell>
          <FormCell cellWidth="auto">
            <label htmlFor="lastName">Middle name</label>
          </FormCell>
          <FormCell cellWidth="auto">
            <FormInputText name="middleName" onChange={handleChangeFieldValue} value={middleName} />
          </FormCell>
          <FormCell cellWidth="auto">
            <label htmlFor="lastName">Last name</label>
          </FormCell>
          <FormCell cellWidth="auto">
            <FormInputText name="lastName" onChange={handleChangeFieldValue} value={lastName} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="auto">
            <FormInputText name="firstName" value={firstName} onChange={handleChangeFieldValue} label="First name" />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="auto">
            <FormInputText name="firstName" value={firstName} onChange={handleChangeFieldValue} label="First name" />
          </FormCell>
          <FormCell cellWidth="auto">
            <FormInputText name="lastName" value={lastName} onChange={handleChangeFieldValue} label="Last name" />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="auto">
            <FormInputText name="firstName" value={firstName} onChange={handleChangeFieldValue} label="First name" />
          </FormCell>
          <FormCell cellWidth="auto">
            <FormInputText name="middleName" value={middleName} onChange={handleChangeFieldValue} label="Middle name" />
          </FormCell>
          <FormCell cellWidth="auto">
            <FormInputText name="lastName" value={lastName} onChange={handleChangeFieldValue} label="Last name" />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText
              name="firstName"
              onChange={handleChangeFieldValue}
              value={firstName}
              label="First name"
              floatingLabel
            />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText
              name="firstName"
              onChange={handleChangeFieldValue}
              value={firstName}
              label="First name"
              floatingLabel
            />
            <FormInputText
              name="lastName"
              onChange={handleChangeFieldValue}
              value={lastName}
              label="Last name"
              floatingLabel
            />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="100%">
            <FormInputText
              name="firstName"
              onChange={handleChangeFieldValue}
              value={firstName}
              label="First name"
              floatingLabel
            />
            <FormInputText
              name="middleName"
              onChange={handleChangeFieldValue}
              value={middleName}
              label="Middle name"
              floatingLabel
            />
            <FormInputText
              name="lastName"
              onChange={handleChangeFieldValue}
              value={lastName}
              label="Last name"
              floatingLabel
            />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell cellWidth="70%">
            <FormInputText
              name="address"
              onChange={handleChangeFieldValue}
              value={address}
              label="Residential address"
              floatingLabel
            />
          </FormCell>
          <FormCell cellWidth="30%">
            <Button
              label="Search"
              color="primary"
              startIcon={
                <Icon fillColor={lightTheme.textWhite}>
                  <IconSearch />
                </Icon>
              }
              wide
              variant="contained"
              disabled={!address}
              onClick={handleClickSearchAddress}
            />
          </FormCell>
        </FormRow>
      </div>
    </FormWrapper>
  );
};

export default GridInputs;
