import { render } from 'utils/testUtilities';

import SidePanel from '..';

describe('<SidePanel />', () => {
  const renderSidePanel = () => render(<SidePanel />);

  test('should display side panel', async () => {
    const { findByTestId } = renderSidePanel();

    const pondropLogo = await findByTestId('pondrop-logo');
    expect(pondropLogo).toBeInTheDocument();

    const storeBtn = await findByTestId('store-btn');
    expect(storeBtn).toBeInTheDocument();

    const logoutBtn = await findByTestId('logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });
});
