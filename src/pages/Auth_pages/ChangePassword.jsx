import { useState } from 'react';
import { useFormik } from 'formik';
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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { 
  createTheme, 
  ThemeProvider 
} from '@mui/material/styles';
import { Alerta } from '../../components/Users_componentes/Alert'

// API - GOOGLE
import {ApiAuth} from '../../api/Auth.api'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        DSI Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
const authController = new ApiAuth();

export function ChangePassword() {
    
  const [error, setError] = useState("");

  
  const formik = useFormik({
    initialValues: ChangePassInitialData(),
    validationSchema: ChangePasswordValidation(),
    validateOnChange: false, 
    onSubmit: async(formValue) => {

        try {
          setError('');
          console.log(formValue);
        } catch (error) {
            setError(error.message);
        }
  }});
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: '#009688' }}>
            <KeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambio de contraseña
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Nueva contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
                  name="repeatPassword"
                  label="Repite la contraseña"
                  type="password"
                  id="repeatPassword"
                  autoComplete="new-password"
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
            {!error && formik.isValid && (
              <Alerta
                type = {"success"}
                title = {"¡Cambio exitoso!"}
                message = {"Se ha completado satisfactoriamente el cambio de contraseña"}
                strong = {"Puede iniciar sesión ahora."}
              />
            )}
            {error && (
              <Alerta
                type = {"error"}
                title = {"¡Fallo envío!"}
                message = {"El token ha expirado"}
                strong = {"Genera uno nuevo"}
              />
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}