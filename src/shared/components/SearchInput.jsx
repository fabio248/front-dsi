import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';

export const SearchInput = ({ isFetching }) => {
  const [query, setQuery] = useSearchParams();
  const search = query.get('search');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        style={{
          width: '300px',
          borderWidth: '2px',
          borderRadius: '1px',
          borderColor: 'antiquewhite',
        }}
        value={search ?? ''}
        onChange={(event) => {
          const value = event.target.value;
          setQuery({ search: value });
        }}
        label='Buscar'
        placeholder='Introduce cualquier dato'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: isFetching ? <CircularProgress /> : undefined,
        }}
      />
    </form>
  );
};
