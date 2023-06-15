import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// Datos iniciales y esquema de validación del formulario
import {
  LoginFormvalidations,
  initialData,
} from '../../components/Admin/Auth/LoginFormValidation';

// MUI MATERIAL COMPONENTS
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PetsIcon from '@mui/icons-material/Pets';
import { ArrowBackIos } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import { Google } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

// Componentes y funciones personalizadas
import { Alerta } from '../../shared/Alert';
import { ForgotPassword } from '../../components/Admin/Auth/ForgotPassword';
import { decoderToken } from '../../utils';
import { ENV } from '../../utils/';

// API - Clase para autentificación
import { ApiAuth } from '../../api/Auth.api';

// API - hook para validar sesión activa
import { useAuth } from '../../hooks';

// Google Authentication
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// API Object
const authLoginController = new ApiAuth();

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        DSI Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: LoginFormvalidations(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError('');

        // Ejecuta funcion asincrona con la peticion de logueo al BackEnd
        const response = await authLoginController.login(formValue);

        // Almacena los token en LocalStorage
        authLoginController.setAccessToken(response.accessToken);
        authLoginController.setRefreshToken(response.accessToken);

        // Guarda logueo en contexto de la aplicación
        await login(response.accessToken);

        // Se obtiene el rol del usuario
        const { role } = decoderToken(response.accessToken);

        // Redirige en base al rol del usuario logueado.
        navigate('/' + verifyRole(role));
      } catch (error) {
        setError('Error al enviar datos de registro');
      }
    },
  });

  // Verificación del rol ingresado
  function verifyRole(role) {
    if (role == 'admin') {
      return 'admin';
    } else {
      return 'client';
    }
  }

  // AUTENTIFICACIÓN CON GOOGLE
  const supabase = useSupabaseClient(); // Talk to supabase

  // CONECCIÓN CON LA API DE GOOGLE
  async function googleSingIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: ENV.BASE_SUPABASE,
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in to google provider with supabase');
      console.log(error);
    }
  }

  // RECUPERACIÓN DE LA SESIÓN DE GOOGLE Y ALMACENAMIENTO DE DATOS EN EL BACKEND
  useEffect(() => {
    async function signinGoogleVet() {
      await supabase.auth.getSession().then(async (value) => {
        // SI LA SESSION EXISTE
        if (value.data?.session) {
          setLoading(true);
          const session = value.data.session; // ALMACENA LA INFORMACIÓN DE LA SESIÓN
          const tokenData = decoderToken(session.access_token); // ALMACENA LA INFORMACIÓN DE TOKEN DE ACCESO
          const fullnameSplit = session.user.user_metadata.full_name
            .trim()
            .split(' ');
          var firstName, lastName;

          if (fullnameSplit.length > 2) {
            firstName = fullnameSplit.slice(0, 2).join(' ');
            lastName = fullnameSplit.slice(2).join(' ');
          } else {
            firstName = fullnameSplit[0];
            lastName = fullnameSplit[1];
          }
          // RECUPERACIÓN DE DATOS DE INTERÉS PARA LA APLICACIÓN
          const dataGoogle = {
            firstName: firstName,
            lastName: lastName,
            birthday: null,
            email: session.user.email,
            phone: session.user.phone,
            password: tokenData.sub,
            role: 'client',
          };
          try {
            // Ejecuta funcion asincrona con la peticion de logueo al BackEnd
            const response = await authLoginController.googleAuth(dataGoogle);

            // Almacena los token en LocalStorage
            authLoginController.setAccessToken(response.accessToken);
            authLoginController.setRefreshToken(response.accessToken);

            // Guarda logueo en contexto de la aplicación
            await login(response.accessToken);
            const { role } = decoderToken(response.accessToken);

            if (loading) {
              const timer = setInterval(() => {
                setProgress((prevProgress) => {
                  if (prevProgress >= 100) {
                    navigate('/' + verifyRole(role));
                  } else {
                    return prevProgress + 10;
                  }
                });
              }, 80);
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
    signinGoogleVet();
  }, [loading]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?pets)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={4} sx={{ mt: 0 }}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  startIcon={<ArrowBackIos />}
                  href='/'
                  variant='text'
                >
                  REGRESAR
                </Button>
              </Grid>
            </Grid>
            <Avatar sx={{ m: 1, bgcolor: '#795548' }}>
              <PetsIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Inicia sesión
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Correo electrónico'
                name='email'
                autoComplete='email'
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Contraseña'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Inicia sesión
              </Button>

              <Divider> O </Divider>

              <Button
                variant='outlined'
                sx={{ mt: 2, mb: 2 }}
                startIcon={<Google />}
                fullWidth
                onClick={() => {
                  googleSingIn();
                }}
              >
                Inicia sesión con Google
              </Button>

              {error && (
                <Alerta
                  type={'error'}
                  title={'¡Fallo inicio de sesión!'}
                  message={'Correo electrónico o contraseña incorrecta'}
                  strong={'Verifica tus credenciales.'}
                />
              )}

              {/* Mostrar CircularProgress si loading es true */}
              {loading && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                    background: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress
                      size={140}
                      variant='determinate'
                      sx={{ color: '#795548' }}
                      value={progress}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          backgroundColor: '#795548',
                        }}
                      >
                        <PetsIcon sx={{ fontSize: 60 }} />
                      </Avatar>
                    </div>
                  </div>
                </div>
              )}

              <Grid container>
                <Grid item xs>
                  {/* FORGOT PASSWORD COMPONENT */}
                  {/* Contiene un cuadro Dialogo para ingresar 
                    correo de recuperación de contraseña*/}
                  <ForgotPassword />
                </Grid>
                <Grid item>
                  <Link href='/register' variant='body2'>
                    {'¿No tienes una cuenta? Regístrate'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
