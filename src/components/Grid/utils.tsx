import { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

import { StyledCellContent } from './styles';

export const handleRenderCell = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (tooltipTextRef?.current) {
      setShowTooltip(tooltipTextRef.current.clientWidth < tooltipTextRef.current.scrollWidth);
    }
  }, []);

  return (
    <Tooltip title={params.value ?? ''} placement="top" key={params.id} arrow disableHoverListener={!showTooltip}>
      <StyledCellContent ref={tooltipTextRef} id={`styled-content-${params.id}-${params.field}`}>
        {params.value}
      </StyledCellContent>
    </Tooltip>
  );
};
