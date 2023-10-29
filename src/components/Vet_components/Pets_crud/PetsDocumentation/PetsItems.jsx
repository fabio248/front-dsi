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
import DescriptionIcon from '@mui/icons-material/Description';

//Iconos de Mui material
import FlightIcon from '@mui/icons-material/Flight';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

//react router dom
import { NavLink } from 'react-router-dom';

//Modales compartidos
//import { Modal_create_pet, Modal_delete, Alerta } from '../../../../shared';

//renderizado de los elementos
import { PetsForm } from '..';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

//controladores api
const petController = new Pets();
const authController = new ApiAuth();

export function PetsItems({ pet }) {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  //verificacion de error en la ejecución
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  //funciones que cambia el estado
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const onOpenClosePets = () => setShowUpdatePets((prevState) => !prevState);

  const queryClient = useQueryClient();
 

  return (
    <div>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#FFFFFF' }}>
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
              <b>Dueño: </b>
              {pet.user.firstName} {pet.user.lastName}
            
            </div>
          </ListItemText>
          <ListItemAvatar
            sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
          >
              <Grid item>
                <IconButton>
                  <FlightIcon sx={{ fontSize: 35, color: '#2E7D32'}} />
                </IconButton>
              </Grid>
            <Grid item>
              <IconButton>
                <VaccinesIcon sx={{ fontSize: 35, color: '#2E7D32'}} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <VolunteerActivismIcon sx={{ fontSize: 35, color: '#2E7D32'}} />
              </IconButton>
            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <DescriptionIcon color='action' style={{ width: '30px', height: '30px' }} />
        </Divider>
      </Demo>
    </div>
  );
}
