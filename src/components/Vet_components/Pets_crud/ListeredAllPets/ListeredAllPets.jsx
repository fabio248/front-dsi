import React, { useState, useEffect } from 'react';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { User } from '../../../../api/User.api';

//clases de renderizado
import { PetsAllItems } from '../PetsAllItems';

//mui material
import { CircularProgress, Typography } from '@mui/material';
import { size, map } from 'lodash';

//clase Pets
const petsController = new Pets();
const apiAuthController = new ApiAuth();
const userController = new User();

export function ListeredAllPets({ reload, onReload }) {
  const [pets, setPets] = useState(false);
  const [users, setUsers] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await apiAuthController.getAccessToken();

        const responsePets = await petsController.getAllPets(accessToken);
        const responseUser = await userController.getAllUsers(accessToken);
        setUsers(responseUser.data);
        setPets(responsePets.data);
      } catch (error) {}
    })();
  }, [onReload, reload]);

  if (!pets) return <CircularProgress />;

  if (size(pets) === 0) {
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
