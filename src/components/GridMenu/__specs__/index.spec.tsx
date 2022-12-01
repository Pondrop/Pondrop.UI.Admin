import { GridRowsProp } from '@mui/x-data-grid-pro';
import userEvent from '@testing-library/user-event';

import { IFilterItem } from 'store/api/types';
import { render } from 'utils/testUtilities';
import { gridMockData, menuMockData } from '__mocks__/gridMockData';
import { initialState } from 'store/api/constants';
import { storeColumns } from '../../Grid/constants';
import GridMenu from '../../GridMenu';

describe('<GridMenu />', () => {
  const mockHideMenuFn = jest.fn();
  const mockFilterHandlerFn = jest.fn();
  const initialFilter = initialState.filterItem;
  const renderGridMenu = (filterItem: IFilterItem[]) =>
    render(
      <GridMenu
        data={gridMockData as unknown as GridRowsProp[]}
        filterItems={filterItem}
        hideMenu={mockHideMenuFn}
        handleOnFilterClick={mockFilterHandlerFn}
        currentColumn={storeColumns[0]}
        open={true}
        id="test-grid-menu"
        menuData={menuMockData}
        isMenuLoading={false}
      />,
    );

  test('should display Grid Menu', async () => {
    const { findByRole } = renderGridMenu(initialFilter);

    const hasComponentRendered = await findByRole('menu');
    expect(hasComponentRendered).toBeInTheDocument();
  });

  test('should display correct list', async () => {
    const { getByRole } = renderGridMenu(initialFilter);
    const menuList = getByRole('menu');

    expect(menuList).toHaveAttribute('items', '1');
  });

  test('should search correctly', async () => {
    const { getByRole } = renderGridMenu(initialFilter);
    const menuList = getByRole('menu');
    const searchField = getByRole('textbox');
    const user = userEvent.setup();

    await user.click(searchField);
    await user.type(searchField, 'a');

    expect(menuList).toHaveAttribute('items', '0');
  });

  test('should show checked checkbox after clicking on option', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(50);
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200);
    const filterItem = [
      {
        columnField: 'provider',
        id: 'provider',
        value: ['Woolworths Group'],
        operatorValue: 'isAnyOf',
      },
    ];

    const { getByRole } = renderGridMenu(filterItem);
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  test('should call handleOnFilterClick once', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(50);
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200);

    const { getByRole } = renderGridMenu(initialFilter);
    const checkbox = getByRole('checkbox');
    const user = userEvent.setup();

    await user.click(checkbox);

    expect(mockFilterHandlerFn).toBeCalledTimes(1);
  });
});
