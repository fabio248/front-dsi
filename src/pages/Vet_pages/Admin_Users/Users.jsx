import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

import { ListUsers, UserForm } from '../../../components';
import { Modal_users } from '../../../shared';
import './Users.css';

export function Users() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <div className='users-page'>
      <Button
        className='user-page_add'
        variant='contained'
        onClick={onOpenCloseModal}
      >
        Registrar Usuario
      </Button>

      <div className='box-container'>
        <Box sx={{ width: '100%', height: '100%' }}>
          {/* renderizando a los usuarios */}
          <ListUsers />
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
