import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

// Datos iniciales y esquema de validación del formulario
import {
    ChangePassInitialData,
    ChangePasswordValidation
} from '../../components/Admin/Auth/ChangePasswordValidation';

// MUI MATERIAL COMPONENTS
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import { ArrowBackIos } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { 
  createTheme, 
  ThemeProvider 
} from '@mui/material/styles';

// Componentes y funciones personalizadas
import { Alerta } from '../../components/Users_componentes/Alert'

// API - Clase para autentificación
import { ApiAuth } from '../../api/Auth.api'

// API Object
const authController = new ApiAuth();

function Copyright(props) {
  return (
    <Typography 
        variant='body2'
        color='text.secondary'
        align='center' 
        {...props}>
        {'Copyright © '}
        <Link color='inherit' href=''>
            DSI Project
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export function ChangePassword() {
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Se rescata token de los paramteors de la URL
    const queryParams = new URLSearchParams(useLocation().search);
    const changePasswordToken = queryParams.get('token');

    //Limpia los campos 
    function cleanFields(){
        formik.setFieldValue('password', '');
        formik.setFieldValue('repeatPassword', '')
    }
  
    const formik = useFormik({
        initialValues: ChangePassInitialData(),
        validationSchema: ChangePasswordValidation(),
        validateOnChange: false, 
        onSubmit: async(formValue) => {

            try {
                setError('');
                
                // Ejecuta funcion asincrona con la peticion de cambio de contraseña al BackEnd
                await authController.changePassword(formValue, changePasswordToken);
                
                setSuccess(true);
                cleanFields();
            } catch (error) {
                setError(error.message);
            }
    }});

    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Grid container spacing = {4} sx = {{ mt: 0}}>
                <Grid item xs = {4}>
                    <Button 
                    fullWidth
                    startIcon={<ArrowBackIos />}
                    href='/login'
                    variant='text'>
                        REGRESAR
                    </Button>
                </Grid>
            </Grid>
          <Avatar sx={{ m: 1, bgcolor: '#009688' }}>
            <KeyIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Cambio de contraseña
          </Typography>
          <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Nueva contraseña'
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
                  id='repeatPassword'
                  autoComplete='new-password'
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                  helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                />
              </Grid>
            </Grid>
            <Grid container spacing = {4} sx = {{ mt: 0}}>
                <Grid item xs = {6}>
                    <Button
                    fullWidth
                        width='xs'
                        variant='contained'
                        color='error'
                        href='/login'
                        sx={{  }}>
                        Cancelar
                    </Button>
                </Grid>
                <Grid item xs = {6}>
                    <Button fullWidth type='submit' variant='contained'>
                        ENVIAR
                    </Button>
                </Grid>
            </Grid>
            { success && formik.isValid && (
              <Alerta
                type = {'success'}
                title = {'¡Cambio exitoso!'}
                message = {'Se ha completado satisfactoriamente el cambio de contraseña'}
                strong = {'Puede iniciar sesión ahora.'}
              />
            )}
            {error && (
              <Alerta
                type = {'error'}
                title = {'¡Fallo envío!'}
                message = {'Ha ocurrido un problema con el token o ha expirado'}
                strong = {'Genera uno nuevo'}
              />
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}