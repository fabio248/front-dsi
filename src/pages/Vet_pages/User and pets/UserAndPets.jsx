import React, { useState } from 'react';

//elementos compartidos
import { Basic_modal } from '../../../shared';

//Mui material
import { Box } from '@mui/material';

//importar vista de renderizado de las mascotas
import { ListeredAllPets } from '../../../components/Vet_components';

export function UserAndPets() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <div className='Vet-page'>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <div className='vet-page_add'>
            <Basic_modal
              onClose={onOpenCloseModal}
              show={showModal}
              title={'Crear nuevo cliente y mascota'}
            >
              <h2>Formulario para registro de cliente y su mascota</h2>
            </Basic_modal>
          </div>
        </Box>
        <div className='box-container'>
          <Box
            sx={{
              width: '100%',
              maxHeight: 'calc(100vh - 200px)',
              overflow: 'auto',
              scrollbarWidth: 'none', // Oculta el scrollbar en navegadores compatibles
              '&::-webkit-scrollbar': {
                display: 'none', // Oculta el scrollbar en navegadores basados en WebKit
              },
            }}
          >
            <ListeredAllPets />
          </Box>
        </div>
      </div>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
