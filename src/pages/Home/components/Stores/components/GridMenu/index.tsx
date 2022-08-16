import { ChangeEvent, ReactNode } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from 'store';
import { useGetStoresQuery } from 'store/api/stores/api';
import { selectStore, setFilter } from 'store/api/stores/slice';
import { MenuWrapper } from './styles';
import { getAllUniqueValues } from './utils';

const CustomMenu = (props: GridColumnMenuProps) => {
  const dispatch = useAppDispatch();
  const { filterItem } = useAppSelector(selectStore);

  const { hideMenu, currentColumn, ...other } = props;

  // query hook
  const { data } = useGetStoresQuery();

  const handleStateChange = (value: string) => {
    const newFilterItems = filterItem.value.includes(value)
      ? filterItem.value.filter((val) => val !== value)
      : [...filterItem.value, value];

    return newFilterItems;
  };

  const handleOnFilterClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.labels) return;

    const combinedValue =
      filterItem.columnField === currentColumn.field
        ? handleStateChange(event?.target?.labels[0].outerText)
        : [event?.target?.labels[0].outerText];

    dispatch(
      setFilter({
        columnField: currentColumn.field,
        value: combinedValue,
      }),
    );
  };

  const uniqueValues = getAllUniqueValues(currentColumn.field, data?.value);

  const renderMenuItems = () => {
    const MenuItems: ReactNode[] = [];
    uniqueValues.forEach((value) => {
      const idValue = value.replace(/\s+/g, '-');
      const isChecked = filterItem.value.includes(value);
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
