import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// MUI Material
import {
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
//render of pets
import { PerfilPets } from './PerfilPets';

//Lodash for render info pets and user
import { size, map } from 'lodash';

// peticiones al Back
import { Pets } from '../../../api/Pets.api';
import { ApiAuth } from '../../../api/Auth.api';
import { useQuery } from '@tanstack/react-query';

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function PerfilUserAndPets() {
  let params = useParams();
  const navigate = useNavigate();
  const { data: userAndPet, isLoading } = useQuery({
    queryKey: ['users', params.userId],
    queryFn: async () => {
      const accessToken = apiAuthController.getAccessToken();
      const response = await petsController.getPetsForUsers(
        accessToken,
        params.userId
      );
      return response;
    },
  });

  return (
    <>
      <AppBar position='static' sx={{ m:-1, width: '101.2%' }}>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/admin')}
          >
            Clínica Veterinaria Mistun
          </Typography>

          <Button
            variant='contained'
            color='success'
            style={{ color: 'white' }}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
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
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <>
                  <b>Usuario: </b>
                  {userAndPet.firstName} {userAndPet.lastName}
                  <br />
                  <br />
                  <b>Correo: </b>
                  {userAndPet.email}
                  <br />
                  <br />
                  <b>Role: </b>
                  {userAndPet.role === 'client' ? 'Cliente' : 'Administrador'}
                  <br />
                  <br />
                  {userAndPet.direction ? (
                    <>
                      <b>Direccion: </b>
                      {userAndPet.direction}
                      <br />
                      <br />
                    </>
                  ) : null}
                  {userAndPet.dui ? (
                    <>
                      <b>DUI: </b>
                      {userAndPet.dui}
                      <br />
                      <br />
                    </>
                  ) : null}
                  {userAndPet.birthday ? (
                    <>
                      <b>Fecha de nacimiento: </b>
                      {userAndPet.birthday}
                      <br />
                      <br />
                    </>
                  ) : null}
                  {userAndPet.phone ? (
                    <>
                      <b>Teléfono: </b>
                      {userAndPet.phone}
                    </>
                  ) : null}
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={17} md={8}>
            <Paper
              style={{
                padding: '20px',
              }}
            >
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
              {!isLoading && size(userAndPet.pets) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{userAndPet.firstName} aún no tiene mascotas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {map(userAndPet.pets, (pet) => (
                    <PerfilPets key={pet.id} pet={pet} />
                  ))}
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
