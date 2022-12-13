import { FunctionComponent, useState } from 'react';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import { templatesColumns } from 'components/Grid/constants';
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import NewTemplateDialog from './components/NewTemplateDialog';

// Other variables / values
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';
import { INewTemplateDialogData } from './components/NewTemplateDialog/types';
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignDiv,
  RowAlignWrapper,
  StyledCategoryBtn,
  StyledTitle,
} from '../styles';

const Templates: FunctionComponent = (): JSX.Element => {
  // States
  const templateFilterInitState = generateFilterInitState(templatesColumns);
  const [templateFilterItem, setTemplateFilterItem] = useState<IFilterItem[]>(templateFilterInitState);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  // Dialog states
  const [isNewTemplateModalOpen, setIsNewTemplateModalOpen] = useState<boolean>(false);

  const gridData: IValue[] = [];

  const [rowCount, setRowCount] = useState<number>(0);

  const initialGridState = {
    pagination: { pageSize },
  };

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    // Insert search dispatch and filter clear here
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    // Insert filter dispatch here
  };

  const handleSortModelChange = (model: GridSortModel) => {
    // Inser sort dispatch here
  };

  const handleNewTemplateModalOpen = () => {
    setIsNewTemplateModalOpen(true);
  };

  const handleNewTemplateModalClose = () => {
    setIsNewTemplateModalOpen(false);
  };

  const handleNewTemplateSubmit = (newTemplateData: INewTemplateDialogData) => {
    // Insert submit dispatch logic here
    handleNewTemplateModalClose();
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    setPageSkip(0);

    const newAppliedFilters = currFilterItems.map((filter) => {
      if (filter.columnField === currColumn)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });

    // Insert filter dispatch here
  };

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="templates-header">
            Templates
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <RowAlignWrapper style={{ height: '54px' }}>
          <CategoryBtnWrapper rightmargin={20}>
            <StyledCategoryBtn
              data-testid="add-template-btn"
              className="add-template-btn"
              variant="contained"
              disableElevation
              height={40}
              onClick={handleNewTemplateModalOpen}
            >
              + Create new template
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField
            id="templates-search-field"
            value={''}
            isfullsize={false}
            width={321}
            onEnterPress={handleSearchDispatch}
            padding="16px 14px 14px"
          />
        </RowAlignWrapper>
      </RowAlignDiv>
      <Grid
        data={gridData}
        columns={templatesColumns}
        id="view-templates-grid"
        dataIdKey="id"
        isFetching={false}
        onFilterModelChange={onFilterModelChange}
        filterItem={templateFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={[] as unknown as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        isMenuLoading={false}
        searchValue={''}
      />
      <NewTemplateDialog
        isOpen={isNewTemplateModalOpen}
        handleClose={handleNewTemplateModalClose}
        handleSubmit={handleNewTemplateSubmit}
        isLoading={false}
        errorMessage=""
      />
    </MainContent>
  );
};

export default Templates;
