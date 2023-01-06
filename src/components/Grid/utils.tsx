import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, SelectChangeEvent, Tooltip } from '@mui/material';
import { DeleteOutline, Info } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import moment from 'moment';

// Components
import Chips from 'components/Chips';

// Store / APIs
import { useAppDispatch, useAppSelector } from 'store';
import { selectTemplates, setNewTemplateSelectedFieldIds, setSelectedFields } from 'store/api/templates/slice';

// Styles
import { InfoIconWrapper, StyledChipWrapper, StyledInputBase, StyledMenuItem, StyledSelect } from 'pages/styles';
import { StyledCellContent, StyledCellContentWrapper } from './styles';

// Types
import { ICategories, IValue } from 'store/api/types';

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

// Format cell if value is a picker
export const handleRenderFieldType = (params: GridRenderCellParams) => {
  const tooltipTextRef = useRef<HTMLDivElement>(null);

  const capitalizedValue = params.value[0].toUpperCase() + params.value.slice(1);
  const isPicker = params.value === 'picker';

  const renderPickerList = () => {
    return (
      <div>
        <ul style={{ paddingInlineStart: '16px' }}>
          {params.row.pickerValues.map((pickerValue: string, index: string) => (
            <li key={`picker-${index}`}>{pickerValue}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <StyledCellContentWrapper
      ref={tooltipTextRef}
      id={`styled-content-${params.id}-${params.field}`}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      {capitalizedValue}
      {isPicker && (
        <Tooltip title={renderPickerList()} placement="right" key={params.id} arrow>
          <InfoIconWrapper>
            <Info />
          </InfoIconWrapper>
        </Tooltip>
      )}
    </StyledCellContentWrapper>
  );
};

// Render dropdown
export const handleRenderDropdown = (params: GridRenderCellParams) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<string>(params.value ? 'yes' : 'no');
  const dispatch = useAppDispatch();
  const { selectedFields } = useAppSelector(selectTemplates);

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleDropdownChange = (event: SelectChangeEvent<unknown>) => {
    const newSelectedFields = selectedFields.map((field) => {
      if (field.id === params.row.id)
        return {
          ...field,
          mandatory: event.target.value === 'yes' ? true : false,
        };
      else return field;
    });
    dispatch(setSelectedFields(newSelectedFields));
    setDropdownValue(String(event.target.value));
  };

  return (
    <StyledSelect
      id={`mandatory-${params.row.id}`}
      value={dropdownValue}
      onChange={handleDropdownChange}
      MenuProps={{
        PaperProps: {
          sx: {
            border: '1px solid #006492 !important',
            borderRadius: '0 0 8px 8px !important',
          },
        },
      }}
      input={<StyledInputBase paddingTop={8} />}
      onClose={handleSelectClose}
      onOpen={handleSelectOpen}
      isOpen={isSelectOpen}
    >
      <StyledMenuItem key="yes" value="yes">
        Yes
      </StyledMenuItem>
      <StyledMenuItem key="no" value="no">
        No
      </StyledMenuItem>
    </StyledSelect>
  );
};

// Render delete icon
export const handleRenderDeleteButton = (params: GridRenderCellParams) => {
  const dispatch = useAppDispatch();
  const { selectedFields, selectedIds } = useAppSelector(selectTemplates);

  const handleDeleteRow = () => {
    const newSelectedFields = selectedFields.filter((field: IValue) => field.id !== params.row.id);
    const newSelectedIds = (selectedIds as string[])?.filter((id: string) => id !== params.row.id);
    dispatch(setSelectedFields(newSelectedFields));
    dispatch(setNewTemplateSelectedFieldIds(newSelectedIds));
  };

  return (
    <IconButton aria-label="delete" size="small" onClick={handleDeleteRow}>
      <DeleteOutline fontSize="inherit" />
    </IconButton>
  );
};
