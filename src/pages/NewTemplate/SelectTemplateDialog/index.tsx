import { useEffect, useState } from 'react';
import { DialogActions, DialogTitle, IconButton } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid-pro';
import { ArrowBack, Close } from '@mui/icons-material';

// Components
import Grid from 'components/Grid';
import SearchField from 'components/SearchField';

// Constants
import { selectedFieldsColumns } from 'components/Grid/constants';

// Store / APIs
import { templateInitialState } from 'store/api/templates/initialState';

// Styles
import { SpaceBetweenDiv, StyledCategoryBtn, StyledDialog, StyleOutlinedBtn } from 'pages/styles';
import { StyledDialogContent } from './styles';

// Types
import { IFacetValue, IFilterItem, ISortItem, IValue } from 'store/api/types';
import { ISelectTemplatesProps } from './types';

// Utils
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import { renderLoader } from 'pages/utils';

const SelectTemplateDialog = ({ isOpen, handleClose }: ISelectTemplatesProps): JSX.Element => {
  // States
  const selectTemplateFilterInitState = generateFilterInitState(selectedFieldsColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [menuData, setMenuData] = useState<IFacetValue>({} as IFacetValue);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);
  // Local states for Add Linked Products grid
  const [selectTemplateSearchVal, setSelectTemplateSearchVal] = useState<string>('');
  const [selectTemplateSortVal, setSelectTemplateSortVal] = useState<ISortItem>(templateInitialState.sortValue);
  const [selectTemplateFilterVal, setSelectTemplateFilterVal] = useState<IFilterItem[]>(selectTemplateFilterInitState);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const [rowCount, setRowCount] = useState<number>(0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'fieldStatus', sort: 'asc' as GridSortDirection }] },
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectTemplateSearchVal('');
      setSelectTemplateSortVal(templateInitialState.sortValue);
      setSelectedFields([]);
    }
  }, [isOpen]);

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    handleModalClose();
  };

  const handleSearchChange = (searchValue: string) => {
    setSelectTemplateSearchVal(searchValue);
    setSelectTemplateFilterVal(selectTemplateFilterInitState);
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    setSelectTemplateFilterVal(model.items as IFilterItem[]);
  };

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    const newAppliedFilters = currFilterItems.map((filter) => {
      if (filter.columnField === currColumn)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });

    setSelectTemplateFilterVal(newAppliedFilters);
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    setSelectTemplateSortVal({
      field: model[0]?.field,
      sort: model[0]?.sort,
    });
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setSelectedFields(selectionModel as string[]);
  };

  const renderLinkedProducts = () => {
    return (
      <div>
        <div className="select-template-modal" style={{ marginBottom: '24px' }}>
          <SearchField
            id="select-template-modal-search-field"
            value={selectTemplateSearchVal}
            onChange={handleSearchChange}
            padding="8px 12px 8px 0"
            variant="outlined"
            placeholder="Search configured fields"
          />
        </div>
        <Grid
          data={[]}
          columns={selectedFieldsColumns}
          id="select-template-grid"
          dataIdKey="id"
          isFetching={false}
          onFilterModelChange={onFilterModelChange}
          filterItem={selectTemplateFilterVal}
          handleOnFilterClick={handleOnFilterClick}
          rowCount={0}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          menuData={menuData as IFacetValue}
          onSortModelChange={handleSortModelChange}
          initialState={initialGridState}
          isMenuLoading={false}
          withPadding={false}
          withCheckboxSelection={true}
          withBorder={false}
          onSelectionModelChange={onSelectionModelChange}
          selectionModel={selectedFields}
          rowHeight={52}
        />
      </div>
    );
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        Select fields for submission
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            right: 32,
            top: 32,
            color: '#1c1b1f',
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
    );
  };

  const renderActionButtons = () => {
    return (
      <SpaceBetweenDiv withmargin={false} style={{ width: '100%' }}>
        <StyleOutlinedBtn
          data-testid="select-template-done-btn"
          className="button-with-icon"
          variant="outlined"
          disableElevation
          height={40}
          onClick={handleModalClose}
          startIcon={<ArrowBack />}
        >
          Done
        </StyleOutlinedBtn>
        <StyledCategoryBtn
          data-testid="select-template-new-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalClose}
        >
          Create new submission field
        </StyledCategoryBtn>
      </SpaceBetweenDiv>
    );
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="xl"
      fullWidth={true}
      transitionDuration={300}
      data-testid="select-template-modal"
      keepMounted
      dialogWidth={980}
    >
      {renderDialogTitle()}
      <StyledDialogContent className="dialog-content">{renderLinkedProducts()}</StyledDialogContent>
      <DialogActions style={{ padding: '12px 32px 32px' }}>{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default SelectTemplateDialog;
