import { useState } from 'react';
import { ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Components
import SearchField from 'components/SearchField';

// Styles
import {
  LabelDiv,
  MenuListWrapper,
  MenuWrapper,
  RowDiv,
  SearchFieldWrapper,
  StyledCheckbox,
  StyledList,
} from './styles';

// Types
import { IFilterItem } from 'store/api/types';
import { ICustomMenuProps } from './types';

// Utils
import { renderLoader } from 'pages/utils';
import { getAllUniqueValues, handleFilterStateChange } from './utils';

const CustomMenu = (props: ICustomMenuProps) => {
  const { filterItems, handleOnFilterClick, hideMenu, menuData, currentColumn, isMenuLoading = true, ...other } = props;

  // Get string array of unique values based on menu data provided and current column
  const uniqueValues = getAllUniqueValues(menuData[currentColumn.field]);
  const [searchedData, setSearchedData] = useState<string[]>(uniqueValues);
  // Local filter state
  const [appliedFilters, setAppliedFilters] = useState<IFilterItem[]>([...filterItems]);

  const handleOnGridFilterClick = (value: string) => () => {
    if (typeof handleOnFilterClick === 'function') handleOnFilterClick(value, currentColumn.field, appliedFilters);

    const columnValues = appliedFilters.find((filter) => filter.columnField === currentColumn.field);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    const newAppliedFilters = appliedFilters.map((filter) => {
      if (filter.columnField === currentColumn.field)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });
    setAppliedFilters(newAppliedFilters);
  };

  const handleOnSearchChange = (searchValue: string) => {
    const lowercaseSearchVal = searchValue.toLowerCase();
    const filteredItems = searchValue
      ? uniqueValues.filter((value) => value.toLowerCase().includes(lowercaseSearchVal))
      : uniqueValues;
    setSearchedData(filteredItems);
  };

  const MenuItems = ({ index, style }: Pick<ListChildComponentProps, 'index' | 'style'>) => {
    const idValue = String(searchedData[index]).replaceAll(/\s+/g, '-');
    const columnValues = appliedFilters.find((filter) => filter.columnField === currentColumn.field);
    const isChecked =
      columnValues && Array.isArray(columnValues.value) ? columnValues.value.includes(searchedData[index]) : false;

    return (
      <RowDiv
        key={idValue}
        style={style}
        data-testid={`${currentColumn.field}-${idValue}`}
        onClick={handleOnGridFilterClick(searchedData[index])}
      >
        <StyledCheckbox value={idValue} checked={isChecked} />
        <LabelDiv>{searchedData[index][0].toUpperCase() + searchedData[index].slice(1)}</LabelDiv>
      </RowDiv>
    );
  };

  const renderMenuItems = () => {
    if (uniqueValues.length === 0)
      return (
        <MenuListWrapper style={{ display: 'flex', alignItems: 'center' }}>
          <i>No options available.</i>
        </MenuListWrapper>
      );
    return (
      <MenuListWrapper>
        <SearchFieldWrapper>
          <SearchField
            id="category-search-field"
            value={''}
            isfullsize={false}
            width={225}
            onChange={handleOnSearchChange}
            padding="4px 2px"
          />
        </SearchFieldWrapper>
        <AutoSizer>
          {({ height, width }) => (
            <StyledList
              className={`${currentColumn.field}-List`}
              height={height}
              itemCount={searchedData.length}
              itemSize={42}
              width={width}
            >
              {MenuItems}
            </StyledList>
          )}
        </AutoSizer>
      </MenuListWrapper>
    );
  };

  return (
    <MenuWrapper
      items={searchedData.length}
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      isLoading={isMenuLoading}
      {...other}
    >
      {isMenuLoading ? renderLoader('270px', 50, 3) : renderMenuItems()}
    </MenuWrapper>
  );
};

export default CustomMenu;
