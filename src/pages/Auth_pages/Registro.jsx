import { useState } from 'react';
import { useFormik } from 'formik';

// Datos iniciales y esquema de validación del formulario
import {
  RegisterFormvalidations,
  initialData,
} from '../../components/Admin/Auth/RegistroFormValidation';

// MUI MATERIAL COMPONENTS
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress, FormHelperText } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Componentes y funciones personalizadas
import { Alerta } from '../../shared/Alert';

// API - Clase para autentificación
import { ApiAuth } from '../../api/Auth.api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Copyright } from '../../shared/components/Copyright';

const authController = new ApiAuth();

export function Registro() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: async ({ formValue }) => {
      await authController.registerUser(formValue);
    },
    onSuccess: () => {
      setError('');
      setSuccess(true);
      formik.resetForm();
      setTimeout(() => {
        navigate('/login');
        setSuccess(false);
      }, 2000);
    },
    onError: (error) => {
      if (error.statusCode === 409) {
        setError('El correo eletrónico ya se encuentra registrado');
      } else {
        setError('No ha podido completar su registro');
      }
      setTimeout(() => {
        setError('');
      }, 6000);
    },
  });

  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: RegisterFormvalidations(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      createUserMutation.mutate({ formValue });
    },
  });

  const handleDateChange = (date) => {
    formik.setFieldValue('birthday', date);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <NavLink to='/'>
          <Avatar sx={{ m: 1, bgcolor: '#8EC167' }}>
            <PersonAddAltSharpIcon sx={{ color: '#FFF' }} />
          </Avatar>
        </NavLink>
        <Typography component='h1' variant='h5'>
          Registrarme
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete='given-name'
                name='firstName'
                fullWidth
                id='firstName'
                label='Nombre'
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Apellido'
                name='lastName'
                autoComplete='family-name'
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Fecha de Nacimiento'
                  name='birthday'
                  value={formik.values.birthday}
                  onChange={handleDateChange}
                  onBlur={formik.handleBlur}
                  slotProps={{ textField: { fullWidth: true } }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.birthday &&
                        Boolean(formik.errors.birthday)
                      }
                    />
                  )}
                  disableFuture // Deshabilitar fechas posteriores al día de hoy
                  showTodayButton // Mostrar botón para seleccionar la fecha actual
                  clearable // Permitir borrar la fecha seleccionada
                  format='dd/MM/yyyy'
                />
                {formik.touched.birthday && formik.errors.birthday && (
                  <FormHelperText error>
                    {formik.errors.birthday}
                  </FormHelperText>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Correo electrónico'
                name='email'
                autoComplete='email'
                value={formik.values.email}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault(); 
                }}}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Contraseña'
                type='password'
                id='password'
                autoComplete='new-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='repeatPassword'
                label='Repite la contraseña'
                type='password'
                id='repeatPassword'
                autoComplete='new-password'
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.repeatPassword &&
                  Boolean(formik.errors.repeatPassword)
                }
                helperText={
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                }
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={createUserMutation.isLoading ? true : false}
          >
            {createUserMutation.isLoading ? (
              <CircularProgress />
            ) : (
              'Registrarme'
            )}
          </Button>
          {success && (
            <Alerta
              type={'success'}
              title={'¡Registro exitoso!'}
              message={
                'Se ha completado satisfactoriamente el registro de su usuario'
              }
              strong={'Puede iniciar sesión ahora.'}
            />
          )}
          {error && (
            <Alerta
              type={'error'}
              title={'¡Ha ocurrido un problema!'}
              message={error}
              strong={'Verifica tu información.'}
            />
          )}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
