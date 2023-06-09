import React, { useState } from 'react';
import {
  Button,
  Icon,
  ImageList,
  IconButton,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import './UserItem.css';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//Modal Update/Register
import { Modal_users, Modal_delete } from '../../../../shared';
import { UserForm } from '../UserForm';

export function UserItem(props) {
  const { user, onReload } = props;

  const birthday = user.birthday.split('T');
  // user.direction = 'Soyapanngo, San Salvador';
  // user.dui = '06245178-9';
  // user.phone = '77733402';
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar Usuario: ${user.firstName} ${user.lastName}`);
    onOpenCloseModal();
  };

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
              {user.birthday ? birthday[0] : ''}
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
              <IconButton color='error' onClick={''}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
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
        onConfirm={console.log('confirm delete')}
        content={confirmMessage}
        size='mini'
      ></Modal_delete>
    </>
  );
}
