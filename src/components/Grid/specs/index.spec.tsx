import { render } from 'utils/testUtilities';

import { gridMockData, menuMockData } from '__mocks__/gridMockData';
import { initialState } from 'store/api/constants';
import Grid from '../../Grid';
import { storeColumns } from '../constants';

describe('<Grid />', () => {
  const mockOnFilterModelChange = jest.fn();
  const mockOnPageChange = jest.fn();
  const mockOnPageSizeChange = jest.fn();
  const mockOnSortModelChange = jest.fn();

  const initialGridState = {
    pagination: { pageSize: 10 },
  };

  const renderGrid = () =>
    render(
      <Grid
        data={gridMockData}
        columns={storeColumns}
        id="grid-test"
        dataIdKey="Id"
        isFetching={false}
        onFilterModelChange={mockOnFilterModelChange}
        filterItem={initialState.filterItem}
        rowCount={3}
        onPageChange={mockOnPageChange}
        onPageSizeChange={mockOnPageSizeChange}
        menuData={menuMockData}
        onSortModelChange={mockOnSortModelChange}
        initialState={initialGridState}
      />,
    );

  test('should display Grid', async () => {
    const { findByRole } = renderGrid();

    const hasComponentRendered = await findByRole('grid');
    expect(hasComponentRendered).toBeInTheDocument();
  });
});
