import React, { useState } from 'react';

// Esquemas de validaciones y manipulación de datos
import { useFormik } from 'formik';
import { initialValues, validationSchemaRegister } from './AgendarCitaValidation';

// Backend petitions
import { ApiCitas } from '../../../api/Appointment.api';
import { ApiAuth } from '../../../api/Auth.api';

// MUI Material
import { Grid, TextField, Button, Divider, Box } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormHelperText } from '@mui/material';
import { format } from 'date-fns'

// Componentes y funciones personalizadas
import { Alerta } from '../../../shared/Alert'

// Estilos
import './AgendarCita.css';
import { set } from 'lodash';

const appointmentcontroller = new ApiCitas();
const authController = new ApiAuth();

//Error personalizado
const googleErrorMessage = 'Inicia sesión con Google para poder crear evento en Google Calendar';

const AgendarCita = (props) => {
  const {close, onReload, event} = props;
  const [eventError, setEventError] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(event),
    validationSchema: validationSchemaRegister(event),
    validateOnChange: false,

    onSubmit: async (formValue) => {
      const accessToken = authController.getAccessToken();
      try {
        if (!event) {

          console.log(format(formValue.startDate, 'dd/MM/yyyy HH:mm'));
          await appointmentcontroller.registerAppointment(accessToken, formValue);
          await createCalendarEvent();
        }
        else {
          //UPDATE
        }
        setSuccess(true);
        formik.resetForm();
        setTimeout(() => {
          setSuccess(false);
        }, 6000);

      } catch (err) {
        err.message == googleErrorMessage ? setEventError(err.message) : setError(err.message);
        setTimeout(() => {
          setError('');
          setEventError('');
        }, 6000);
      }
    },
  }
  );

  

  const handleDateChange = (date) => {
    formik.setFieldValue('startDate', date);
    const endDate = new Date(date.getTime() + 45 * 60000); // Agregar 45 minutos en milisegundos
    formik.setFieldValue('endDate', endDate);
  };

  async function createCalendarEvent() {
    const { name, descripcion, startDate, endDate, firstName, lastName, emailClient } = formik.values;
    
    const event = {
      summary: name,
      //sendNotifications: true,
      sendNotifications:{
        useDefault: true,
      },
      description: descripcion,
      location:
        'https://www.google.com/maps/place/Cl%C3%ADnica+Veterinaria+Mistun/@13.5110156,-88.8710632,17z/data=!3m1!4b1!4m6!3m5!1s0x8f7cadbe1e0ae625:0xf916477fc1f3c161!8m2!3d13.5110156!4d-88.8684883!16s%2Fg%2F11j09_yr57?entry=ttu',
      start: {
        dateTime: startDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [{ email: 'veterinariamistum2013@gmail.com' }, { email: emailClient }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 120 },
          { method: 'popup', minutes: 30 },
        ],
      
      },
    };

    try {
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
        method: 'POST',
        headers: {
          // Authorization: 'Bearer ' + session.provider_token,
          Authorization: 'Bearer ' + authController.getProviderToken(),
        },
        body: JSON.stringify(),
      });
      if (response.status !== 200)throw new Error('');
    } catch (error) {
      throw new Error('Inicia sesión con Google para poder crear evento en Google Calendar');
    }
  }

  return (
    <>
      <Box sx = {{ px: 4}}>
        <form onSubmit={formik.handleSubmit}>
          <h3>Agendar Cita</h3>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              label='Fecha Dia/Mes/Año HH:mm'
              name='startDate'
              value={formik.values.startDate}
              onChange={handleDateChange}
              onBlur={formik.handleBlur}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                />
              )}
              disablePast // Deshabilitar fechas anteriores al día de hoy
              showTodayButton // Mostrar botón para seleccionar la fecha actual
              clearable // Permitir borrar la fecha seleccionada
              format='dd/MM/yyyy hh:mm a'
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <FormHelperText error>{formik.errors.startDate}</FormHelperText>
            )}
          </LocalizationProvider>

          <TextField
            style={{ marginBottom: '20px', marginTop: '20px' }}
            fullWidth
            name='name'
            label='Nombre del Evento'
            variant='outlined'
            size='small'
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            style={{ marginBottom: '15px' }}
            name='descripcion'
            label='Descripción'
            variant='outlined'
            multiline
            rows={3}
            size='small'
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />

          <Divider style={{ marginBottom: '15px' }}>Cliente</Divider>

          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='firstName'
                label='Nombres'
                variant='outlined'
                size='small'
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='lastName'
                label='Apellidos'
                variant='outlined'
                size='small'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                name='emailClient'
                label='Correo'
                variant='outlined'
                size='small'
                placeholder='ClientAccountGoogle@gmail.com'
                value={formik.values.emailClient}
                onChange={formik.handleChange}
                error={formik.touched.emailClient && Boolean(formik.errors.emailClient)}
                helperText={formik.touched.emailClient && formik.errors.emailClient}
              />
            </Grid>
          </Grid>

          <br />
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <Button
              className='btn-citas'
              variant='contained'
              type='submit'
              //onClick={createCalendarEvent}
            >
              Crear Evento en Google Calendar
            </Button>

          </Grid>
          {success && (
            <Alerta
            type={'success'}
            title={'Cita Registrada'}
            message={'Se ha registrado correctamente la cita y el evento en Google Calendar'}
            strong={`Verifica la cita`}
            />
            )}
          {error && (
            <Alerta
            type={'error'}
            title={'¡Ha ocurrido un problema!'}
            message={
              error == 'User not found' 
              ? 'No se encuentra registrado el correo de'
              : error }
            strong={
              error == 'User not found' 
              ? `${formik.values.firstName} ${formik.values.lastName}`
              : 'Verifica tu información'}
          />
          )}
          {eventError && (
            <Alerta
            type={'warning'}
            title={'Evento de Google Calendar no creado!'}
            message={'Se ha registrado su cita pero no se ha podido agendar evento'}
            strong={ eventError }
          />
          )}
        </form>
      </Box>
    </>
  );
};

export { AgendarCita };


