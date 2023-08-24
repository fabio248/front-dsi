import React, { useState } from 'react';

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
import { initialValues, validationSchemaRegister } from './UserFormValidate';

//Backend petitions
import { ApiAuth } from '../../../../api/Auth.api';
import { User } from '../../../../api/User.api';
import { useAuth } from '../../../../hooks';

//MUI Material
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, TextField, Button, FormHelperText } from '@mui/material';
import MaskedInput from 'react-text-mask';
import InputMask from 'react-input-mask';
import { Alerta } from '../../../../shared';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//estilos
import './UserForm.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const authControl = new ApiAuth();
const userControl = new User();

export function UserFormTextFields({ formik }) {
  const roles = [
    { label: 'client', key: 'user', value: 'client' },
    { label: 'admin', key: 'admin', value: 'admin' },
  ];

  const duiMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];

  const handleDateChange = (date) => {
    formik.setFieldValue('birthday', date);
  };
  return (
    <Grid container spacing={3}>
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
          value={formik.values.lastName || null}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='email'
          label='Correo'
          variant='outlined'
          size='small'
          placeholder='yourAccountGoole@gmail.com'
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
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Fecha de Nacimiento'
            name='birthday'
            value={formik.values.birthday}
            onChange={handleDateChange}
            onBlur={formik.handleBlur}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
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
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='password'
          label='Contraseña'
          type='password'
          variant='outlined'
          size='small'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          disablePortal
          id='role'
          name='role'
          size='small'
          options={roles}
          onChange={(_, data) =>
            formik.setFieldValue('role', data?.value || '')
          }
          value={formik.values.role}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Selecciona un Rol'
              error={formik.touched.role && formik.errors.role}
              helperText={formik.touched.role && formik.errors.role}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='phone'
          name='phone'
          label='Teléfono'
          variant='outlined'
          size='small'
          placeholder='0000-0000'
          value={formik.values.phone}
          onChange={(e) => {
            let onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Filtrar caracteres no numéricos
            onlyNumbers = onlyNumbers.slice(0, 8); // Limitar a 8 números

            let formattedNumber = '';
            for (let i = 0; i < onlyNumbers.length; i += 4) {
              formattedNumber += onlyNumbers.substr(i, 4);
              if (i + 4 < onlyNumbers.length) {
                formattedNumber += '-';
              }
            }

            formik.handleChange({
              target: {
                name: 'phone',
                value: formattedNumber,
              },
            });
          }}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='direction'
          label='Dirección'
          variant='outlined'
          size='small'
          value={formik.values.direction}
          onChange={formik.handleChange}
          error={formik.touched.direction && Boolean(formik.errors.direction)}
          helperText={formik.touched.direction && formik.errors.direction}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='dui'
          name='dui'
          label='DUI'
          variant='outlined'
          size='small'
          value={formik.values.dui || ''}
          placeholder='00000000-0'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.dui && Boolean(formik.errors.dui)}
          helperText={formik.touched.dui && formik.errors.dui}
          InputProps={{
            inputComponent: MaskedInput,
            inputProps: {
              mask: duiMask,
              guide: false,
              placeholderChar: '\u2000',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

const UserForm = (props) => {
  const { close, user } = props;
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState('');
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: authControl.registerUserForVet,
    onMutate: () => {
      setIsError(false);
    },
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries(['users']);
      setTimeout(() => {
        close();
      }, 1500);
    },
    onError: (error) => {
      if (error.statusCode === 409) {
        setMessageError('Ya existe un usuario con este correo');
      } else {
        setMessageError('No se ha podido completar el registro');
      }
      setIsError(true);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ accessToken, userId, formValue }) => {
      return userControl.updateUser(accessToken, userId, formValue);
    },
    onMutate: () => {
      setIsError(false);
      setSuccess(false);
    },
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries(['users']);
      setTimeout(() => {
        close();
      }, 1500);
    },
    onError: (error) => {
      if (error.statusCode === 409) {
        setMessageError('Ya existe un usuario con este correo');
      }
      setMessageError('No se ha podido actualizar el usuario');
      setIsError(true);
    },
  });

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchemaRegister(user),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (!user) {
        createUserMutation.mutate(formValue);
      }

      updateUserMutation.mutate({
        accessToken,
        userId: user.id,
        formValue,
      });
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <br />

          {/*Campos de llenado del fomrulario*/}
          <UserFormTextFields formik={formik} />

          <br />
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <Button type='submit' size='medium' sx={{ mx: 2 }}>
              {user ? 'Actualizar' : 'Registrar'}
            </Button>
            <Button color='error' onClick={close} size='medium' sx={{ mx: 2 }}>
              Cancelar
            </Button>
          </Grid>
          {success && (
            <Alerta
              type={'success'}
              title={user ? 'Usuario Actuallizado' : 'Usuario Regsitrado'}
              message={
                user
                  ? 'Se ha actualizado correctamente el usuario'
                  : 'Se ha registrado correctamente'
              }
              strong={
                user
                  ? `${user.firstName} ${user.lastName}`
                  : 'Verifica el registro'
              }
            />
          )}
          {isError && (
            <Alerta
              type={'error'}
              title={'¡Ha ocurrido un problema!'}
              message={messageError}
              strong={
                user
                  ? `${user.firstName} ${user.lastName}`
                  : 'Verifica la información ingresada'
              }
            />
          )}
        </form>
      </div>
    </>
  );
};

export { UserForm };
