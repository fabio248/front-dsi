import React, { useState } from 'react';
import { Basic_modal } from '../../shared';
import { Box, Button } from '@mui/material';

export function UserAndPets() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <div className='userAndPets'>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Basic_modal
            onClose={onOpenCloseModal}
            show={showModal}
            title={'Crear Nuevo cliente y mascota'}
          >
            <h2>Formulario para registro de cliente y su mascota</h2>
          </Basic_modal>
        </Box>
      </div>
    </>
  );
}
