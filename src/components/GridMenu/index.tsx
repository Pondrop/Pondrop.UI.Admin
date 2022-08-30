import { ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { LabelDiv, MenuWrapper, RowDiv, StyledCheckbox, StyledList } from './styles';
import { ICustomMenuProps } from './types';
import { getAllUniqueValues } from './utils';

const CustomMenu = (props: ICustomMenuProps) => {
  const { filterItem, handleOnFilterClick, hideMenu, menuData, currentColumn, ...other } = props;

  const handleOnGridFilterClick = (value: string) => () => {
    if (typeof handleOnFilterClick === 'function') handleOnFilterClick(value, currentColumn.field);
  };

  const uniqueValues = getAllUniqueValues(menuData[currentColumn.field]);

  const MenuItems = ({ index, style }: Pick<ListChildComponentProps, 'index' | 'style'>) => {
    const idValue = String(uniqueValues[index]).replaceAll(/\s+/g, '-');
    const isChecked = Array.isArray(filterItem.value) ? filterItem.value.includes(uniqueValues[index]) : false;

    return (
      <RowDiv
        key={idValue}
        style={style}
        data-testid={`${currentColumn.field}-${idValue}`}
        onClick={handleOnGridFilterClick(idValue)}
      >
        <StyledCheckbox value={idValue} checked={isChecked} />
        <LabelDiv>{uniqueValues[index]}</LabelDiv>
      </RowDiv>
    );
  };

  const renderMenuItems = () => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <StyledList
            className={`${currentColumn.field}-List`}
            height={height}
            itemCount={uniqueValues.length}
            itemSize={42}
            width={width}
          >
            {MenuItems}
          </StyledList>
        )}
      </AutoSizer>
    );
  };

  return (
    <MenuWrapper items={uniqueValues.length} hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
      {renderMenuItems()}
    </MenuWrapper>
  );
};

export default CustomMenu;
