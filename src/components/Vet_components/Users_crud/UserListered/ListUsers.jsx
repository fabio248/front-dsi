import React from 'react';
import { ApiAuth } from '../../../../api/Auth.api';
import { map } from 'lodash';
import { UserItem } from '../UserItem';
import {
  TextField,
  Typography,
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUser } from '../../../../hooks/UseUser';

const authController = new ApiAuth();

export function ListUsers() {
  const accessToken = authController.getAccessToken();

  const { isLoading, users, hasNextPage, fetchNextPage, isFetching } = useUser({
    accessToken,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!users) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        ¡No se encontraron clientes registrados!
      </Typography>
    );
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs aria-label='basic tabs example'>
              <Tab
                icon={<PeopleOutlineIcon />}
                label='Usuarios'
                id={`simple-tab-0`}
              />
            </Tabs>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Espacio flexible */}
          </Grid>
          <Grid item>
            <TextField
              style={{
                width: '500px',
                alignItems: 'left',
                borderWidth: '2px',
                borderRadius: '1px',
                borderColor: 'antiquewhite',
              }}
              label='Buscar...'
              placeholder='Introduce cualquier dato del cliente...'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
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
          dataLength={users.length}
          hasMore={hasNextPage || isLoading}
          next={() => fetchNextPage()}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Ya tienes todos los usuarios cargados</b>
            </p>
          }
          scrollThreshold={0.5}
        >
          {map(users, (user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </InfiniteScroll>
      </div>
      {hasNextPage & !isFetching ? (
        <Button onClick={() => fetchNextPage()}>Cargar más usuarios</Button>
      ) : undefined}
      {isFetching ? <CircularProgress /> : undefined}
    </div>
  );
}

function a11yProps() {
  return {
    id: `simple-tab-0`,
    'aria-controls': `simple-tabpanel-0`,
  };
}
