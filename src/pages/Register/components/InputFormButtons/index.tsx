import React from 'react';
import { FormWrapper } from 'pages/Register/styles';
import { Button, ButtonGroup, FormCell, Icon } from 'components';
import { FormRow } from 'components/FormMain/styles';
import { ReactComponent as IconSuccess } from 'assets/icons/icon-success.svg';
import { lightTheme } from 'theme';
import { useAppDispatch } from 'app/hooks';
import { resetRegisterFormData } from 'features/register/registerSlice';

const InputFormButtons = () => {
  const dispatch = useAppDispatch();

  const handleClickConfirm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    alert('Thank you for confirming!');
  };

  const handleClickReset = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(resetRegisterFormData());
  };

  return (
    <FormWrapper>
      <h2 className="title">Form Buttons</h2>
      <div className="content">
        <FormRow>
          <FormCell>
            <ButtonGroup gap={20} inline wide>
              <React.Fragment>
                <Button label="Reset Fields" color="primary" variant="outlined" onClick={handleClickReset} />
                <Button
                  label="Confirm"
                  color="primary"
                  headIcon={
                    <Icon fillColor={lightTheme.textWhite}>
                      <IconSuccess />
                    </Icon>
                  }
                  variant="contained"
                  onClick={handleClickConfirm}
                />
              </React.Fragment>
            </ButtonGroup>
          </FormCell>
        </FormRow>
      </div>
    </FormWrapper>
  );
};

export default InputFormButtons;
