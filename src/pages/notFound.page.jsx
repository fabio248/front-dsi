import {
  Box,
  Grid,
  Button,
  Typography,
  Divider,
  CardMedia,
} from '@mui/material';
import { Home } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // Establece la altura deseada, por ejemplo, el 100% del alto de la ventana
        p: 2,
        wrap: true,
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} sm={5}>
          <CardMedia
            component='img'
            height='500'
            image='/galeria/notFound.jpg'
            alt='notFound'
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography
            variant='h1'
            sx={{
              mb: 0,
              fontWeight: 'bold',
              color: '#573874',
              fontSize: '5rem',
              '@media (max-width: 600px)': {
                fontSize: '3.3rem', // Tamaño del texto para pantallas pequeñas (menos de 600px)
              },
              textAlign: 'center',
            }}
          >
            404 Not Found
          </Typography>
          <Divider
            sx={{
              '&.MuiDivider-root': {
                borderWidth: '4px',
                borderColor: '#573874',
              },
            }}
          />
          <Typography
            variant='h4'
            sx={{
              my: 4,
              color: '#8EC167',
              fontWeight: 'bold',
              textAlign: 'center',
              '@media (max-width: 600px)': {
                fontSize: '1.7rem', // Tamaño del texto para pantallas pequeñas (menos de 600px)
              },
            }}
          >
            ¿No encuentras a tu mascota?
          </Typography>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              mb: 2,
              '@media (max-width: 600px)': {
                fontSize: '1.4rem', // Tamaño del texto para pantallas pequeñas (menos de 600px)
              },
            }}
          >
            La página que estás buscando en este momento no se encuentra
            disponible.
          </Typography>
          <Grid
            fullWidth
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NavLink
              to='/'
              style={{
                textDecoration: 'none', // Quitar subrayado
                color: 'black', // Color de texto deseado
              }}
            >
              <Button
                variant='contained'
                startIcon={<Home sx={{ color: '#FFF' }} />}
                sx={{ my: 3 }}
              >
                Página de inicio
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
