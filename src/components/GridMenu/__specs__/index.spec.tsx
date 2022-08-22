import { GridRowsProp } from '@mui/x-data-grid';
import { render } from 'utils/testUtilities';
import { gridMockData, menuMockData } from '__mocks__/Home/gridMockData';
import { initialState } from 'store/api/stores/initialState';
import { storeColumns } from '../../Grid/constants';
import GridMenu from '../../GridMenu';

describe('<GridMenu />', () => {
  const mockFn = jest.fn();
  const renderGridMenu = () =>
    render(
      <GridMenu
        data={gridMockData as unknown as GridRowsProp[]}
        filterItem={initialState.filterItem}
        hideMenu={mockFn}
        currentColumn={storeColumns[0]}
        open={true}
        id="test-grid-menu"
        menuData={menuMockData}
      />,
    );

  test('should display Grid Menu', async () => {
    const { findByRole } = renderGridMenu();

    const hasComponentRendered = await findByRole('menu');
    expect(hasComponentRendered).toBeInTheDocument();
  });

  test('should display correct list', async () => {
    const { container } = renderGridMenu();
    const menuList = container.getElementsByClassName('MuiFormControlLabel-root');

    expect(menuList).toHaveLength(1);
  });
});
