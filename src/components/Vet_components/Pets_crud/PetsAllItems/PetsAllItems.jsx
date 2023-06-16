import React, { useState } from 'react';

//mui material
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Grid, IconButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

//Iconos de Mui material
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

//Modales compartidos
import { Modal_visualizarClient } from '../../../../shared';

//renderizado de los elementos
import { UserAndPetsListered } from '../../Users_crud';

//formatos para fechas
import { format } from 'date-fns';

export function PetsAllItems({ pet }) {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  
  let newBirthday;
  newBirthday = pet.birthday.split('T')[0];
  const [year, month, day ] = newBirthday.split('-');
  newBirthday = `${day}/${month}/${year}`;

  //seteo del titulo del modal de visualizar
  const [showVisualizar, setShowVisualizar] = useState(false);
  const [titleSeeInfoClientAndPet, setTitleSeeInfoClientAndPet] = useState('');

  //funciones que cambia el estado
  const onOpenInfoClientAndPets = () =>
    setShowVisualizar((prevState) => !prevState);

  //ejecuta la funcion de visualizacion de informacion de cliente y su mascota (VisibilityIcon)
  const openInfoClientAndPets = () => {
    setTitleSeeInfoClientAndPet(
      `Visualizando Datos del cliente con sus mascotas `
    );
    onOpenInfoClientAndPets();
  };
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
              <b>¿Tatuajes o marcas?: </b>
              {pet.isHaveTatto == true ? 'Si posee' : 'No posee'}
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
              {pet.pedigree == false ? 'No posee' : 'Si posee'}
              <br />
            </div>
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
              <IconButton color='warning' onClick={() => console.log('')}>
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='error' onClick={() => console.log('')}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <PetsIcon color='action' style={{ width: '60px', height: '40px' }} />
        </Divider>
      </Demo>
      <Modal_visualizarClient
        show={showVisualizar}
        close={onOpenInfoClientAndPets}
        title={titleSeeInfoClientAndPet}
        dataUser={pet.user}
      >
        <UserAndPetsListered
          close={onOpenInfoClientAndPets}
          idUser={pet.user.id}
        />
      </Modal_visualizarClient>
    </div>
  );
}
