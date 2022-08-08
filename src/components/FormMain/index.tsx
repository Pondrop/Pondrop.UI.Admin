import { FormMainContainer } from './styles';
import { FormMainProps } from './types';

const FormMain = ({ children, onSubmit }: FormMainProps) => {
  return <FormMainContainer onSubmit={onSubmit}>{children}</FormMainContainer>;
};

export default FormMain;
