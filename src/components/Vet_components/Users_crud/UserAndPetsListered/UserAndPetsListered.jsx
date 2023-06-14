import React, { useEffect, useState } from 'react';

// mui material y lodash se usa para mapear los datos
import { CircularProgress, Typography } from '@mui/material';
import { size, map } from 'lodash';

// elementos renderizados
import { UserAndPetItem } from '../UserAndPetItem';

// peticiones al Back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function UserAndPetsListered({ idUser, dataUser }) {
  const [userAnPet, setUserAndPet] = useState(false);

  useEffect(() => {
    (async () => {
      const dataAccess = apiAuthController.getAccessToken();

      const response = await petsController.getPetsForUsers(dataAccess, idUser);
      setUserAndPet(response.data.pet);
    })();
  }, []);

  if (!userAnPet) return <CircularProgress />;

  if (size(userAnPet) === 0) {
    return (
      <Typography
        variant='h5'
        style={{ textAlign: 'center', marginTop: '65px' }}
      >
        ¡No se encontraron Clientes con mascotas registrados! :(
      </Typography>
    );
  }
  return (
    <div
      style={{
        minHeight: '250px',
        maxHeight: '670px',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
        msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
      }}
    >
      {map(userAnPet, (pets) => (
        <UserAndPetItem key={pets.id} pet={pets} dataUser={dataUser} />
      ))}
    </div>
  );
}
