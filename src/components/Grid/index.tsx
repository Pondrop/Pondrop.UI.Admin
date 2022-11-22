import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { GridColumnMenuProps, GridRowsProp } from '@mui/x-data-grid';
import { FilterList } from '@mui/icons-material';

// API Types
import { IFilterItem } from 'store/api/types';

// Components
import CustomEmptyState from 'components/EmptyState';
import CustomMenu from 'components/GridMenu';

import { StyledDataGrid } from './styles';
import { IGridProps } from './types';

const Grid: FunctionComponent<IGridProps> = ({
  data,
  columns,
  id,
  dataIdKey,
  isFetching,
  onFilterModelChange,
  filterItem,
  handleOnFilterClick,
  rowCount,
  onPageChange,
  onPageSizeChange,
  menuData,
  onSortModelChange,
  initialState,
  onRowClick,
  withBorder = true,
  isMenuLoading,
  searchValue,
  withPadding = true,
  withCheckboxSelection = false,
  rowHeight,
  onSelectionModelChange,
  selectionModel,
  hideFooterSelectedRowCount = false,
  page,
  borderColor,
}: IGridProps): JSX.Element => {
  const [gridData, setGridData] = useState<GridRowsProp[]>([]);
  const [gridRowCount, setGridRowCount] = useState<number>(rowCount ?? gridData?.length);
  const [localFilter, setLocalFilter] = useState<IFilterItem>({} as IFilterItem);

  useEffect(() => {
    setGridData(data as unknown as GridRowsProp[]);
  }, [data]);

  useEffect(() => {
    setGridRowCount(rowCount ?? gridData?.length);
  }, [rowCount]);

  // components
  const renderMenuIcon = () => {
    return <FilterList />;
  };

  const renderCustomMenu = useCallback(
    (props: GridColumnMenuProps) => {
      return (
        <CustomMenu
          data={gridData}
          filterItem={localFilter}
          handleOnFilterClick={handleOnFilterClick}
          menuData={menuData}
          isMenuLoading={isMenuLoading}
          {...props}
        />
      );
    },
    [searchValue, isMenuLoading, localFilter, id],
  );

  const renderEmptyState = () => {
    return <CustomEmptyState displayText="No matches found." />;
  };

  // helper function
  const getFilterModel = () => {
    const filterModelItem = {
      items: [
        {
          columnField: filterItem.columnField,
          value: filterItem.value,
          operatorValue: filterItem.operatorValue,
        },
      ],
    };

    return filterModelItem;
  };

  const handleMenuOpen = () => {
    setLocalFilter(filterItem);
  };

  return (
    <StyledDataGrid
      data-testid={id}
      rows={gridData ?? []}
      columns={columns}
      autoHeight
      rowsPerPageOptions={[10, 20, 30, 40]}
      initialState={{
        ...initialState,
      }}
      components={{
        ColumnMenuIcon: renderMenuIcon,
        ColumnMenu: renderCustomMenu,
        NoResultsOverlay: renderEmptyState,
      }}
      componentsProps={{
        pagination: { showFirstButton: true, showLastButton: true },
      }}
      loading={isFetching}
      getRowId={(row) => row[dataIdKey]}
      filterModel={getFilterModel()}
      onFilterModelChange={onFilterModelChange}
      paginationMode="server"
      rowCount={gridRowCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filterMode="server"
      sortingMode="server"
      onSortModelChange={onSortModelChange}
      onRowClick={onRowClick}
      withBorder={withBorder}
      hasClickEvent={!!onRowClick}
      onMenuOpen={handleMenuOpen}
      getRowHeight={() => rowHeight ?? 'auto'}
      withPadding={withPadding}
      checkboxSelection={withCheckboxSelection}
      rowHeight={rowHeight}
      onSelectionModelChange={onSelectionModelChange}
      selectionModel={selectionModel}
      keepNonExistentRowsSelected
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
      page={page}
      hideFooter={!!!rowCount}
      borderColor={borderColor}
    />
  );
};

export default Grid;
