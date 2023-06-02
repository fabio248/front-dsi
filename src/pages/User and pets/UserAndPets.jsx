import React from 'react';
import Box from '@mui/material/Box';
import {
  Stepper,
  Container,
  Typography,
  Button,
  StepLabel,
  Step,
} from '@mui/material';

//Pantallas
import Cliente_Register from './Cliente.Register';
import Mascotas_register from './mascotas.register';

const steps = [
  'Registro de informacion del cliente',
  'Registro de informacion de la mascota',
];

export function UserAndPets() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //Funcion cambia las pantalla dependiendo del paso del proceso
  function mostrarPaginas(handleNext) {
    switch (activeStep) {
      case 0:
        return <Cliente_Register />;
        break;
      case 1:
        return <Mascotas_register />;
        break;
    }
  }
  return (
    <Container sx={{ mt: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography variant='h1' sx={{ mt: 2, mb: 1 }}>
            Solicitud lista para enviar!!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button href='/admin'>Enviar Solicitud</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {mostrarPaginas(handleNext)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              variant='contained'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} variant='contained'>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Container>
  );
}
