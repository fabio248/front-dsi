import { useState } from 'react';
import { useFormik } from 'formik';
import { 
    ForgotPassInitialData,
    ForgotPasswordValidation
 } from '../Auth/ChangePasswordValidation'
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import KeyIcon from '@mui/icons-material/Key';
import { Alerta } from '../../Users_componentes/Alert'
import { ApiAuth } from '../../../api/Auth.api'

const authController = new ApiAuth();

export function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [errorChange, setErrorChange] = useState('');
  const [success, setSuccess] = useState(false);
  
  function handleClickOpen(){
    setOpen(true);
    setSuccess(false);
  }

  function handleClose(){
    setOpen(false);
    formikChange.setFieldValue('email', '')
  };
  
  const formikChange = useFormik({
    initialValues: ForgotPassInitialData(),
    validationSchema: ForgotPasswordValidation(),
    validateOnChange: false, 
    onSubmit: async(formValue) => {
        try {
            setErrorChange('');
            await authController.forgotPassword(formValue);
            setSuccess(true);
            handleClose();
        } catch (error) {
            setErrorChange('Error al enviar datos de registro');
            setSuccess(false);
        }
    }});

  return (
    <div>
      <Link component='div' onClick={handleClickOpen} variant='body2'>
        ¿Olvidó su contraseña?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <Box
            component='form'
            noValidate
            onSubmit={formikChange.handleSubmit}
            sx={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}
        >
          <Avatar sx={{ mt: 2, bgcolor: '#009688' }}>
            <KeyIcon />
          </Avatar>
          
          <DialogTitle >Cambio de contraseña</DialogTitle>

          <DialogContent>
              
            <DialogContentText>
                Ingresa el email que corresponde a su cuenta para efectuar el cambio de la contraseña.
            </DialogContentText>
            
            <TextField
                sx={{ mt: 3, mb: 2 }}
                required
                fullWidth
                id='email'
                label='Correo electrónico'
                name='email'
                autoComplete='email'
                autoFocus
                value={formikChange.values.email}
                onChange={formikChange.handleChange}
                error={formikChange.touched.email && Boolean(formikChange.errors.email)}
                helperText={formikChange.touched.email && formikChange.errors.email}
                />
            
          </DialogContent>
          <DialogActions>
            
            <Button 
            color = 'error'
            onClick={handleClose}>
                Cancelar
            </Button>
            <Button
            type='submit'>
                Enviar
            </Button>
          
          </DialogActions>
        </Box>
      </Dialog>
      { success && (
        <Alerta
        type = {"info"}
        title = {"¡Envío exitoso!"}
        message = {"Se ha notificado el cambio de contraseña a tu email"}
        strong = {"Verifica tu correo electrónico"}
        />
        )}
      {errorChange && (
        <Alerta
        type = {"error"}
        title = {"¡Fallo envío!"}
        message = {"Correo electrónico no encontrado"}
        strong = {"Verifica email ingresado."}
        />
        )}
    </div>
  );
}
