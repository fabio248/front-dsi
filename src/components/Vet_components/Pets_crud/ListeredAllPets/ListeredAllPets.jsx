import React from 'react';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

//clases de renderizado
import { PetsAllItems } from '../PetsAllItems';

//mui material
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';

import { map } from 'lodash';
import { useQuery } from '@tanstack/react-query';

//clase Pets
const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function ListeredAllPets({ reload, onReload }) {
  const accessToken = apiAuthController.getAccessToken();

  const { isLoading, data: pets } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => await petsController.getAllPets(accessToken),
  });

  if (isLoading) return <CircularProgress />;

  if (!pets) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        ¡No Se Encontraron Mascotas registradas! :(
      </Typography>
    );
  }
  return (
    <div
      style={{
        margin: '16px',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      {map(pets, (pet) => (
        <PetsAllItems key={pet.id} pet={pet} onReload={onReload} />
      ))}
    </div>
  );
}
