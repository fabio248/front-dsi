import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import { initialValues, validationSchemaRegister } from './UserFormValidate';
import { ApiAuth } from '../../../../api/Auth.api';
import './UserForm.css';

const userControl = new ApiAuth();

const UserForm = (props) => {
  const { close, onReload, user } = props;
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchemaRegister(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userControl.registerUserForVet(formValue);
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const roles = [
    { label: 'client', key: 'user', value: 'client' },
    { label: 'admin', key: 'admin', value: 'admin' },
  ];

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
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
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
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
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
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
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='birthday'
                label='Nacimiento'
                variant='outlined'
                size='small'
                value={formik.values.birthday}
                onChange={formik.handleChange}
                error={
                  formik.touched.birthday && Boolean(formik.errors.birthday)
                }
                helperText={formik.touched.birthday && formik.errors.birthday}
              />
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
                error={
                  isError
                    ? formik.errors.role && Boolean(formik.errors.password)
                    : undefined
                }
                renderInput={(params) => (
                  <TextField {...params} label='Selecciona un Rol' />
                )}
              />
            </Grid>
          </Grid>
          <br />
          <Grid sx = {{ display: 'flex', flexDirection:'row', justifyContent: 'center', margin: '0 auto' }}>
          <Button type='submit' size = 'medium' sx = {{ mx: 2 }}>
            {user ? 'Actualizar' : 'Registrar'}
          </Button>
          <Button color = 'error' onClick = {close} size = 'medium' sx = {{ mx: 2 }}>
            Cancelar
          </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export { UserForm };
