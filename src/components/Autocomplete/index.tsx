import { SyntheticEvent, useEffect, useState } from 'react';
import { Autocomplete, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import moment from 'moment';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

// Store / APIs
import { useAppDispatch } from 'store';
import { categoriesApi, useGetCategoriesQuery } from 'store/api/categories/api';

// Styles
import { StyledPaper, StyledPopper, StyledTextField } from './styles';

// Types
import { IValue } from 'store/api/types';
import { IAutocompleteProps } from './types';

const TextAutocomplete = ({ onOptionSelect, isModalOpen, disabledOptions = [] }: IAutocompleteProps) => {
  // Autocomplete options to render
  const [options, setOptions] = useState<IValue[]>([]);
  // Selected value is used to re-render Autocomplete component
  const [selectedValue, setSelectedValue] = useState<string>('');
  // Search value used to get all options
  const [searchValue, setSearchValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetCategoriesQuery(
    {
      searchString: searchValue,
      prevPageItems: 0,
      pageSize: 100,
    },
    { skip: searchValue.length < 3 },
  );

  useEffect(() => {
    setOptions(data?.value ?? []);
  }, [data]);

  // When search value length < 3, show no options
  useEffect(() => {
    if (searchValue.length < 3) setOptions([]);
  }, [searchValue]);

  useEffect(() => {
    if (!isModalOpen) {
      // Reset search value, selected value, and api
      // Selected value set to epoch moment so component rerenders and is set to default value
      // Workaround to reset the Autocomplete component after every time user selects an option
      setSearchValue('');
      setSelectedValue(String(moment().unix()));
      dispatch(categoriesApi.util.resetApiState());
    }
  }, [isModalOpen]);

  const handleSearchValueChange = (e: SyntheticEvent, value: string) => {
    setSearchValue(value);
  };

  const handleOptionClick = (e: SyntheticEvent, value: IValue | null) => {
    if (value) {
      if (typeof onOptionSelect === 'function') onOptionSelect(value);
      setSearchValue('');
      setSelectedValue(`${String(value?.id)}-${String(moment().unix())}`);
      dispatch(categoriesApi.util.resetApiState());
    }
  };

  // Disabled options = options already selected / used
  const getOptionDisabled = (option: IValue) => disabledOptions.includes(String(option?.lowerLevelCategoryId));

  return (
    <div>
      <Autocomplete
        options={options}
        key={`selected-${selectedValue}`}
        getOptionLabel={(option) => String(option?.categoryName)}
        getOptionDisabled={getOptionDisabled}
        renderOption={(props, option) => {
          // Highlight matched parts
          const matches = match(String(option?.categoryName), searchValue, { insideWords: true });
          const parts = parse(String(option?.categoryName), matches);

          return (
            <li style={{ height: '40px' }} {...props}>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '14px',
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
          <i style={{ fontSize: '14px' }}>
            {searchValue.length < 3 ? 'Please search with more than 3 characters' : 'No categories found'}
          </i>
        }
        popupIcon={null}
        PaperComponent={(params) => <StyledPaper {...params} />}
      />
    </div>
  );
};

export default TextAutocomplete;
