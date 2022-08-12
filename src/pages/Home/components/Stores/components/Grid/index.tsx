import { FunctionComponent, useEffect, useState } from 'react';
import { GridRowsProp } from '@mui/x-data-grid';

import { useGetStoresQuery } from 'store/api/stores/api';
import { gridColumns } from './constants';
import { StyledDataGrid } from './styles';

const Grid: FunctionComponent = (): JSX.Element => {
  const [storeData, setStoreData] = useState<GridRowsProp[]>([]);

  // query hook
  const { data, isFetching } = useGetStoresQuery();

  useEffect(() => {
    setStoreData(data?.value as unknown as GridRowsProp[]);
  }, [data]);

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
      componentsProps={{
        pagination: { showFirstButton: true, showLastButton: true },
      }}
      loading={isFetching}
      getRowId={(row) => row.Id}
      getRowHeight={() => 'auto'}
    />
  );
};

export default Grid;
