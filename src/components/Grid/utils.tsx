import { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';

import Chips from 'components/Chips';
import { ICategories } from 'store/api/types';
import { StyledCellContent, StyledChipWrapper } from './styles';

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

export const handleRenderCellDate = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const cellValue = moment(params?.value).format('hh:mm:ss DD/MM/YYYY');

  useEffect(() => {
    if (tooltipTextRef?.current) {
      setShowTooltip(tooltipTextRef.current.clientWidth < tooltipTextRef.current.scrollWidth);
    }
  }, []);

  return (
    <Tooltip title={cellValue ?? ''} placement="top" key={params.id} arrow disableHoverListener={!showTooltip}>
      <StyledCellContent ref={tooltipTextRef} id={`styled-content-${params.id}-${params.field}`}>
        {cellValue}
      </StyledCellContent>
    </Tooltip>
  );
};

export const handleRenderChips = (params: GridRenderCellParams) => {
  return (
    <StyledChipWrapper>
      {params?.value.map((val: ICategories) => (
        <Chips key={val.id} label={val.name} />
      ))}
    </StyledChipWrapper>
  );
};
