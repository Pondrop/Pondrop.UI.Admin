import { FunctionComponent, useEffect, useState } from 'react';
import { GridColumnMenuProps, GridFilterModel, GridRowsProp } from '@mui/x-data-grid';
import { FilterList } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'store';
import { useGetStoresQuery } from 'store/api/stores/api';
import { selectStore, setFilter } from 'store/api/stores/slice';

import CustomMenu from '../GridMenu';
import { gridColumns } from './constants';
import { StyledDataGrid } from './styles';
import { IGridProps } from './types';

const Grid: FunctionComponent<IGridProps> = ({ data }: IGridProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { filterItem, searchValue } = useAppSelector(selectStore);

  const [storeData, setStoreData] = useState<GridRowsProp[]>([]);

  // query hook
  const { isFetching } = useGetStoresQuery(searchValue);

  useEffect(() => {
    setStoreData(data as unknown as GridRowsProp[]);
  }, [data]);

  // components
  const renderMenuIcon = () => {
    return <FilterList />;
  };

  const renderCustomMenu = (props: GridColumnMenuProps) => {
    return <CustomMenu data={storeData} {...props} />;
  };

  // helper function
  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
  };
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
      data-testid="view-store-grid"
      rows={storeData ?? []}
      columns={gridColumns}
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
    />
  );
};

export default Grid;
