import { FormCellContainer } from './styles';
import { IFormCellProps } from './types';

const FormCell = ({ children, cellWidth = 'auto' }: IFormCellProps) => {
  return <FormCellContainer cellWidth={cellWidth}>{children}</FormCellContainer>;
};

export default FormCell;
