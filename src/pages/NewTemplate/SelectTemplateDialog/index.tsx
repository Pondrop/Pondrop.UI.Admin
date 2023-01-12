import { useEffect, useState } from 'react';
import { DialogActions, DialogTitle, IconButton } from '@mui/material';
import {
  GridFilterModel,
  GridRowParams,
  GridSelectionModel,
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid-pro';
import { ArrowBack, Close } from '@mui/icons-material';

// Components
import Grid from 'components/Grid';
import SearchField from 'components/SearchField';

// Constants
import { availableFieldsColumns } from 'components/Grid/constants';

// Store / APIs
import { useAppDispatch, useAppSelector } from 'store';
import { useGetFieldsQuery as useGetAllFieldsQuery } from 'store/api/tasks/api';
import { useGetAllFieldFilterQuery, useGetFieldsQuery } from 'store/api/templates/api';
import { selectedFieldsInitialState } from 'store/api/templates/initialState';
import { selectTemplates, setNewTemplateSelectedFieldIds, setSelectedFields } from 'store/api/templates/slice';

// Styles
import { SpaceBetweenDiv, StyledCategoryBtn, StyledDialog, StyleOutlinedBtn } from 'pages/styles';
import { StyledDialogContent } from './styles';

// Types
import { IFacetValue, IFilterItem, ISortItem, IValue } from 'store/api/types';
import { ISelectTemplatesProps } from './types';

// Utils
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';

const SelectTemplateDialog = ({ isOpen, handleClose }: ISelectTemplatesProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { selectedIds: globalSelectedFieldIds } = useAppSelector(selectTemplates);

  // States
  const selectTemplateFilterInitState = generateFilterInitState(availableFieldsColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [menuData, setMenuData] = useState<IFacetValue>({} as IFacetValue);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);
  // Local states for Add Linked Products grid
  const [selectTemplateSearchVal, setSelectTemplateSearchVal] = useState<string>('');
  const [selectTemplateSortVal, setSelectTemplateSortVal] = useState<ISortItem>(selectedFieldsInitialState.sortValue);
  const [selectTemplateFilterVal, setSelectTemplateFilterVal] = useState<IFilterItem[]>(selectTemplateFilterInitState);
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>(globalSelectedFieldIds as string[]);

  const { data: fieldData } = useGetAllFieldsQuery();

  const { data, isFetching } = useGetFieldsQuery({
    searchString: selectTemplateSearchVal,
    sortValue: selectTemplateSortVal,
    filterItem: selectTemplateFilterVal,
    prevPageItems: pageSkip,
    pageSize,
  });

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllFieldFilterQuery(
    {
      searchString: selectTemplateSearchVal,
    },
    { skip: !gridData.length },
  );

  const [rowCount, setRowCount] = useState<number>(0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'fieldStatus', sort: 'asc' as GridSortDirection }] },
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectTemplateSearchVal('');
      setSelectTemplateSortVal(selectedFieldsInitialState.sortValue);
    } else {
      setGridData(data?.value ?? []);
      setRowCount(data?.['@odata.count'] ?? 0);
      const tempMenuData = {
        label: filterOptionsData?.['@search.facets']?.label,
        fieldType: filterOptionsData?.['@search.facets']?.fieldType,
        maxValue: filterOptionsData?.['@search.facets']?.maxValue,
      } as IFacetValue;
      setMenuData(tempMenuData);
    }
  }, [data, filterOptionsData, isOpen]);

  useEffect(() => {
    if (isOpen) setSelectedFieldIds(globalSelectedFieldIds as string[]);
  }, [isOpen]);

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    const selectedRows: IValue[] = [];
    selectedFieldIds.forEach((id) => {
      const matchField = fieldData?.items?.find((field) => field.id === String(id));
      selectedRows.push(matchField ?? {});
    });

    dispatch(setSelectedFields(selectedRows));
    dispatch(setNewTemplateSelectedFieldIds(selectedFieldIds));
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
    setSelectedFieldIds(selectionModel as string[]);
  };

  const handleDisabledFields = (params: GridRowParams) => {
    if (params.row?.fieldStatus === 'active') return true;
    else return false;
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
          data={gridData}
          columns={availableFieldsColumns}
          id="select-template-grid"
          dataIdKey="id"
          isFetching={isFetching}
          onFilterModelChange={onFilterModelChange}
          filterItem={selectTemplateFilterVal}
          handleOnFilterClick={handleOnFilterClick}
          rowCount={rowCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          menuData={menuData as IFacetValue}
          onSortModelChange={handleSortModelChange}
          initialState={initialGridState}
          isMenuLoading={isFilterOptionsFetching}
          withPadding={false}
          withCheckboxSelection={true}
          withBorder={false}
          onSelectionModelChange={onSelectionModelChange}
          selectionModel={selectedFieldIds}
          rowHeight={48}
          isRowSelectable={handleDisabledFields}
          hideFooterSelectedRowCount={true}
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
          onClick={handleModalSubmit}
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
