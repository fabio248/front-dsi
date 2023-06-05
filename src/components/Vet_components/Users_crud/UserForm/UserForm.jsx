import React from 'react';
import {
  Grid,
  FormGroup,
  TextField,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import { initialValues, validationSchemaRegister } from './UserFormValidate';
import MaskedInput from 'react-text-mask';
import { ApiAuth } from '../../../../api/Auth.api';
import './UserForm.css';

const userControl = new ApiAuth();

const DateMask = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export function UserForm(props) {
  const { close, onReload, user } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchemaRegister(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userControl.registerUserForVet(formValue);
        // console.log(formValue);
        close();
      } catch (error) {
        throw console.error(error);
      }
    },
  });
  return (
    <>
      <FormGroup
        style={{ minWidth: '400', maxWidth: '1000' }}
        onSubmit={formik.handleSubmit}
      >
        <Stack
          style={{ textAlign: 'center', marginTop: '10px' }}
          component='form'
          sx={{
            minWidth: '400',
            maxWidth: '800',
          }}
          spacing={3}
          noValidate
          autoComplete='off'
        >
          <Grid width={'equal'}>
            <TextField
              name='firstName'
              label='Nombres'
              id='firstName'
              variant='outlined'
              size='small'
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id='lastName'
              name='lastName'
              label='Apellidos'
              variant='outlined'
              size='small'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Divider />
          <Grid width={'equal'}>
            <TextField
              style={{ margin: '0 0 rem 0' }}
              hiddenLabel
              id='email'
              name='email'
              label='Correo'
              variant='outlined'
              size='small'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              style={{ margin: '0 0 rem 0' }}
              hiddenLabel
              id='birthday'
              name='birthday'
              label='Nacimiento'
              variant='outlined'
              size='small'
              value={formik.values.birthday}
              onChange={formik.handleChange}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
            />
          </Grid>
          <Divider />
          <Grid width={'equal'}>
            <TextField
              style={{ margin: '0 0 rem 0' }}
              hiddenLabel
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

            <Autocomplete
              style={{ display: 'inline-block' }}
              disablePortal
              id='role'
              name='role'
              size='small'
              options={top100Films}
              onChange={(_, data) => formik.setFieldValue('role', data.value)}
              value={formik.values.role}
              error={formik.touched.role && Boolean(formik.errors.role)}
              sx={{ width: 210 }}
              renderInput={(params) => (
                <TextField {...params} label='Seleccion un Role' />
              )}
            />
          </Grid>
          <Grid>
            <Button
              type='submit'
              loading={formik ? formik.isSubmitting : (loading = 'false')}
            >
              {user ? 'Actualizar Usuario' : 'Registrar Usuario'}
            </Button>
          </Grid>
        </Stack>
      </FormGroup>
    </>
  );
}

const top100Films = [
  { label: 'client', key: 'user', value: 'client' },
  { label: 'admin', key: 'admin', value: 'admin' },
];
