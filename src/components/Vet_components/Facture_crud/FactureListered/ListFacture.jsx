import React, { useEffect } from 'react';

//import petitions of back
import { ApiAuth } from '../../../../api/Auth.api';

//clases de renderizado
import { FactureItem } from '../FactureItem';

//mui material
import {
  Typography,
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from '../../../../hooks';
import { useFacture } from '../../../../hooks/UseFacture';
import { SearchInput } from '../../../../shared/components/SearchInput';
import { useSearchParams } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
const authController = new ApiAuth();

export function ListFacture() {
  const [query] = useSearchParams();
  const search = query.get('search');

  const accessToken = authController.getAccessToken();

  const deboncedQuery = useDebounce(search, 500);

  const {
    isLoading,
    facture,
    hasNextPage,
    fetchNextPage,
    isFetching,
    refetch,
   
  } = useFacture({
    accessToken,
    // search: deboncedQuery,
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
              <Tab
                icon={<DescriptionIcon />}
                label='Facturas'
                {...a11yProps(0)}
              />
            </Tabs>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Espacio flexible */}
          </Grid>
          {/* <Grid item>
            <SearchInput isFetching={isFetching} />
          </Grid> */}
        </Grid>
      </Box>
      <br />
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
          dataLength={facture.length}
          hasMore={hasNextPage || isLoading}
          next={() => fetchNextPage()}
          scrollThreshold={0.5}
        >
          {map(facture, (facture) => (
            <FactureItem key={facture.id} billId={facture.id} facture={facture} />
          ))}
        </InfiniteScroll>
      </div>

      {hasNextPage && !isFetching ? (
        <Button onClick={() => fetchNextPage()}>Cargar más Facturas</Button>
      ) : undefined}

      {isFetching ? <CircularProgress /> : undefined}

      {!hasNextPage && (facture.length !== 0) ? (
        <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
          Ya tienes todas las facturas cargados
        </Typography>
      ) : undefined}

      {facture.length === 0 && !isFetching ? (
        <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
          No hay facturas {search ? 'con este filtro' : undefined}
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
