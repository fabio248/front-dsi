import React, { useState, useEffect } from 'react';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { User } from '../../../../api/User.api';

//clases de renderizado
import { PetsAllItems } from '../PetsAllItems';
import SearchIcon from '@mui/icons-material/Search';
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
import { size, map } from 'lodash';
import PetsIcon from '@mui/icons-material/Pets';

//clase Pets
const petsController = new Pets();
const apiAuthController = new ApiAuth();
const userController = new User();

export function ListeredAllPets({ reload, onReload }) {
  const [pets, setPets] = useState(false);
  const [users, setUsers] = useState(false);
  const [value, setValue] = useState(0);

  //guarda el resultado de la busqueda y lo filtra
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event, newValue) => setValue(newValue);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await apiAuthController.getAccessToken();

        const responsePets = await petsController.getAllPets(accessToken);
        const responseUser = await userController.getAllUsers(accessToken);

        setUsers(responseUser);
        setPets(responsePets);
      } catch (error) {}
    })();
  }, [onReload, reload]);

  //funcion del target de busqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!pets) return <CircularProgress />;

  //filtro de busqueda para las mascotas
  // en base a estos elementos realiza el filtro
  const filteredData = pets.filter((pet) => {
    const fullName = `${pet.name}`.toLowerCase();
    const specie = pet.specie.name.toLowerCase();
    const raza = pet.raza.toLowerCase();
    const gender = pet.gender.toLowerCase();
    const birthday = pet.birthday.toLowerCase();
    const color = pet.color.toLowerCase();

    return [fullName, specie, raza, gender, birthday, color].some((field) =>
      field.includes(searchQuery.toLowerCase())
    );
  });

  //condicion del filtro
  const hasFilteredUsersAndPets = size(filteredData) > 0;

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
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
              value={searchQuery}
              onChange={handleSearchChange}
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
      <br />
      {hasFilteredUsersAndPets ? (
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
          {map(filteredData, (pet) => (
            <PetsAllItems key={pet.id} pet={pet} onReload={onReload} />
          ))}
        </div>
      ) : (
        <Typography variant='h6' style={{ textAlign: 'center' }}>
          ¡No Se Encontraron Mascotas registradas! :(
        </Typography>
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
