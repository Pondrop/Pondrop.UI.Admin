import { render } from 'utils/testUtilities';

import { gridColumns } from '../../Grid/constants';
import GridMenu from '../../GridMenu';

describe('<GridMenu />', () => {
  const mockFn = jest.fn();

  test('should display Grid Menu', async () => {
    const renderGridMenu = () =>
      render(<GridMenu hideMenu={mockFn} currentColumn={gridColumns[0]} open={true} id="test-grid-menu" />);
    const { findByRole } = renderGridMenu();

    const hasComponentRendered = await findByRole('menu');
    expect(hasComponentRendered).toBeInTheDocument();
  });
});
