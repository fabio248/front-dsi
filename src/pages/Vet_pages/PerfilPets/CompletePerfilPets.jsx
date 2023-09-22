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
  const { data: pet, isLoading } = useQuery({
    queryKey: ['pets', params.petId],
    queryFn: async () => {
      const accessToken = apiAuthController.getAccessToken();
      const response = await petsController.getPetsForUsers(
        accessToken,
        params.petId
      );
      return response;
    },
  });

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/admin')}
          >
            Veterinaria Mistum
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
                Datos generales de la mascota
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
                  <b>Nombre: </b>
                  {pet.name}
                  <br />
                  <br />
                  <b>Género: </b>
                  {pet.gender}
                  <br />
                  <br />
                  <b>Raza: </b>
                  {usePet.raza}
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
                  {pet.birthday ? (
                    <>
                      <b>Fecha de nacimiento: </b>
                      {pet.birthday}
                      <br />
                      <br />
                    </>
                  ) : null}
                  {userAndPet.phone ? (
                    <>
                      <b>Teléfono:</b>
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
                Hojas clínicas
              </h1>
              {!isLoading && size(pet.medicalHistoryId) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
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
