import React, { useState } from 'react';

// Esquemas de validaciones y manipulación de datos
import { useFormik } from 'formik';
import { initialValues, validationSchemaRegister } from './AgendarCitaValidation';

// Backend petitions
import { ApiCitas } from '../../../api/Appointment.api';
import { useAuth } from '../../../hooks';

// MUI Material
import { Grid, TextField, Button, Divider } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Estilos
import './AgendarCita.css';

const eventControl = new ApiCitas();

const AgendarCita = (props) => {
  const { close, onReload, event } = props;
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(event),
    validationSchema: validationSchemaRegister(event),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!event) {
          await authControl.registerEventForVet(formValue);
        } else {
          await eventControl.updateEvent(accessToken, event.id, formValue);
        }
        onReload();
        close();
      } catch (error) {
      }
    },
  });

  const handleDateChange = (date) => {
    formik.setFieldValue('startDate', date);
  };

  async function createCalendarEvent() {
    const { name, descripcion, startDate, firstName, lastName, email } = formik.values;

    // Calcular el fin de la cita (enddate)
    const startDateObj = new Date(startDate);
    const endDate = new Date(startDateObj.getTime() + 45 * 60000); // Agregar 45 minutos en milisegundos

    const event = {
      summary: name,
      sendNotifications: true,
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
      //attendees: [{ email: 'veterinariamistum2013@gmail.com' }, { email: email }],
      
      attendees: [{ email: 'claudiamariaa12@gmail.com' }, { email: email }],
      reminders: {
        /* useDefault: false,
        overrides: [
          { method: 'email', minutes: 120 },
          { method: 'popup', minutes: 30 },
        ],*/
        useDefault: true,
      },
    };

    try {
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
        method: 'POST',
        headers: {
          // Authorization: 'Bearer ' + session.provider_token,
          Authorization: 'Bearer ' + 'ya29.a0AWY7CklCqGAROhXlJYKXygMQx53XffuXJkU9D7paEmUQX31GdKXP0N3t2RMy07LqXqW4b_V9EuoPu1MemisyHPnmaq6yxzJQmdGeBlktydEry-Ny1bCUChGna76Ap_Xign0LRDsvVs1O-li4YmbMSfrksNYi4gaCgYKAecSARASFQG1tDrpV89vsPi16bOelt4tosUWIQ0165',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('¡Evento creado exitosamente!');
      } else {
        throw new Error('Error al crear el evento en Google Calendar');
      }
    } catch (error) {
      alert('Error al crear el evento');
    }
  }

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h3>Agendar Cita</h3>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label='Fecha Dia/Mes/Año HH:mm'
              name='startDate'
              value={formik.values.startDate}
              onChange={handleDateChange}
              onBlur={formik.handleBlur}
              slotProps={{ textField: { size: 'small', fullWidth: 'true' } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                />
              )}
              disablePast // Deshabilitar fechas anteriores al día de hoy
              showTodayButton // Mostrar botón para seleccionar la fecha actual
              clearable // Permitir borrar la fecha seleccionada
              format='dd/MM/yyyy HH:mm'
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
                name='email'
                label='Correo'
                variant='outlined'
                size='small'
                placeholder='ClientAccountGoogle@gmail.com'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
              onClick={createCalendarEvent}
            >
              Crear Evento en Google Calendar
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export { AgendarCita };
