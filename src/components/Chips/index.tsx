import { MouseEvent } from 'react';

import { StyledChip } from './styles';
import { IChipsProps } from './types';

const Chips = ({ label, onChipClick }: IChipsProps) => {
  const handleChipClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (typeof onChipClick === 'function') onChipClick();
  };

  return (
    <StyledChip
      className="chip-component"
      label={label}
      onClick={handleChipClick}
      clickable={typeof onChipClick === 'function'}
    />
  );
};

export default Chips;
