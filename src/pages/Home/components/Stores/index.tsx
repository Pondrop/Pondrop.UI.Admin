import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';

import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import { useGetStoresQuery } from 'store/api/stores/api';
import { ColAlignDiv, RowAlignDiv, StoresWrapper, StyledTextField, StyledTitle } from './styles';
import Grid from './components/Grid';

const Stores: FunctionComponent = (): JSX.Element => {
  const { refetch } = useGetStoresQuery();

  // States
  const [searchValue, setSearchValue] = useState<string>('');

  // Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Insert search event here

      // Temporary dispatch below
      refetch();
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
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleOnKeyDown}
        />
      </RowAlignDiv>
      <Grid />
    </StoresWrapper>
  );
};

export default Stores;
