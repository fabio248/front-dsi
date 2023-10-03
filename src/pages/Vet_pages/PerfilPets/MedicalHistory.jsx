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
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { createTheme, ThemeProvider } from '@mui/material';
import { size, map } from 'lodash';

const defaultTheme = createTheme();

export function PetMedicalHistory({ medicalHistory }) {
  //Modal informacion concreta
  const [showVisualizar, setShowVisualizar] = useState(false);
  const onOpenInfoClientAndPets = () =>
    setShowVisualizar((prevState) => !prevState);
    //console.log(medicalHistory.diagnostics);

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
          <HistoryEduIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <ListItemText>
          <br />
          <b
            className='estilos-pets'
            style={{ justifyContent: 'space-around' }}
          >
            <b>ID: </b>
            <span style={{ color: 'gray' }}>{medicalHistory.id}</span>
            <br />
            <b>Fecha de registro: </b>
            <span style={{ color: 'gray' }}>{medicalHistory.createdAt}</span>
            <br />
            <b>Diagnostico: </b>
            <span style={{ color: 'gray' }}>{medicalHistory?.diagnostic?.description}</span>
            <br />
            <b>Tratamiento: </b>
            <span style={{ color: 'gray' }}>
            { map(medicalHistory.diagnostic?.treatments, (medication) => (
                <ListItem key={medication.id} sx={{ m: 0, ml:2, p:0 }}>
                    <ListItemIcon>
                        <VaccinesIcon sx={{ color:'#8EC167' }} />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m:0, ml: -3, p:0 }}
                        primary={medication.name}
                        secondary={medication.frequency}
                    />
                </ListItem>
            ))}
            </span>
            <b>Intervención quirúrgica: </b>
            <span style={{ color: 'gray' }}>
            {!medicalHistory?.diagnostic?.surgicalIntervations ? 'No ha tenido' 
            : map(medicalHistory.diagnostic.surgicalIntervations, (surgicalIntervation) => (
                <ListItem key={surgicalIntervation.id} sx={{ m: 0, ml:2, p:0 }}>
                    <ListItemIcon>
                        <LocalHospitalIcon sx={{ color:'#8EC167' }} />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m:0, ml: -3, p:0 }}
                        primary={surgicalIntervation.name}
                        secondary={surgicalIntervation.intervationDate}
                    />
                </ListItem>
            ))
            }</span>
            <br />
          </b>
        </ListItemText>
        <ListItemAvatar>
          <Grid container justifyContent='flex-end'>
            <Grid item>
                <IconButton color='info'>
                  <VisibilityIcon sx={{ fontSize: 30 }} />
                </IconButton>
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
