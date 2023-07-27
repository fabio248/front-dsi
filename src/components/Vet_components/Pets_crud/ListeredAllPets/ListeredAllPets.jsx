import React, { useEffect } from 'react';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

//clases de renderizado
import { PetsAllItems } from '../PetsAllItems';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import InputAdornment from '@mui/material/InputAdornment';
//mui material
import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { map } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { SearchInput } from '../../../../shared/components/SearchInput';
import { useDebounce } from '../../../../hooks';
import { usePet } from '../../../../hooks/UsePet';
import InfiniteScroll from 'react-infinite-scroll-component';

//clase Pets
const apiAuthController = new ApiAuth();

export function ListeredAllPets() {
  const [query] = useSearchParams();
  const search = query.get('search');
  const accessToken = apiAuthController.getAccessToken();

  const deboncedQuery = useDebounce(search, 500);

  const {
    isLoading,
    pets,
    isFetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    totalPets,
  } = usePet({
    accessToken,
    search: deboncedQuery,
  });

  useEffect(() => {
    refetch();
  }, [deboncedQuery]);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs value={0} aria-label='basic tabs example'>
              <Tab icon={<PetsIcon />} label='Mascotas' {...a11yProps(0)} />
            </Tabs>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Espacio flexible */}
          </Grid>
          <Grid item>Total mascotas registradas: {totalPets}</Grid>
          <Grid item>
            <SearchInput isFetching={isFetching} />
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          margin: '16px',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <InfiniteScroll
          dataLength={pets.length}
          hasMore={hasNextPage || isLoading}
          next={() => fetchNextPage()}
          scrollThreshold={0.5}
        >
          {map(pets, (pet) => (
            <PetsAllItems key={pet.id} pet={pet} />
          ))}
        </InfiniteScroll>
      </div>

      {hasNextPage & !isFetching ? (
        <Button onClick={() => fetchNextPage()}>Cargar más mascotas</Button>
      ) : undefined}

      {isFetching ? <CircularProgress /> : undefined}

      {!hasNextPage & (pets.length !== 0) ? (
        <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
          Ya tienes todos los mascotas cargados
        </Typography>
      ) : undefined}

      {pets.length === 0 && !isFetching ? (
        <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
          No hay mascotas {search ? 'con este filtro' : undefined}
        </Typography>
      ) : undefined}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
