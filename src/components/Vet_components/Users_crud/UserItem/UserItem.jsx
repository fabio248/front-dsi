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

//style of format
import { format } from 'date-fns';

import './UserItem.css';

//Modal Update/Register/Delete
import { Modal_users, Modal_delete, Alerta } from '../../../../shared';
import { UserForm } from '../UserForm';

//import petitions of back
import { User } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';

const userController = new User();
const authController = new ApiAuth();

export function UserItem(props) {
  const { user, onReload } = props;

  const [error, setError] = useState('');

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [titleDelete, setTitleDelete] = useState('');

  const openUpdateUser = () => {
    setTitleModal(`Actualizar Usuario: ${user.firstName} ${user.lastName}`);
    onOpenCloseModal();
  };

  const openDeleteUser = () => {
    setTitleDelete(`Eliminar usuario: ${user.firstName} ${user.lastName}`);
    setConfirmMessage(`¿Esta seguro de que desea eliminar al usuario?`);
    onCloseConfirm();
  };

  const onDeleteUser = async () => {
    try {
      setError('');
      const accessToken = await authController.getAccessToken();
      await userController.deleteUser(accessToken, user.id);
      onReload();
      onCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  let newBirthday;
  if (user) {
    newBirthday = user.birthday.split('T');
    newBirthday = format(new Date(newBirthday[0]), 'MM/dd/yyyy');
  }

  return (
    <>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60 }}>
              <PersonIcon sx={{ fontSize: 45 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <p>
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
              <IconButton color='info' onClick={() => console.log('Hola')}>
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
              {error && (
                <Alerta
                  type={'Exito'}
                  title={'¡Usuario Eliminado!'}
                  message={'Ha ocurrido un problema al eliminar el usuario'}
                  strong={'Verificación completada'}
                />
              )}
            </Grid>
            <Grid item>
              <IconButton color='success' onClick={() => console.log('Hola')}>
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
    </>
  );
}
