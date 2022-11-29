import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const handleRenderProvider = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (tooltipTextRef?.current) {
      setShowTooltip(tooltipTextRef.current.clientWidth < tooltipTextRef.current.scrollWidth);
    }
  }, []);

  return (
    <Tooltip title={params.value.name ?? ''} placement="top" key={params.id} arrow disableHoverListener={!showTooltip}>
      <StyledCellContent ref={tooltipTextRef} id={`styled-content-${params.id}-${params.field}`}>
        {params.value.name}
      </StyledCellContent>
    </Tooltip>
  );
};

export const handleRenderCellFormat = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (tooltipTextRef?.current) {
      setShowTooltip(tooltipTextRef.current.clientWidth < tooltipTextRef.current.scrollWidth);
    }
  }, []);

  const capitalizedValue = params.value[0].toUpperCase() + params.value.slice(1);

  return (
    <Tooltip title={capitalizedValue ?? ''} placement="top" key={params.id} arrow disableHoverListener={!showTooltip}>
      <StyledCellContent ref={tooltipTextRef} id={`styled-content-${params.id}-${params.field}`}>
        {capitalizedValue}
      </StyledCellContent>
    </Tooltip>
  );
};

export const handleRenderCellDate = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const cellValue = params?.value ? moment(params?.value).format('HH:mm:ss DD/MM/YYYY') : '';

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

export const handleRenderChips = (params: GridRenderCellParams, isClickable: boolean) => {
  const navigate = useNavigate();

  return (
    <StyledChipWrapper>
      {params?.row?.categories?.map((val: ICategories, index: number) => {
        const handleChipClick = () => {
          navigate(`categories/${val.id}`, { replace: false, state: { rowData: val } });
        };

        return (
          <Chips
            key={`${val.id}-${params?.id}-${index}`}
            label={val.name}
            onChipClick={isClickable ? handleChipClick : undefined}
          />
        );
      })}
    </StyledChipWrapper>
  );
};
