import React from 'react';
import { Button, Icon, ImageList, IconButton, Avatar, Grid, Divider } from '@mui/material';
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



export function UserItem(props) {
  const { user } = props;

  const birthday = user.birthday.split('T');
  /*user.direction = 'Soyapanngo, San Salvador';
  user.dui = '06245178-9'
  user.phone = '77733402'*/
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
  }));

  return (
    <Demo>
      <ListItem sx = {{ display: 'flex', flexWrap: 'wrap'}}>
        <ListItemAvatar sx = {{ margin: '0 auto'}}>
          <Avatar sx={{ mx: 4,
              width: 60, 
              height: 60}}>
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
        <ListItemAvatar sx = {{ display: 'flex', flexDirection:'row', margin: '0 auto'}}>
          <Grid item>
            <IconButton
                color='info'
                onClick={() => console.log('Hola')}
              >
                <VisibilityIcon sx={{ fontSize: 30 }}/>
              </IconButton>
          </Grid>
          <Grid item>
              <IconButton
                color='warning'
                onClick={() => console.log('Hola')}
              >
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
          </Grid>
          <Grid item>
              <IconButton
                color='error'
                onClick={() => console.log('Hola')}
              >
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
          </Grid>
          <Grid item>
              <IconButton
                color='success'
                onClick={() => console.log('Hola')}
              >
                <PetsIcon sx={{ fontSize: 30 }} />
              </IconButton>
          </Grid>
            </ListItemAvatar>
      </ListItem>
      <Divider>
        <PetsIcon color = 'disabled'/>
        </Divider>
    </Demo>
  );
}
