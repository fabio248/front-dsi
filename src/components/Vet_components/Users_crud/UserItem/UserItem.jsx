import React, { useState } from 'react';
import { IconButton, Avatar, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material';

//style of format
import { format } from 'date-fns';
import './UserItem.css';

//Modal Update/Register/Delete/CreatePet
import {
  Modal_users,
  Modal_delete,
  Alerta,
  Modal_create_pet,
  Modal_verInfoClientAndPet,
} from '../../../../shared';

//objetos children que se renderizan dentro del modal
import { UserForm } from '../UserForm';
import { PetsForm } from '../../Pets_crud';
import { UserAndPetsListered } from '../UserAndPetsListered';

//import petitions of back
import { User } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { NavLink } from 'react-router-dom';

//controladores de las clases API
const userController = new User();
const authController = new ApiAuth();

export function UserItem(props) {
  //elementos enviados a UserItem en props
  const { user, onReload } = props;

  //verificacion de error en la ejecución
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  //useState que controla el estado del (abrir o cerrar) modal Update/Register
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  //seteo del titulo del modal de eliminar
  const [titleDelete, setTitleDelete] = useState('');

  //seteo del titulo del modal de visualizar
  const [showVisualizar, setShowVisualizar] = useState(false);
  const [titleSeeInfoClientAndPet, setTitleSeeInfoClientAndPet] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Create Pets
  const [showPets, setShowPets] = useState(false);
  const [titlePets, setTitlePets] = useState('');

  //funciones que cambia el estado
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const onOpenClosePets = () => setShowPets((prevState) => !prevState);
  const onOpenInfoClientAndPets = () =>
    setShowVisualizar((prevState) => !prevState);

  //funcion que ejecuta el boton correspondiente (Update pencilIcon)
  const openUpdateUser = () => {
    setTitleModal(`Actualizar Usuario: ${user.firstName} ${user.lastName}`);
    onOpenCloseModal();
  };

  //funcion que ejecuta el boton correspondiente (Create PetsIcon)
  const onCreatePetForUser = () => {
    setTitlePets('Crear Mascota para el cliente seleccionado.');
    onOpenClosePets();
  };

  //funcion que ejecuta el boton correspondiente (Delete TrashIcon)
  const openDeleteUser = () => {
    setTitleDelete(`Eliminar usuario: ${user.firstName} ${user.lastName}`);
    setConfirmMessage(`¿Esta seguro de que desea eliminar al usuario?`);
    onCloseConfirm();
  };

  //ejecuta la funcion de visualizacion de informacion de cliente y su mascota (VisibilityIcon)
  const openInfoClientAndPets = () => {
    setTitleSeeInfoClientAndPet(
      `Visualizando Datos del cliente con sus mascotas `
    );
    onOpenInfoClientAndPets();
  };

  //ejecuta la peticion de eliminacion de usuario
  const onDeleteUser = async () => {
    try {
      setError('');
      const accessToken = await authController.getAccessToken();
      await userController.deleteUser(accessToken, user.id);
      setSuccess(true);
      onCloseConfirm();
      setTimeout(() => {
        onReload();
      }, '3000');
    } catch (error) {
      console.error(error);
    }
  };

  let newBirthday;
  if (user) {
    newBirthday = user.birthday.split('T')[0];
    const [year, month, day] = newBirthday.split('-');
    newBirthday = `${day}/${month}/${year}`;
  }

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#8EC167'}}>
              <PersonIcon sx={{ fontSize: 45 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <p> 
              <NavLink to = {`/admin/users/${user.id}`}>
              <b>Perfil </b>
              </NavLink>
              <br />
              <b>Usuario: </b>
              {user.firstName} {user.lastName}
              <br />
              <b>Correo: </b>
              {user.email}
              <br />
              <b>Role: </b>
              {user.role}
              <br />
              <b>{user.direction ? 'Direccion: ' : ''}</b>
              {user.direction ? user.direction : ''}
              <br />
              <b>{user.dui ? 'DUI: ' : ''}</b>
              {user.dui ? user.dui : ''}
              <br />
              <b>{user.birthday ? 'Fecha de nacimiento: ' : ''}</b>
              {user.birthday ? newBirthday : ''}
              <br />
              <b>{user.phone ? 'Teléfono: ' : ''}</b>
              {user.phone ? user.phone : ''}
            </p>
          </ListItemText>
          <ListItemAvatar
            sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
          >
            <Grid item>
              <IconButton color='info' onClick={openInfoClientAndPets}>
                <VisibilityIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='warning' onClick={openUpdateUser}>
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='error' onClick={openDeleteUser}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
              {success && (
                <Alerta
                  type={'info'}
                  title={'¡Usuario Eliminado!'}
                  message={'Se ha elimnado correctamente usuario'}
                  strong={user.firstName + ' ' + user.lastName}
                />
              )}
              {error && (
                <Alerta
                  type={'error'}
                  title={'¡Ha ocurrido un problema!'}
                  message={'No se ha podido eliminar el usuario'}
                  strong={user.firstName + ' ' + user.lastName}
                />
              )}
            </Grid>
            <Grid item>
              <IconButton color='success' onClick={onCreatePetForUser}>
                <PetsIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <PetsIcon color='disabled' />
        </Divider>
      </Demo>
      <Modal_users show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </Modal_users>
      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeleteUser}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>
      <Modal_create_pet
        show={showPets}
        close={onOpenClosePets}
        title={titlePets}
      >
        <PetsForm close={onOpenClosePets} idUser = {user.id} />
      </Modal_create_pet>
      <Modal_verInfoClientAndPet
        show={showVisualizar}
        close={onOpenInfoClientAndPets}
        title={titleSeeInfoClientAndPet}
        dataUser={user}
      >
        <UserAndPetsListered
          close={onOpenInfoClientAndPets}
          idUser={user.id}
          dataUser={user}
        />
      </Modal_verInfoClientAndPet>
    </ThemeProvider>
  );
}
