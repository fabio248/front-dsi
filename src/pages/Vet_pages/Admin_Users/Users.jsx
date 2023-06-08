import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Button, Box, Typography } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PropTypes from 'prop-types';
import { ListUsers, UserForm } from '../../../components';
import { Modal_users } from '../../../shared';
import './Users.css';

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);
  const handleChange = (event, newValue) => setValue(newValue);

  const handleRegistrarUsuario = () => {
    setIsLoading(true); // Activar el estado de carga
    // Simulación de una llamada asíncrona (puedes reemplazarlo con tu lógica real)
    setTimeout(() => {
      setIsLoading(false); // Desactivar el estado de carga
      onOpenCloseModal(); // Abrir o cerrar el modal después de la carga
    }, 250);
  };

  return (
    <div className='users-page'>
      <Button
        className='user-page_add'
        variant='contained'
        onClick={handleRegistrarUsuario} // Utilizar la función de carga
        disabled={isLoading} // Deshabilitar el botón durante la carga
      >
        {isLoading ? 'Cargando...' : 'Registrar Usuario'}
      </Button>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab
              icon={<PeopleOutlineIcon />}
              label='Usuarios'
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        {/* renderizando a los usuarios */}
        <ListUsers reload={reload} />
      </Box>

      {showModal && (
        <Modal_users
          show={showModal}
          close={onOpenCloseModal}
          title='Crear Nuevo Usuario'
        >
          <UserForm close={onOpenCloseModal} onReload={onReload} />
        </Modal_users>
      )}
    </div>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
