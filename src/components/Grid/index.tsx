import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { GridColumnMenuProps, GridRowsProp } from '@mui/x-data-grid-pro';
import { FilterList } from '@mui/icons-material';

// Components
import CustomEmptyState from 'components/EmptyState';
import CustomMenu from 'components/GridMenu';

// Styles
import { StyledDataGrid } from './styles';

// Types
import { IFacetValue, IFilterItem } from 'store/api/types';
import { IGridProps } from './types';

const Grid: FunctionComponent<IGridProps> = ({
  data,
  columns,
  id,
  dataIdKey,
  isFetching,
  onFilterModelChange,
  filterItem = [],
  handleOnFilterClick,
  rowCount,
  onPageChange,
  onPageSizeChange,
  menuData = {} as IFacetValue,
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
  hideFooter = false,
  page,
  borderColor,
  isRowSelectable,
}: IGridProps): JSX.Element => {
  const [gridData, setGridData] = useState<GridRowsProp[]>([]);
  const [gridRowCount, setGridRowCount] = useState<number>(rowCount ?? gridData?.length);
  // Local filter used to prevent re-rendering of Grid menu
  // Grid menu uses local filter state instead
  const [localFilter, setLocalFilter] = useState<IFilterItem[]>([]);

  useEffect(() => {
    setGridData(data as unknown as GridRowsProp[]);
  }, [data]);

  useEffect(() => {
    setGridRowCount(rowCount ?? gridData?.length);
  }, [rowCount]);

  // Components
  const renderMenuIcon = () => {
    return <FilterList />;
  };

  const renderCustomMenu = useCallback(
    (props: GridColumnMenuProps) => {
      return (
        <CustomMenu
          data={gridData}
          filterItems={localFilter}
          handleOnFilterClick={handleOnFilterClick}
          menuData={menuData}
          isMenuLoading={isMenuLoading}
          {...props}
        />
      );
    },
    [searchValue, isMenuLoading, localFilter, id],
  );

  // Rendered when no rows are available after filtering
  const renderEmptyState = () => {
    return <CustomEmptyState displayText="No matches found." />;
  };

  // Rendered when no rows are given to grid
  const renderNoRowsState = () => {
    return <CustomEmptyState displayText="No data available." withIcon={false} />;
  };

  const getFilterModel = () => {
    const filterModelItem = {
      items: [...filterItem],
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
      rowsPerPageOptions={[10, 20, 30, 40, 100, 200]}
      initialState={{
        ...initialState,
      }}
      components={{
        ColumnMenuIcon: renderMenuIcon,
        ColumnMenu: renderCustomMenu,
        NoResultsOverlay: renderEmptyState,
        NoRowsOverlay: renderNoRowsState,
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
      isRowSelectable={isRowSelectable}
      rowHeight={rowHeight}
      onSelectionModelChange={onSelectionModelChange}
      selectionModel={selectionModel}
      keepNonExistentRowsSelected
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
      page={page}
      hideFooter={hideFooter}
      borderColor={borderColor}
      pagination={typeof onPageChange === 'function'}
      disableSelectionOnClick={!withCheckboxSelection}
    />
  );
};

export default Grid;
