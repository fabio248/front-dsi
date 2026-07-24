import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';

/**
 * Buscador.
 *
 * Por defecto se maneja solo contra el parámetro `search` de la URL, que es
 * como lo usan los listados con scroll infinito.
 *
 * Si recibe `value` y `onChange` queda controlado por quien lo renderiza. La
 * tabla de usuarios lo necesita así: su escritura de `search` también tiene que
 * resetear la página, y el modo por defecto hace `setQuery({ search })`, que
 * reemplaza la query string completa y borraría el orden y la página.
 */
export const SearchInput = ({ isFetching, value, onChange }) => {
  const [query, setQuery] = useSearchParams();

  const isControlled = value !== undefined;
  const search = isControlled ? value : query.get('search');

  const handleChange = (event) => {
    const nextValue = event.target.value;

    if (isControlled) {
      onChange(nextValue);
      return;
    }

    setQuery({ search: nextValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        style={{
          width: '350px',
          borderWidth: '2px',
          borderRadius: '1px',
          borderColor: 'antiquewhite',
        }}
        value={search ?? ''}
        onChange={handleChange}
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
