import * as React from 'react';
import { useState }from 'react';

// MUI MATERIAL COMPONENTS
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

// Alertas para validaciones ( Éxito, Fracaso, Advertencia o Infomración)
export function Alerta ({ type = 'warning', message = 'This is an alert', title = 'WARNING',  strong = 'Check it out'}) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', textAlign: 'left' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            <AlertTitle>{title}</AlertTitle>
            {message} — <strong>{strong}</strong>
        </Alert>
      </Snackbar>
    </Stack>
  );
}