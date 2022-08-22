import { FunctionComponent, useEffect, useState } from 'react';
import { GridColumnMenuProps, GridRowsProp } from '@mui/x-data-grid';
import { FilterList } from '@mui/icons-material';

import CustomMenu from '../GridMenu';
import { StyledDataGrid } from './styles';
import { IGridProps } from './types';

const Grid: FunctionComponent<IGridProps> = ({
  data,
  columns,
  id,
  isFetching,
  onFilterModelChange,
  filterItem,
  handleOnFilterClick,
  rowCount,
  onPageChange,
  onPageSizeChange,
  menuData,
}: IGridProps): JSX.Element => {
  const [gridData, setGridData] = useState<GridRowsProp[]>([]);
  const [gridRowCount, setGridRowCount] = useState<number>(rowCount);

  useEffect(() => {
    setGridData(data as unknown as GridRowsProp[]);
  }, [data]);

  useEffect(() => {
    setGridRowCount(rowCount);
  }, [rowCount]);

  // components
  const renderMenuIcon = () => {
    return <FilterList />;
  };

  const renderCustomMenu = (props: GridColumnMenuProps) => {
    return (
      <CustomMenu
        data={gridData}
        filterItem={filterItem}
        handleOnFilterClick={handleOnFilterClick}
        menuData={menuData}
        {...props}
      />
    );
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

  return (
    <StyledDataGrid
      data-testid={id}
      rows={gridData ?? []}
      columns={columns}
      autoHeight
      rowsPerPageOptions={[10, 20, 40, 60, 80, 100]}
      initialState={{
        pagination: {
          pageSize: 10,
        },
      }}
      components={{
        ColumnMenuIcon: renderMenuIcon,
        ColumnMenu: renderCustomMenu,
      }}
      componentsProps={{
        pagination: { showFirstButton: true, showLastButton: true },
      }}
      loading={isFetching}
      getRowId={(row) => row.Id}
      getRowHeight={() => 'auto'}
      filterModel={getFilterModel()}
      onFilterModelChange={onFilterModelChange}
      paginationMode="server"
      rowCount={gridRowCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filterMode="server"
    />
  );
};

export default Grid;
