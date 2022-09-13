import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import { StyledTextField } from './styles';
import { ISearchFieldProps } from './types';

const SearchField = ({
  onEnterPress,
  value,
  id,
  isfullsize = true,
  width,
  onChange,
}: ISearchFieldProps): JSX.Element => {
  const [searchValueString, setSearchValueString] = useState<string>(value);

  useEffect(() => {
    setSearchValueString(value ?? '');
  }, [value]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueString(e.target.value);
    if (typeof onChange === 'function') onChange(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && typeof onEnterPress === 'function') {
      onEnterPress(searchValueString);
    }
  };

  return (
    <StyledTextField
      id={id}
      variant="standard"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      value={searchValueString}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      isfullsize={isfullsize}
      width={width}
    />
  );
};

export default SearchField;
