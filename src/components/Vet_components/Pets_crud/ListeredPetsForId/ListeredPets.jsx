import React, { useState, useEffect } from 'react';

// mui material y lodash se usa para mapear los datos
import { CircularProgress, Typography } from '@mui/material';
import { size, map } from 'lodash';

// decodificador de tokens
import { decoderToken } from '../../../../utils';

// elementos renderizados
import { PetsItem } from '../PetsItem';

// peticiones al Back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

// estilos
import './ListeredPets.css';

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function ListeredPets() {
  const [userAnPet, setUserAndPet] = useState(false);
  const [dataUser, setDataUser] = useState(false);

  useEffect(() => {
    (async () => {
      const dataAccess = apiAuthController.getAccessToken();

      const { identify } = decoderToken(dataAccess);

      const response = await petsController.getPetsForUsers(
        dataAccess,
        identify
      );
      setUserAndPet(response.data.pet);
      setDataUser(response.data);
    })();
  }, []);

  if (!userAnPet) return <CircularProgress />;

  if (size(userAnPet) === 0) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        No se encontraron mascotas registradas, consulte al veterinario.
      </Typography>
    );
  }

  return (
    <div>
      {map(userAnPet, (pets) => (
        <PetsItem key={pets.id} pet={pets} dataUser={dataUser} />
      ))}
    </div>
  );
}
