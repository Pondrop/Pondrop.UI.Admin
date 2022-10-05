import { StyledChip } from './styles';
import { IChipsProps } from './types';

const Chips = ({ label }: IChipsProps) => {
  return <StyledChip className="chip-component" label={label} />;
};

export default Chips;
