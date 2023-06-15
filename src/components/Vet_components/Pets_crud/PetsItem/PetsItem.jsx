import React from 'react';

//mui material
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar } from '@mui/material';

import { format } from 'date-fns';

import PetsIcon from '@mui/icons-material/Pets';

export function PetsItem(props) {
  const { pet, dataUser } = props;

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const newDate = pet.birthday.split('T');
  const newBirthday = format(new Date(newDate[0]), 'dd/MM/yyyy');
  return (
    <div>
      {' '}
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60 }}>
              <PetsIcon sx={{ fontSize: 45 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <>
              <h2 style={{ color: 'Background' }}>
                Datos Generales de la mascota
              </h2>
            </>
            <p
              className='estilos-pets'
              style={{ justifyContent: 'space-around' }}
            >
              <b>Nombre de la mascota: </b>
              {pet.name}
              <br />
              <b>Genero: </b>
              {pet.gender}
              <br />
              <b>Nacimiento de la mascota: </b>
              {newBirthday}

              <br />
              {/* <b>{user.direction ? 'Direccion: ' : ''}</b> */}

              <b>Color del pelaje: </b>
              {pet.color}
              <br />
              <b>¿Tatuajes o marcas?: </b>
              {pet.isHaveTattoo == true ? 'No posee' : 'Si posee'}
            </p>
          </ListItemText>
        </ListItem>
        <Divider>
          <PetsIcon color='disabled' />
        </Divider>
      </Demo>
    </div>
  );
}
