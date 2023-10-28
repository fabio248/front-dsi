import React, { useEffect ,useState} from 'react';
import './ListeredAllPets.css';

//import petitions of back
import { ApiAuth } from '../../../../api/Auth.api';

//clases de renderizado
import { PetsAllItems } from '../PetsAllItems';
import PetsIcon from '@mui/icons-material/Pets';

//mui material
import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import { map } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { SearchInput } from '../../../../shared/components/SearchInput';
import { useDebounce } from '../../../../hooks';
import { usePet } from '../../../../hooks/UsePet';
import InfiniteScroll from 'react-infinite-scroll-component';

// Clase Pets
const apiAuthController = new ApiAuth();

export function ListeredAllPets() {
  const [selectedTab, setSelectedTab] = useState(0);
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label='basic tabs example'>
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

      {/* PETS ALL ITEMS */}
      {selectedTab === 0 && (
        <div>
          <div className='itemscontainer'>
            <InfiniteScroll
              dataLength={pets.length}
              hasMore={hasNextPage || isLoading}
              next={() => fetchNextPage()}
              scrollThreshold={0.5}
              loader={<p>Loading...</p>}
            >
              {map(pets, (pet) => (
                <PetsAllItems key={pet.id} pet={pet} />
              ))}
            </InfiniteScroll>
          </div>

          {hasNextPage && !isFetching ? (
            <Button onClick={() => fetchNextPage()}>Cargar más mascotas</Button>
          ) : undefined}

          {isFetching ? <CircularProgress /> : undefined}

          {!hasNextPage && pets.length !== 0 ? (
            <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
              Ya tienes todas las mascotas cargadas
            </Typography>
          ) : undefined}

          {pets.length === 0 && !isFetching ? (
            <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
              No hay mascotas {search ? 'con este filtro' : undefined}
            </Typography>
          ) : undefined}
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}