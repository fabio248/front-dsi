import React, { useState } from 'react';

//elementos compartidos
import { Basic_modal } from '../../../shared';

//Mui material
import { Box, Tabs, Tab } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

//importar vista de renderizado de las mascotas
import { ListeredAllPets } from '../../../components/Vet_components';

export function UserAndPets() {
  // const { reload, onReload } = props;
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <>
      <div className='Vet-page'>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <div className='vet-page_add'>
            <Basic_modal
              onClose={onOpenCloseModal}
              show={showModal}
              title={'Crear Nuevo cliente y mascota'}
            >
              <h2>Formulario para registro de cliente y su mascota</h2>
            </Basic_modal>
          </div>
        </Box>
        <div className='box-container'>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab icon={<PetsIcon />} label='Mascotas' {...a11yProps(0)} />
              </Tabs>
            </Box>
            {/* renderizando a las mascotas */}

            <ListeredAllPets reload={reload} onReload={onReload} />
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
