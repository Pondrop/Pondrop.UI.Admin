import { useState } from 'react';
import { ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { CircularProgress } from '@mui/material';

import SearchField from 'components/SearchField';
import { CircularLoaderWrapper } from 'pages/styles';
import { IFilterItem } from 'store/api/types';
import {
  LabelDiv,
  MenuListWrapper,
  MenuWrapper,
  RowDiv,
  SearchFieldWrapper,
  StyledCheckbox,
  StyledList,
} from './styles';
import { ICustomMenuProps } from './types';
import { getAllUniqueValues, handleFilterStateChange } from './utils';

const CustomMenu = (props: ICustomMenuProps) => {
  const { filterItem, handleOnFilterClick, hideMenu, menuData, currentColumn, isMenuLoading = true, ...other } = props;

  const uniqueValues = getAllUniqueValues(menuData[currentColumn.field]);
  const [filteredData, setFilteredData] = useState<string[]>(uniqueValues);
  const [appliedFilter, setAppliedFilters] = useState<IFilterItem>(filterItem as IFilterItem);

  const handleOnGridFilterClick = (value: string) => () => {
    if (typeof handleOnFilterClick === 'function') {
      const filterData = {
        field: appliedFilter.columnField,
        value: appliedFilter.value,
      };
      handleOnFilterClick(value, currentColumn.field, filterData);
    }

    const combinedValue =
      appliedFilter.columnField === currentColumn.field ? handleFilterStateChange(value, appliedFilter.value) : [value];

    setAppliedFilters({
      columnField: currentColumn.field,
      value: combinedValue,
      operatorValue: 'isAnyOf',
    });
  };

  const handleOnSearchChange = (searchValue: string) => {
    const lowercaseSearchVal = searchValue.toLowerCase();
    const filteredItems = searchValue
      ? uniqueValues.filter((value) => value.toLowerCase().includes(lowercaseSearchVal))
      : uniqueValues;
    setFilteredData(filteredItems);
  };

  const MenuItems = ({ index, style }: Pick<ListChildComponentProps, 'index' | 'style'>) => {
    const idValue = String(filteredData[index]).replaceAll(/\s+/g, '-');
    const isChecked = Array.isArray(appliedFilter.value) ? appliedFilter.value.includes(filteredData[index]) : false;

    return (
      <RowDiv
        key={idValue}
        style={style}
        data-testid={`${currentColumn.field}-${idValue}`}
        onClick={handleOnGridFilterClick(filteredData[index])}
      >
        <StyledCheckbox value={idValue} checked={isChecked} />
        <LabelDiv>{filteredData[index]}</LabelDiv>
      </RowDiv>
    );
  };

  const renderLoader = () => (
    <CircularLoaderWrapper height="270px">
      <CircularProgress size={50} thickness={3} />
    </CircularLoaderWrapper>
  );

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
              itemCount={filteredData.length}
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
      items={filteredData.length}
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      isLoading={isMenuLoading}
      {...other}
    >
      {isMenuLoading ? renderLoader() : renderMenuItems()}
    </MenuWrapper>
  );
};

export default CustomMenu;
