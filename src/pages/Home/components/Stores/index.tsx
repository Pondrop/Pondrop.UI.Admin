import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';

import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import { useAppDispatch } from 'store';
import { setSearchValue } from 'store/api/stores/slice';
import { ColAlignDiv, RowAlignDiv, StoresWrapper, StyledTextField, StyledTitle } from './styles';
import Grid from './components/Grid';

const Stores: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // States
  const [searchValueString, setSearchValueString] = useState<string>('');

  // Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueString(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setSearchValue(searchValueString));
    }
  };

  return (
    <StoresWrapper>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle variant="h5" gutterBottom>
            Stores
          </StyledTitle>
          <StyledTitle variant="caption">Last updated: 12th August, 2022 @ 10:01am</StyledTitle>
        </ColAlignDiv>
        <StyledTextField
          id="search-field"
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
          onChange={handleSearch}
          onKeyDown={handleOnKeyDown}
        />
      </RowAlignDiv>
      <Grid />
    </StoresWrapper>
  );
};

export default Stores;
