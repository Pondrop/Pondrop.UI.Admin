import { render } from 'utils/testUtilities';

import { gridMockData } from '__mocks__/Home/gridMockData';
import Grid from '../../Grid';

describe('<Grid />', () => {
  const renderGrid = () => render(<Grid data={gridMockData} />);

  test('should display Grid', async () => {
    const { findByRole } = renderGrid();

    const hasComponentRendered = await findByRole('grid');
    expect(hasComponentRendered).toBeInTheDocument();
  });
});
