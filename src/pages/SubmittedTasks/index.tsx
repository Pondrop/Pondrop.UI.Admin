import { FunctionComponent, useState } from 'react';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';

import { tasksColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { initialState } from 'store/api/constants';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import SearchField from 'components/SearchField';

const SubmittedTasks: FunctionComponent = (): JSX.Element => {
  // States
  const [taskFilterItem, setTaskFilterItem] = useState<IFilterItem>(initialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const initialGridState = {
    pagination: { pageSize },
  };

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    // Insert dispatch here
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    // Insert dispatch here
  };

  const handleSortModelChange = (model: GridSortModel) => {
    // Insert dispatch here
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    // Insert dispatch here
  };

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="products-header">
            Submitted Tasks
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <SearchField id="product-search-field" value={''} onEnterPress={handleSearchDispatch} />
      </RowAlignDiv>
      <Grid
        data={[]}
        columns={tasksColumns}
        id="view-tasks-grid"
        isFetching={false}
        onFilterModelChange={onFilterModelChange}
        filterItem={taskFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={0}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={{} as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        isMenuLoading={false}
      />
    </MainContent>
  );
};

export default SubmittedTasks;
