import React from 'react';

//mui material
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar } from '@mui/material';

//format para las fechas
import { format } from 'date-fns';

import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export function AppoinmentsItems({ event }) {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  let startDat;
  startDat = event.startDate.split('T')[0];
  const [year, month, day] = startDat.split('-');
  startDat = `${day}/${month}/${year}`;

  let endDat;
  endDat = event.endDate.split('T')[0];
  const [year1, month1, day1] = endDat.split('-');
  endDat = `${day1}/${month1}/${year1}`;

  let startHour;
  startHour = event.startDate.split('T')[1];
  let [hour, minutes] = startHour.split(':');
  let formattedHour = (hour % 12 || 12).toString();
  let formattedTime = `${formattedHour}:${minutes} ${hour < 12 ? 'AM' : 'PM'}`;

  let endHour;
  endHour = event.endDate.split('T')[1];
  let [hour1, minutes1] = endHour.split(':');
  let formattedEndHour = (hour1 % 12 || 12).toString();
  let formattedEndTime = `${formattedEndHour}:${minutes1} ${
    hour1 < 12 ? 'AM' : 'PM'
  }`;

  return (
    <div>
      {' '}
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60 }}>
              <CalendarMonthIcon sx={{ fontSize: 45 }} />
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
              <b>Invitado a la cita: </b>
              {event.client.firstName} {event.client.lastName}
              <br />
              <b>Correo Electrónico: </b>
              {event.client.email}
              <br />
              <br />
              <div
                style={{
                  borderBottom: '3px solid grey',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span>Datos de su Cita</span>
              </div>
              <br />
              <b>Nombre de la cita agendada: </b>
              {event.name}
              <br />
              <b>Descripción de su cita: </b>
              {event.description}
              <br />
              <b>Fecha y hora en la que dio inicio su cita: </b>
              {startDat} a las {formattedTime}
              <br />
              <b>Fecha y hora en la que finalizó su cita: </b>
              {endDat} a las {formattedEndTime}
            </p>
          </ListItemText>
        </ListItem>
        <Divider>
          <TodayIcon color='disabled' />
        </Divider>
      </Demo>
    </div>
  );
}
