import React, { useState } from 'react';

// mui material elements
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar, Grid, IconButton } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import PetsIcon from '@mui/icons-material/Pets';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { createTheme, ThemeProvider } from '@mui/material';
import { size, map } from 'lodash';

const defaultTheme = createTheme();

export function PetMedicalHistorySurgicalIntervations({ intervation }) {
  //Modal informacion concreta
  const [showVisualizar, setShowVisualizar] = useState(false);
  const onOpenInfoClientAndPets = () =>
    setShowVisualizar((prevState) => !prevState);
    console.log(intervation);

  const [titleSeeInfoClientAndPet, setTitleSeeInfoClientAndPet] = useState('');

  //ejecuta la funcion de visualizacion de informacion de cliente y su mascota (VisibilityIcon)
  const openInfoClientAndPets = () => {
    setTitleSeeInfoClientAndPet(`Datos específicos de la mascota`);
    onOpenInfoClientAndPets();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
    <div>
      <ListItem
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Avatar sx={{ mx: 4, width: 50, height: 50, bgcolor: '#8EC167' }}>
          <LocalHospitalIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <ListItemText>
          <br />
          <b
            className='estilos-pets'
            style={{ justifyContent: 'space-around' }}
          >
            <b>Hoja clinica: </b>
            <span style={{ color: 'gray' }}>{intervation?.medicalHistoryId}</span>
            <br />
            <b>Nombre: </b>
            <span style={{ color: 'gray' }}>{intervation?.name}</span>
            <br />
            <b>Descripción: </b>
            <span style={{ color: 'gray' }}>{intervation?.description}</span>
            <br />
            <b>Día de intervención: </b>
            <span style={{ color: 'gray' }}>{intervation?.intervationDate}</span>
            <br />
          </b>
        </ListItemText>
        <ListItemAvatar sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <IconButton color='warning' >
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </Grid>
        </ListItemAvatar>
      </ListItem>
      <Divider>
        <PetsIcon color='disabled' />
      </Divider>
    </div>
    </ThemeProvider>
  );
}