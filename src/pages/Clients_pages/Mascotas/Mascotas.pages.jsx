import React from 'react';
import { Typography, Box } from '@mui/material';
export function Mascotas_pages() {
  return (
    <div>
      <Box
        sx={{ textAlign: 'center', marginTop: '20px', borderBlockColor: 'red' }}
      >
        <Typography variant='h4' component='h1' color='primary'>
          ¡Bienvenido a Veterinaria Mistum, la informacion de tu mascota se
          cargará pronto!
        </Typography>
      </Box>
    </div>
  );
}
