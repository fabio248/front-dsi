import * as React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import {LoginFormvalidations, initialData} from '../../components/Admin/Auth/LoginFormValidation';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import { Google } from "@mui/icons-material";
import {ApiAuth} from '../../api/Auth.api';
import { useAuth } from "../../hooks";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { decoderToken } from "../../utils"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      DSI Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
const authLoginController = new ApiAuth();

export function Login() {

  const { login } = useAuth();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: LoginFormvalidations(),
    validateOnChange: false, 
    onSubmit: async(formValue) => {

        try {
            setError("");
            const response = await authLoginController.login(formValue);

            authLoginController.setAccessToken(response.accessToken);
            authLoginController.setRefreshToken(response.accessToken);

            login(response.accessToken);
        } catch (error) {
            setError("Error al enviar datos de registro");
        }
    }});


    const session = useSession(); ///tokens
    const supabase = useSupabaseClient(); //talk to supabase
    const { isLoading } = useSessionContext();

    async function googleSingIn() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar',
        },
      });
      if (error) {
        alert('Error logging in to google provider with supabase');
        console.log(error);
      }
    }
    if (session !== null) {
        const user = decoderToken(session.access_token);
        console.log(user);
    }

    console.log(session);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicia sesión
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Inicia sesión
              </Button>
              <Divider> O </Divider>
              <Button
              variant="outlined"
              sx={{ mt: 2, mb: 2 }}
              startIcon={<Google/>}
              fullWidth
              onClick={() => {
                googleSingIn();
              }}
              >
              Inicia sesión con Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgoPass" variant="body2">
                  ¿Olvidó su contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"¿No tienes una cuenta? Regístrate"}
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