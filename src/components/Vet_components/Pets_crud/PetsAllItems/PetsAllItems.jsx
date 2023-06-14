import React from 'react';

//mui material
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

//formatos para fechas
import { format } from 'date-fns';

export function PetsAllItems({ pet, dataUser }) {
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
            <p
              className='estilos-pets'
              style={{ justifyContent: 'space-around' }}
            >
              <b>Nombre de la mascota: </b>
              {pet.name}
              <br />
              <b>Raza: </b>
              {pet.raza}
              <br />
              <b>Genero: </b>
              {pet.gender}
              <br />
              <b>¿Tatuajes o marcas?: </b>
              {pet.isHaveTatto == true ? 'No posee' : 'Si posee'}
              <br />

              <b>Posee Todas sus vacunas?: </b>
              {pet.medicalHistory.isHaveAllVaccine == true
                ? 'No posee'
                : 'Si posee'}
              <br />
              <b>Nacimiento de la mascota U adquisición: </b>
              {newBirthday}

              <br />
              <b>Color del pelaje: </b>
              {pet.color}
              <br />
              <b>¿Pedigrí?: </b>
              {pet.pedigree == true ? 'No posee' : 'Si posee'}
              <br />
              <p style={{ textAlign: 'center' }}>
                <Divider>
                  <b>Historial Médico</b>
                </Divider>
              </p>
              <br />
              <b>Cantidad Alimenticia: </b>
              {pet.medicalHistory.food.quantity}
              {/* <b>{user.dui ? 'DUI: ' : ''}</b> */}
              {/* {user.dui ? user.dui : ''} */}
              <br />
              {/* <b>{user.birthday ? 'Fecha de nacimiento: ' : ''}</b> */}
              {/* {user.birthday ? newBirthday : ''} */}
              <br />
              {/* <b>{user.phone ? 'Teléfono: ' : ''}</b> */}
              {/* {user.phone ? user.phone : ''} */}
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
