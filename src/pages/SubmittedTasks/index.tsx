import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridFilterModel, GridRowParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

// Components
import Grid from 'components/Grid';
import { tasksColumns } from 'components/Grid/constants';
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';

// Other variables / values
import { useAppDispatch, useAppSelector } from 'store';
import { useGetAllTaskFilterQuery, useGetTasksQuery } from 'store/api/tasks/api';
import { selectTasks, setTasksFilter, setTasksSearchValue, setTasksSortValue } from 'store/api/tasks/slice';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTitle } from '../styles';

const SubmittedTasks: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const tasksFilterInitState = generateFilterInitState(tasksColumns);
  const [taskFilterItem, setTaskFilterItem] = useState<IFilterItem[]>(tasksFilterInitState);
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
    if (filterItem.length !== 0) setTaskFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setTasksFilter(tasksFilterInitState));
    dispatch(setTasksSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(setTasksFilter(model.items as IFilterItem[]));
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

    setPageSkip(0);

    dispatch(setTasksFilter(newAppliedFilters));
  };

  const handleOnRowClick = (params: GridRowParams) => {
    navigate(`${params.id}`, { replace: false, state: { rowData: params.row } });
  };

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="submissons-header">
            Submissions
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <SearchField
          id="task-search-field"
          value={''}
          isfullsize={false}
          width={321}
          onEnterPress={handleSearchDispatch}
          padding="16px 14px 14px"
        />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={tasksColumns}
        id="view-tasks-grid"
        dataIdKey="id"
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
        onRowClick={handleOnRowClick}
        isMenuLoading={isFilterOptionsFetching}
        searchValue={searchValue}
      />
    </MainContent>
  );
};

export default SubmittedTasks;
