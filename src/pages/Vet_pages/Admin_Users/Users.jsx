import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

import { ListUsers, UserForm } from '../../../components';
import { Modal_users } from '../../../shared';
import './Users.css';

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

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

      <div className='box-container'>
        <Box sx={{ width: '100%' }}>
          {/* renderizando a los usuarios */}
          <ListUsers reload={reload} onReload={onReload} />
        </Box>
      </div>
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
