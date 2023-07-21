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
import { useQuery } from '@tanstack/react-query';

// estilos

const apiAuthController = new ApiAuth();
const apiCitaController = new ApiCitas();

export function ListeredAppointByEmail() {
  const accessToken = apiAuthController.getAccessToken();

  const { userEmail } = decoderToken(accessToken);

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments', { email: userEmail }],
    queryFn: async () =>
      await apiCitaController.AppoinmentsByEmail(accessToken, userEmail),
  });

  if (isLoading) return <CircularProgress />;

  if (size(appointments) === 0) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        No se encontraron eventos Agendados, consulte al veterinario.
      </Typography>
    );
  }

  return (
    <div>
      {map(appointments, (appointments) => (
        <AppoinmentsItems key={appointments.id} event={appointments} />
      ))}
    </div>
  );
}
