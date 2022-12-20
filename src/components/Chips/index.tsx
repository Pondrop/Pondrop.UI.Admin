import { MouseEvent } from 'react';

// Styles
import { StyledChip } from './styles';

// Types
import { IChipsProps } from './types';

const Chips = ({ label, onChipClick, onChipDelete }: IChipsProps) => {
  const handleChipClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (typeof onChipClick === 'function') onChipClick();
  };

  const handleDeleteChip = (event: MouseEvent) => {
    event.stopPropagation();
    if (typeof onChipDelete === 'function') onChipDelete();
  };

  return (
    <StyledChip
      className="chip-component"
      label={label}
      onClick={handleChipClick}
      clickable={typeof onChipClick === 'function'}
      onDelete={onChipDelete ? handleDeleteChip : undefined}
    />
  );
};

export default Chips;
