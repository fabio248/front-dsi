import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
//mui material
import { Divider, Avatar } from '@mui/material';
import { Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PetsIcon from '@mui/icons-material/Pets';
import { createTheme, ThemeProvider } from '@mui/material';

//Iconos de Mui material
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

//react router dom
import { NavLink } from 'react-router-dom';

//Modales compartidos
import { Modal_create_pet, Modal_delete, Alerta } from '../../../../shared';

//renderizado de los elementos
// import { UserAndPetsListered } from '../../Users_crud';
import { PetsForm } from '../../Pets_crud';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

//controladores api
const petController = new Pets();
const authController = new ApiAuth();
const defaultTheme = createTheme();

export function PetsAllItems({ pet }) {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  //verificacion de error en la ejecución
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  //seteo del titulo del modal de eliminar
  const [titleDelete, setTitleDelete] = useState('');

  //seteo del titulo del modal de visualizar
  const [titleUpdatePet, setTitleUpdatePet] = useState('');

  //render elementos of update pet
  const [showUpdatePets, setShowUpdatePets] = useState(false);

  //funciones que cambia el estado
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const onOpenClosePets = () => setShowUpdatePets((prevState) => !prevState);

  const queryClient = useQueryClient();
  const deletePetMutation = useMutation({
    mutationFn: async () => {
      const accessToken = authController.getAccessToken();
      return await petController.deletePet(accessToken, pet.id);
    },
    onSuccess: async () => {
      setSuccess(true);
      onCloseConfirm();
      setTimeout(() => {
        queryClient.invalidateQueries(['pets']);
      }, 3000);
    },
    onError: () => {
      setError(true);
    },
  });

  //funcion que ejecuta el boton correspondiente (Delete TrashIcon)
  const openDeletePet = () => {
    setTitleDelete(` Eliminar Mascota: ${pet.name}`);
    setConfirmMessage(`¿Está seguro de que desea eliminar mascota?`);
    onCloseConfirm();
  };

  //ejecuta la peticion de eliminacion de mascota
  const onDeletePet = async () => {
    deletePetMutation.mutate();
  };

  const openUpdatePets = () => {
    setTitleUpdatePet(`Actualizando datos de la Mascota: ${pet.name}`);
    onOpenClosePets();
  };
  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#8EC167' }}>
              <PetsIcon sx={{ fontSize: 45 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <div
              className='estilos-pets'
              style={{ justifyContent: 'space-around' }}
            >
              <br />
              <b>Nombre de la mascota: </b>
              {pet.name}
              <br />
              <b>Especie: </b>
              {pet.specie.name}
              <br />
              <b>Raza: </b>
              {pet.raza}
              <br />
              <b>Género: </b>
              {pet.gender}
              <br />
              <b>Nacimiento de la mascota o Adquisición: </b>
              {pet.birthday}
              <br />
              <b>Color del pelaje: </b>
              {pet.color}
              <br />
              <b>Dueño: </b>
              {pet.user.firstName} {pet.user.lastName}
            </div>
          </ListItemText>
          <ListItemAvatar
            sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
          >
            <NavLink to={`/admin/pets/${pet.id}`}>
              <Grid item>
                <IconButton color='info'>
                  <VisibilityIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Grid>
            </NavLink>
            <Grid item>
              <IconButton color='warning' onClick={openUpdatePets}>
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='error' onClick={openDeletePet}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
              {success && (
                <Alerta
                  type={'info'}
                  title={'¡Mascota Eliminada!'}
                  message={'Se ha eliminado correctamente la mascota'}
                  strong={pet.name}
                />
              )}
              {error && (
                <Alerta
                  type={'error'}
                  title={'¡Ha ocurrido un problema!'}
                  message={'No se ha podido eliminar la mascota'}
                  strong={pet.name}
                />
              )}
            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <PetsIcon color='action' style={{ width: '60px', height: '40px' }} />
        </Divider>
      </Demo>
      </ThemeProvider>
      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeletePet}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>
      <Modal_create_pet
        show={showUpdatePets}
        close={onOpenClosePets}
        title={titleUpdatePet}
      >
        <PetsForm close={onOpenClosePets} pet={pet} />
      </Modal_create_pet>
    </>
  );
}
