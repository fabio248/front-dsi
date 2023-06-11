import React from 'react';
import { Typography, Box } from '@mui/material';

//clase que renderiza las mascotas segun Id del usuario
import { ListeredPets } from '../../../components';

export function Mascotas_pages() {
  return (
    <div>
      <Box
        sx={{ textAlign: 'center', marginTop: '20px', borderBlockColor: 'red' }}
      >
        <Typography variant='h4' component='h1' color='primary'>
          ¡Bienvenido a Clínica Veterinaria MISTUM, la informacion de tu mascota
          se cargará pronto!
        </Typography>
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
          <ListeredPets />
        </div>
      </Box>
    </div>
  );
}
