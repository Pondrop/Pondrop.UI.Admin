import { SyntheticEvent, useEffect, useState } from 'react';
import { Autocomplete, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { useAppDispatch } from 'store';
import { categoriesApi, useGetCategoriesQuery } from 'store/api/categories/api';
import { IValue } from 'store/api/types';
import { StyledPopper, StyledTextField } from './styles';
import { IAutocompleteProps } from './types';

const TextAutocomplete = ({ onOptionSelect }: IAutocompleteProps) => {
  const [options, setOptions] = useState<IValue[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const dispatch = useAppDispatch();

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

  const handleOptionClick = (e: SyntheticEvent, value: IValue | null) => {
    if (value) {
      if (typeof onOptionSelect === 'function') onOptionSelect(value);
      setSearchValue('');
      setSelectedValue(String(value?.id));
      dispatch(categoriesApi.util.resetApiState());
    }
  };

  return (
    <div>
      <Autocomplete
        options={options}
        key={`selected-${selectedValue}`}
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
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={handleOptionClick}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            value={searchValue}
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
        PopperComponent={(params) => (
          <StyledPopper {...params} modifiers={[{ name: 'offset', options: { offset: [0, 6] } }]} />
        )}
        noOptionsText={
          <i>{searchValue.length < 3 ? 'Please search with more than 3 characters' : 'No categories found'}</i>
        }
        popupIcon={null}
      />
    </div>
  );
};

export default TextAutocomplete;
