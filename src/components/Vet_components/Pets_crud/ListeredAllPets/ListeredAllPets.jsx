import React from 'react';

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
} from '@mui/material';
import { map } from 'lodash';
import { useQuery } from '@tanstack/react-query';

//clase Pets
const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function ListeredAllPets() {
  const accessToken = apiAuthController.getAccessToken();

  const { isLoading, data: pets } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => await petsController.getAllPets(accessToken),
  });

  if (isLoading) return <CircularProgress />;

  if (!pets) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        ¡No Se Encontraron Mascotas registradas! :(
      </Typography>
    );
  }

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
              placeholder='Introduce cualquier dato de la mascota del cliente...'
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
        {map(pets, (pet) => (
          <PetsAllItems key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
