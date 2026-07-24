import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

/**
 * Botón "Regresar" para las páginas de detalle.
 *
 * Antes esta acción vivía en `<Header />`, un AppBar propio de cada página de
 * detalle. Al montarlas dentro de `Vet_Layouts` esa barra quedaba duplicada
 * sobre la del layout, así que la navegación hacia atrás se queda como un botón
 * dentro del contenido y el resto del chrome (barra superior y sidebar) lo pone
 * el layout, igual que en el dashboard.
 */
export function BackButton({ label = 'Regresar', ...props }) {
  const navigate = useNavigate();

  return (
    <Button
      variant='contained'
      color='success'
      startIcon={<ArrowBackIcon />}
      style={{ color: 'white' }}
      onClick={() => navigate(-1)}
      {...props}
    >
      {label}
    </Button>
  );
}
