import { useState } from 'react';
import { useFormik } from 'formik';

// Datos iniciales y esquema de validación del formulario
import {
  RegisterFormvalidations, 
  initialData
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
import { FormHelperText } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { 
  createTheme, 
  ThemeProvider 
} from '@mui/material/styles';

// Componentes y funciones personalizadas
import { Alerta } from '../../shared/Alert'

// API - Clase para autentificación
import {ApiAuth} from '../../api/Auth.api'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        DSI Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
const authController = new ApiAuth();

export function Registro() {
    
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  
  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: RegisterFormvalidations(),
    validateOnChange: false, 
    onSubmit: async(formValue) => {      
      try {
        setError('');
        
        // Ejecuta funcion asincrona con la peticion de registro al BackEnd
        await authController.registerUser(formValue);
        setSuccess(true);
        formik.resetForm();
        setTimeout(() => {
          setSuccess(false);
        }, 6000);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
              setError('');
            }, 6000);
        }
  }});
  
  const handleDateChange = (date) => {
    formik.setFieldValue('birthday', date);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: '#03a9f4' }}>
            <PersonAddAltSharpIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Registrarme
          </Typography>
          <Box 
            component='form'
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoComplete='given-name'
                  name='firstName'
                  fullWidth
                  id='firstName'
                  label ='Nombre'
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  onChange={formik.handleChange}
                />
              </Grid>
              {/*<Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker
                  onError={(newError) => setError(newError)}
                  slotProps={{
                    textField: {
                      helperText: formik.errors.fechaNacimiento,
                      fullWidth: true,
                      required: true
                    },
                  }}
                  label = 'Fecha de nacimiento'
                  name = 'fechaNacimiento'
                  id = 'fechaNacimiento'
                  value={dayjs.locale()}
                  onChange={handleDateChange}
                  onBlur={formik.handleBlur('fechaNacimiento')}
                />
                </DemoContainer>
                </LocalizationProvider>
                </Grid>*/}
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
                          formik.touched.birthday && Boolean(formik.errors.birthday)
                        }
                      />
                    )}
                    disableFuture // Deshabilitar fechas posteriores al día de hoy
                    showTodayButton // Mostrar botón para seleccionar la fecha actual
                    clearable // Permitir borrar la fecha seleccionada
                    format='dd/MM/yyyy'
                  />
                  {formik.touched.birthday && formik.errors.birthday && (
                    <FormHelperText error>{formik.errors.birthday}</FormHelperText>
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
                  error={formik.touched.password && Boolean(formik.errors.password)}
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
                  id="repeatPassword"
                  autoComplete='new-password'
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                  helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: '#009688', ':hover' : { bgcolor: '#00897b'}}}
            >
              Registrarme
            </Button>
            {success && (
              <Alerta
                type = {'success'}
                title = {'¡Registro exitoso!'}
                message = {'Se ha completado satisfactoriamente el registro de su usuario'}
                strong = {'Puede iniciar sesión ahora.'}
              />
            )}
            {error && (
              <Alerta
                type = {'error'}
                title = {'¡Ha ocurrido un problema!'}
                message = {error == 'Email already taken' ? 'El correo eletrónico ya se encuentra registrado' : 'No ha podido completar su registro'}
                strong = {'Verifica tu información.'}
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
    </ThemeProvider>
  );
}