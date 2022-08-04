import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectRegisterState, setRegisterFormData } from 'features/register/registerSlice';

const useHandleChangeFieldValue = (): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
  const dispatch = useAppDispatch();
  const { registerFormData } = useAppSelector(selectRegisterState);

  return (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      setRegisterFormData({
        ...registerFormData,
        [e.target.name]: e.target.value,
      }),
    );
  };
};

export default useHandleChangeFieldValue;
