import React, {useCallback, useEffect, useState} from 'react';

// Esquemas de validaciones y manipulación de datos
import { useFormik } from 'formik';
import {
  initialValues,
  typesAppointments,
  validationSchemaRegister,
} from './AgendarCitaValidation';

// Backend petitions
import { ApiCitas } from '../../../api/Appointment.api';
import { ApiAuth } from '../../../api/Auth.api';

// MUI Material
import {Grid, TextField, Button, Divider, Box, CircularProgress, Container, Typography} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormHelperText } from '@mui/material';

// Componentes y funciones personalizadas
import { Alerta } from '../../../shared/Alert';

// Estilos
import './AgendarCita.css';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {UserApi} from "../../../api/User.api.jsx";

const appointmentController = new ApiCitas();
const authController = new ApiAuth();
const userController = new UserApi()

//Error personalizado
const googleErrorMessage =
  'Inicia sesión con Google para poder crear evento en Google Calendar';

const AgendarCita = () => {
  const accessToken = authController.getAccessToken();
  const providerToken = authController.getProviderToken()
  const [eventError, setEventError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [appointmentId, setAppointmentId] = useState(null)
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();


  const createAppointment = useMutation({
    mutationFn: async (formValue) => {
      const data = await appointmentController.registerAppointment(
          accessToken,
          formValue
      )
      setAppointmentId(data.id)
      await appointmentController.createEventGoogleCalendar(formValue, providerToken);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['appointments']);
      setSuccess(true);
      formik.resetForm();
      setTimeout(() => {
        setSuccess(false);
      }, 6000);
  },
    onError: async (error) => {
        if(error.message === googleErrorMessage) {
            await appointmentController.deleteAppointment(accessToken, appointmentId)
            setEventError(error.message);
        }

        if (error.statusCode === 409) {
            setError('Ya existe cita en este horario');
        } else {
            setError(error.message);
        }
        setTimeout(() => {
            setError('');
            setEventError(false);
        }, 6000);
    }
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaRegister,
    validateOnChange: false,
    
    onSubmit: async (formValue) => {
        await createAppointment.mutate(formValue);
    },
  });

  const handleStartDateChange = (date) => {
    formik.setFieldValue('startDate', date);
    const endDate = new Date(date.getTime() + 45 * 60000); // Agregar 45 minutos en milisegundos
    formik.setFieldValue('endDate', endDate);
  };

  const handleEndDateChange = (date) => {
    formik.setFieldValue('endDate', date);
  };

  const getAllUsers = useCallback(
      async () => {
          setLoading(true)
        let page = 1;
        let allData = [];

        while (true) {
          const { data } = await userController.getAllUsers(accessToken ,page, null, 25);

          if (data.length <= 0) {
            break;
          }

          if (data) {
            allData = allData.concat(data);
          }

          page++
        }

        setAllUsers(allData);
        setLoading(false)
      }, []
  );

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <Container>
      <Box sx={{ px: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12} sm={12} md={12} >
                <Typography variant="h5">Agendar Cita</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  label='Inicio Dia/Mes/Año HH:mm'
                  name='startDate'
                  value={formik.values.startDate}
                  onChange={handleStartDateChange}
                  onBlur={formik.handleBlur}
                  slotProps={{
                      textField: {
                          size: 'small',
                          fullWidth: true,
                          error: formik.touched.startDate && !formik.values.endDate && Boolean(formik.errors.startDate),
                      }
                  }}
                  disablePast // Deshabilitar fechas anteriores al día de hoy
                  format='dd/MM/yyyy hh:mm a'
                />
                    {formik.touched.startDate && !formik.values.endDate && formik.errors.startDate && (
                        <FormHelperText error>{formik.errors.startDate}</FormHelperText>
                    )}
                </LocalizationProvider>
            </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      label='Finalización Dia/Mes/Año HH:mm'
                      name='endDate'
                      value={formik.values.endDate}
                      onChange={handleEndDateChange}
                      onBlur={formik.handleBlur}
                      slotProps={{
                          textField: {
                              size: 'small',
                              fullWidth: true,
                              error: formik.touched.endDate && !formik.values.endDate && Boolean(formik.errors.endDate),
                              onBlur:formik.handleBlur,
                          }
                      }}
                      disablePast // Deshabilitar fechas anteriores al día de hoy
                      showTodayButton // Mostrar botón para seleccionar la fecha actual
                      clearable // Permitir borrar la fecha seleccionada
                      format='dd/MM/yyyy hh:mm a'
                    />
                    {formik.touched.endDate && !formik.values.endDate && formik.errors.endDate && (
                      <FormHelperText error>{formik.errors.endDate}</FormHelperText>
                    )}
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Autocomplete
                name='name'
                label='Motivo de Consulta'
                size='small'
                onBlur={formik.handleBlur}
                options={typesAppointments}
                isOptionEqualToValue={(options, value) => (options.value === value.value)}
                onChange={(_, value) => {
                    formik.setFieldValue('name', value ?? null)
                    if (typesAppointments.map((type)=>type.value).includes(formik.values.description) || formik.values.description === '') {
                        formik.setFieldValue('description', value?.value ?? '')
                    }
                }}
                getOptionLabel={(option) => option.label}
                value={formik.values.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='name'
                    label='Motivo de Consulta'
                    InputProps={{
                      ...params.InputProps,
                    }}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    style={{ marginBottom: '20px', marginTop:'20px'}}
                    />
                )}
            />
            <TextField
                fullWidth
                style={{ marginBottom: '15px' }}
                name='description'
                label='Descripción'
                variant='outlined'
                multiline
                rows={3}
                size='small'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={formik.touched.description && formik.errors.description}
            />

          <Divider style={{ marginBottom: '15px' }}>Información del Cliente</Divider>

          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12}>
                <Autocomplete
                    name='emailClient'
                    label='Correo cliente'
                    size='small'
                    onBlur={formik.handleBlur}
                    options={allUsers.map((user)=> ({label: user.email, value: user.email, firstName: user.firstName, lastName: user.lastName}))}
                    isOptionEqualToValue={(options, value) => (options.value === value.value)}
                    onChange={(_, value) => {
                        formik.setFieldValue('emailClient', value ?? null)
                        formik.setFieldValue('firstName', value?.firstName ?? '')
                        formik.setFieldValue('lastName', value?.lastName ?? '')
                    }}
                    getOptionLabel={(option) => option.label}
                    value={formik.values.emailClient}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name='emailClient'
                            label='Correo cliente'
                            error={formik.touched.emailClient && Boolean(formik.errors.emailClient)}
                            helperText={formik.touched.emailClient && formik.errors.emailClient}
                            style={{ marginBottom: '20px', marginTop:'20px'}}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                disabled
                name='firstName'
                label='Nombres'
                variant='outlined'
                size='small'
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                disabled
                name='lastName'
                label='Apellidos'
                variant='outlined'
                size='small'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
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
            >
              {createAppointment.isLoading ? <CircularProgress /> :`Crear Evento en Google Calendar`}
            </Button>
          </Grid>
          {success && (
            <Alerta
              type={'success'}
              title={'Cita Registrada'}
              message={
                'Se ha registrado correctamente la cita y el evento en Google Calendar'
              }
              strong={`Verifica la cita`}
            />
          )}
          {error && (
            <Alerta
              type={'error'}
              title={'¡Ha ocurrido un problema!'}
              message={
                error === 'User not found'
                  ? 'No se encuentra registrado el correo de'
                  : error
              }
              strong={
                error === 'User not found'
                  ? `${formik.values.firstName} ${formik.values.lastName}`
                  : 'Selecciona otra hora'
              }
            />
          )}
          {eventError && (
            <Alerta
              type='warning'
              title='Evento de Google Calendar no creado!'
              message='error'
              strong={eventError}
            />
          )}
        </form>
      </Box>
    </Container>
  );
};

export { AgendarCita };
