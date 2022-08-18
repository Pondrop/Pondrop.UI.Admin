import { ChangeEvent, ReactNode } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'store';
import { selectStore, setFilter } from 'store/api/stores/slice';
import { MenuWrapper } from './styles';
import { ICustomMenuProps } from './types';
import { getAllUniqueValues } from './utils';

const CustomMenu = (props: ICustomMenuProps) => {
  const { data, hideMenu, currentColumn, ...other } = props;
  const dispatch = useAppDispatch();
  const { filterItem } = useAppSelector(selectStore);

  const handleStateChange = (value: string) => {
    if (!Array.isArray(filterItem.value)) return [];
    const newFilterItems = filterItem.value.includes(value)
      ? filterItem.value.filter((val) => val !== value)
      : [...filterItem.value, value];

    return newFilterItems;
  };

  const handleOnFilterClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.labels) return;

    const combinedValue =
      filterItem.columnField === currentColumn.field && Array.isArray(filterItem.value)
        ? handleStateChange(event?.target?.labels[0].outerText)
        : [event?.target?.labels[0].outerText];

    dispatch(
      setFilter({
        columnField: currentColumn.field,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  const uniqueValues = getAllUniqueValues(currentColumn.field, data);

  const renderMenuItems = () => {
    const MenuItems: ReactNode[] = [];
    uniqueValues.forEach((value) => {
      const idValue = value.replace(/\s+/g, '-');
      const isChecked = Array.isArray(filterItem.value) ? filterItem.value.includes(value) : false;
      MenuItems.push(
        <FormControlLabel
          key={idValue}
          control={<Checkbox onChange={handleOnFilterClick} value={idValue} checked={isChecked} />}
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
