import { render } from 'utils/testUtilities';

import SidePanel from '..';

describe('<SidePanel />', () => {
  const renderSidePanel = () => render(<SidePanel />);

  test('should display side panel', async () => {
    const { findByTestId } = renderSidePanel();

    const pondropLogo = await findByTestId('pondrop-logo');
    expect(pondropLogo).toBeInTheDocument();

    const storeBtn = await findByTestId('panel-store-btn');
    expect(storeBtn).toBeInTheDocument();

    const productsBtn = await findByTestId('panel-product-btn');
    expect(productsBtn).toBeInTheDocument();

    const signOutBtn = await findByTestId('signout-btn');
    expect(signOutBtn).toBeInTheDocument();
  });
});
