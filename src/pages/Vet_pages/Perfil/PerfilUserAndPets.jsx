import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

// MUI Material
import {
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
//render of pets
import { PerfilPets } from './PerfilPets';

//Lodash for render info pets and user
import { size, map } from 'lodash';

// peticiones al Back
import { Pets } from '../../../api/Pets.api';
import { ApiAuth } from '../../../api/Auth.api';

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function PerfilUserAndPets() {
  let params = useParams();
  const [userAnPet, setUserAndPet] = useState(false);

  useEffect(() => {
    (async () => {
      const dataAccess = apiAuthController.getAccessToken();

      const response = await petsController.getPetsForUsers(
        dataAccess,
        params.userId
      );
      setUserAndPet(response);
    })();
  }, []);
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Veterinaria Mistum
          </Typography>
          <NavLink to={'/admin/users'}>
            <Button
              variant='contained'
              color='success'
              style={{ color: 'white' }}
            >
              Regresar
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <br />

      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={18} md={4} sx={{ height: '100%' }}>
            <Paper style={{ padding: '20px', fontSize: '18px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '5px',
                }}
              >
                Propietario
              </h1>
              <br />
              <b>Usuario: </b>
              {userAnPet.firstName} {userAnPet.lastName}
              <br />
              <br />
              <b>Correo: </b>
              {userAnPet.email}
              <br />
              <br />
              <b>Role: </b>
              {userAnPet.role}
              <br />
              <br />
              <b>{userAnPet.direction ? 'Direccion: ' : ''}</b>
              {userAnPet.direction ? userAnPet.direction : ''}
              <br />
              <br />
              <b>{userAnPet.dui ? 'DUI: ' : ''}</b>
              {userAnPet.dui ? userAnPet.dui : ''}
              <br />
              <br />
              <b>{userAnPet.birthday ? 'Fecha de nacimiento: ' : ''}</b>
              {userAnPet.birthday ? userAnPet.birthday : ''}
              <br />
              <br />
              <b>{userAnPet.phone ? 'Teléfono: ' : ''}</b>
              {userAnPet.phone ? userAnPet.phone : ''}
            </Paper>
          </Grid>
          <Grid item xs={17} md={8}>
            <Paper style={{ padding: '20px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '5px',
                }}
              >
                Mascotas
              </h1>
              {size(userAnPet.pets) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡No se encontraron mascotas registradas! :(
                  </Typography>
                </>
              ) : (
                ''
              )}
              <div
                style={{
                  minHeight: '250px',
                  maxHeight: '670px',
                  overflowY: 'scroll',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                  msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                }}
              >
                {map(userAnPet.pets, (pet) => (
                  <PerfilPets key={pet.id} pet={pet} />
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
