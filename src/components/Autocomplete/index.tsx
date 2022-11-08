import { SyntheticEvent, useEffect, useState } from 'react';
import { Autocomplete, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { useGetCategoriesQuery } from 'store/api/categories/api';
import { IValue } from 'store/api/types';
import { StyledPopper, StyledTextField } from './styles';

const TextAutocomplete = () => {
  const [options, setOptions] = useState<IValue[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const { data, isFetching } = useGetCategoriesQuery(
    {
      searchString: searchValue,
    },
    { skip: searchValue.length < 3 },
  );

  useEffect(() => {
    setOptions(data?.value ?? []);
  }, [data]);

  useEffect(() => {
    if (searchValue.length < 3) setOptions([]);
  }, [searchValue]);

  const handleSearchValueChange = (e: SyntheticEvent, value: string) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => String(option?.categoryName)}
        renderOption={(props, option) => {
          const matches = match(String(option?.categoryName), searchValue, { insideWords: true });
          const parts = parse(String(option?.categoryName), matches);

          return (
            <li {...props}>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                    backgroundColor: part.highlight ? '#fffb96' : 'transparent',
                    whiteSpace: 'pre',
                  }}
                >
                  {part.text}
                </span>
              ))}
            </li>
          );
        }}
        onInputChange={handleSearchValueChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            variant="standard"
            placeholder="Search"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
        loading={isFetching}
        clearOnBlur={false}
        PopperComponent={(params) => <StyledPopper {...params} />}
        noOptionsText={<i>Please search with more than 3 characters</i>}
        popupIcon={null}
        disableCloseOnSelect={true}
      />
    </div>
  );
};

export default TextAutocomplete;
