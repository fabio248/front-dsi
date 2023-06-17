import React, { useState, useEffect } from 'react';

// mui material y lodash se usa para mapear los datos
import { CircularProgress, Typography } from '@mui/material';
import { size, map } from 'lodash';

// decodificador de tokens
import { decoderToken } from '../../../utils';

// elementos renderizados
import { AppoinmentsItems } from '../AppoinmentsItem';

// peticiones al Back

import { ApiAuth } from '../../../api/Auth.api';
import { ApiCitas } from '../../../api/Appointment.api';

// estilos

const apiAuthController = new ApiAuth();
const apiCitaController = new ApiCitas();

export function ListeredAppointByEmail() {
  const [eventsOfuser, setEventsOfuser] = useState(false);

  useEffect(() => {
    (async () => {
      const dataAccess = apiAuthController.getAccessToken();

      const { user_id } = decoderToken(dataAccess);

      const events = await apiCitaController.AppoinmentsByEmail(
        dataAccess,
        user_id
      );

      setEventsOfuser(events.data);
    })();
  }, []);

  if (!eventsOfuser) return <CircularProgress />;

  if (size(eventsOfuser) === 0) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        No se encontraron eventos Agendados, consulte al veterinario.
      </Typography>
    );
  }

  return (
    <div>
      {map(eventsOfuser, (eventsOfuser) => (
        <AppoinmentsItems key={eventsOfuser.id} event={eventsOfuser} />
      ))}
    </div>
  );
}
