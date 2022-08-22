import { ChangeEvent, ReactNode } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { MenuWrapper } from './styles';
import { ICustomMenuProps } from './types';
import { getAllUniqueValues } from './utils';

const CustomMenu = (props: ICustomMenuProps) => {
  const { filterItem, handleOnFilterClick, hideMenu, menuData, currentColumn, ...other } = props;

  const handleOnGridFilterClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof handleOnFilterClick === 'function') handleOnFilterClick(event, currentColumn);
  };

  const uniqueValues = getAllUniqueValues(menuData[currentColumn.field]);

  const renderMenuItems = () => {
    const MenuItems: ReactNode[] = [];
    uniqueValues.forEach((value) => {
      const idValue = value.replace(/\s+/g, '-');
      const isChecked = Array.isArray(filterItem.value) ? filterItem.value.includes(value) : false;
      MenuItems.push(
        <FormControlLabel
          key={idValue}
          control={<Checkbox onChange={handleOnGridFilterClick} value={idValue} checked={isChecked} />}
          label={value}
        />,
      );
    });

    return <FormGroup>{MenuItems}</FormGroup>;
  };

  return (
    <MenuWrapper hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
      {renderMenuItems()}
    </MenuWrapper>
  );
};

export default CustomMenu;
