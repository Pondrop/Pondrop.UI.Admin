import { FunctionComponent, useEffect, useState } from 'react';
import { GridFilterModel, GridRowsProp } from '@mui/x-data-grid';

import { ReactComponent as MenuIcon } from 'assets/icons/filter_list.svg';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetStoresQuery } from 'store/api/stores/api';
import { selectStore, setFilter } from 'store/api/stores/slice';

import CustomMenu from '../GridMenu';
import { gridColumns } from './constants';
import { StyledDataGrid } from './styles';

const Grid: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { filterItem } = useAppSelector(selectStore);

  const [storeData, setStoreData] = useState<GridRowsProp[]>([]);

  // query hook
  const { data, isFetching } = useGetStoresQuery();

  useEffect(() => {
    setStoreData(data?.value as unknown as GridRowsProp[]);
  }, [data]);

  // components
  const renderMenuIcon = () => <MenuIcon />;

  // helper function
  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
      }),
    );
  };
  const getFilterModel = () => {
    const filterModelItem = {
      items: [
        {
          columnField: filterItem.columnField,
          value: filterItem.value,
          operatorValue: 'isAnyOf',
        },
      ],
    };

    return filterModelItem;
  };

  return (
    <StyledDataGrid
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
        ColumnMenu: CustomMenu,
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
