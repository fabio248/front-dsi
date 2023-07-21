import React, { useState, useEffect } from 'react';

// mui material y lodash se usa para mapear los datos
import { CircularProgress, Typography } from '@mui/material';
import { size, map } from 'lodash';

// decodificador de tokens
import { decoderToken } from '../../../utils';

// elementos renderizados
import { PetsItem } from '../PetsItem';

// peticiones al Back
import { Pets } from '../../../api/Pets.api';
import { ApiAuth } from '../../../api/Auth.api';

// estilos
import './ListeredPets.css';
import { useQuery } from '@tanstack/react-query';

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function ListeredPets() {
  const accessToken = apiAuthController.getAccessToken();
  const { identify } = decoderToken(accessToken);

  const { data = [] } = useQuery({
    queryKey: ['pets', { id: identify }],
    queryFn: async () => {
      const response = await petsController.getPetsForUsers(
        accessToken,
        identify
      );
      return response;
    },
  });

  if (!data.pets) return <CircularProgress />;

  if (size(data.pets) === 0) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        No se encontraron mascotas registradas, consulte al veterinario.
      </Typography>
    );
  }

  return (
    <div>
      {map(data.pets, (pet) => (
        <PetsItem key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
