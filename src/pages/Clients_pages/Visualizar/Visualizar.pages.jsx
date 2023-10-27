import React from 'react';

//mui material
import { Typography, Box } from '@mui/material';

//vista a renderizar
import { ListeredAppointByEmail } from '../../../components/Clients_componentes';

export function Visualizar_pages() {
  return (
    <div className='Pets-page'>
      <Typography
        className='pets-page_add'
        variant='h4'
        component='h1'
        color='primary'
      >
        ¡Bienvenido a Clínica Veterinaria MISTUN!
        <br />
        <b
          style={{
            fontFamily: 'arial ',
            fontSize: '25px',
            color: 'GrayText',
            marginTop: '12px',
          }}
        >
          Tus Registros de Citas se visualizarán pronto
        </b>
      </Typography>
      <div className='box-container'>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '20px',
            borderBlockColor: 'red',
          }}
        >
          <div
            className='pets-render'
            style={{
              margin: '16px',
              backgroundColor: '#f0f0f0',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <ListeredAppointByEmail />
          </div>
        </Box>
      </div>
    </div>
  );
}
