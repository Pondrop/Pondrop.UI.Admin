import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import moment from 'moment';

// Components
import Chips from 'components/Chips';

// Styles
import { StyledChipWrapper } from 'pages/styles';
import { StyledCellContent } from './styles';

// Types
import { ICategories } from 'store/api/types';

// Normal rendering of cell + tooltip
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

// Special handler for Provider field since field is an object
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

// Formatting of cell to capitalize first letter
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

// Formatting of cell to show formatted date
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

// Render chips based on categories field
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

// Format cell depending on manual submission boolean type
export const handleRenderManualSubmissions = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (tooltipTextRef?.current) {
      setShowTooltip(tooltipTextRef.current.clientWidth < tooltipTextRef.current.scrollWidth);
    }
  }, []);

  const isManualSubmission = params.value ? 'Yes' : 'No';

  return (
    <Tooltip title={isManualSubmission} placement="top" key={params.id} arrow disableHoverListener={!showTooltip}>
      <StyledCellContent ref={tooltipTextRef} id={`styled-content-${params.id}-${params.field}`}>
        {isManualSubmission}
      </StyledCellContent>
    </Tooltip>
  );
};
