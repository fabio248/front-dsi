import React from 'react';
import { Typography, Grid } from '@mui/material';

export function Auth_pages(props) {
  const { children } = props;

  return (
    <>
      <Typography
        className='Auth-page_add'
        variant='h4'
        component='h1'
        color='#69458C'
      >
        ¡Bienvenido a Clínica Veterinaria MISTUN!
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent='center'
        style={{ marginBottom: '20px', marginTop: '20px' }}
      >
        <Grid item xs={10} sm={4} >
          <img
            src='/galeria/favicon.png'
            alt='logo'
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>

      <Typography color='#8EC167' textAlign='center'>
        <h2>SALUD PARA TU MASCOTA</h2>
      </Typography>
      {children}
    </>
  );
}
