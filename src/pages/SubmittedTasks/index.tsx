import { FunctionComponent, useEffect, useState } from 'react';
import { GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import { tasksColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetAllTaskFilterQuery, useGetTasksQuery } from 'store/api/tasks/api';
import { taskInitialState } from 'store/api/tasks/initialState';
import { selectTasks, setTasksFilter, setTasksSearchValue, setTasksSortValue } from 'store/api/tasks/slice';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';

const SubmittedTasks: FunctionComponent = (): JSX.Element => {
  // States
  const [taskFilterItem, setTaskFilterItem] = useState<IFilterItem>(taskInitialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectTasks);
  const { data, isFetching } = useGetTasksQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });

  const gridData = data?.value ?? [];
  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllTaskFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const menuData = {
    taskType: filterOptionsData?.['@search.facets']?.taskType,
    submittedUtc: filterOptionsData?.['@search.facets']?.submittedUtc,
    retailerName: filterOptionsData?.['@search.facets']?.retailerName,
    storeName: filterOptionsData?.['@search.facets']?.storeName,
    Product: filterOptionsData?.['@search.facets']?.Product ?? [],
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'submittedUtc', sort: 'desc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    setTaskFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(
      setTasksFilter({
        columnField: '',
        value: '',
        operatorValue: 'isAnyOf',
      }),
    );
    dispatch(setTasksSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setTasksFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
  };

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setTasksSortValue({
        field: model[0]?.field,
        sort: model[0]?.sort,
      }),
    );
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    const combinedValue =
      filters.field === currColumn && Array.isArray(filters.value)
        ? handleFilterStateChange(value, filters.value)
        : [value];

    dispatch(
      setTasksFilter({
        columnField: currColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  console.log('data ', data?.value);

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="products-header">
            Submissions
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <SearchField id="task-search-field" value={''} onEnterPress={handleSearchDispatch} />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={tasksColumns}
        id="view-tasks-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={taskFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        isMenuLoading={isFilterOptionsFetching}
        searchValue={searchValue}
      />
    </MainContent>
  );
};

export default SubmittedTasks;
