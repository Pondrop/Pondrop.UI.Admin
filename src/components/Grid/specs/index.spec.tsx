import { render } from 'utils/testUtilities';

import { gridMockData } from '__mocks__/Home/gridMockData';
import { initialState } from 'store/api/stores/initialState';
import Grid from '../../Grid';
import { storeColumns } from '../constants';

describe('<Grid />', () => {
  const mockOnFilterModelChange = jest.fn();
  const renderGrid = () =>
    render(
      <Grid
        data={gridMockData}
        columns={storeColumns}
        id="grid-test"
        isFetching={false}
        onFilterModelChange={mockOnFilterModelChange}
        filterItem={initialState.filterItem}
      />,
    );

  test('should display Grid', async () => {
    const { findByRole } = renderGrid();

    const hasComponentRendered = await findByRole('grid');
    expect(hasComponentRendered).toBeInTheDocument();
  });
});
