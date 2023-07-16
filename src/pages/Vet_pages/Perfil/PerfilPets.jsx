import React, { useState } from 'react';

// mui material elements
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar, Grid, IconButton } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

//Modal a renderizar informacion
import { Modal_verInfoClientAndPet } from '../../../shared';
import { HistoryAndAnneasis } from './HistoryAndAnneasis';

export function PerfilPets({ pet }) {
  //Modal informacion concreta
  const [showVisualizar, setShowVisualizar] = useState(false);
  const onOpenInfoClientAndPets = () =>
    setShowVisualizar((prevState) => !prevState);

  const [titleSeeInfoClientAndPet, setTitleSeeInfoClientAndPet] = useState('');

  //ejecuta la funcion de visualizacion de informacion de cliente y su mascota (VisibilityIcon)
  const openInfoClientAndPets = () => {
    setTitleSeeInfoClientAndPet(`Datos específicos de la mascota`);
    onOpenInfoClientAndPets();
  };

  return (
    <div>
      <ListItem
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Avatar sx={{ mx: 4, width: 50, height: 50 }}>
          <PetsIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <ListItemText>
          <br />
          <b
            className='estilos-pets'
            style={{ justifyContent: 'space-around' }}
          >
            <b>Nombre de la mascota: </b>
            <span style={{ color: 'gray' }}>{pet.name}</span>
            <br />
            <b>Especie: </b>
            <span style={{ color: 'gray' }}>{pet.specie.name}</span>
            <br />
            <b>Raza: </b>
            <span style={{ color: 'gray' }}>{pet.raza}</span>
            <br />
            <b>Género: </b>
            <span style={{ color: 'gray' }}>{pet.gender}</span>
            <br />
            <b>Nacimiento de la mascota U adquisición: </b>
            <span style={{ color: 'gray' }}>{pet.birthday}</span>
            <br />
          </b>
        </ListItemText>
        <ListItemAvatar>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <IconButton color='warning' onClick={openInfoClientAndPets}>
                <HistoryEduIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </Grid>
        </ListItemAvatar>
      </ListItem>
      <Divider>
        <PetsIcon color='disabled' />
      </Divider>
      <Modal_verInfoClientAndPet
        show={showVisualizar}
        close={onOpenInfoClientAndPets}
        title={titleSeeInfoClientAndPet}
      >
        <HistoryAndAnneasis pet={pet} />
      </Modal_verInfoClientAndPet>
    </div>
  );
}
