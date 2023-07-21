import React from 'react';
import { useFormik } from 'formik';
import { Grid, TextField, Button } from '@mui/material';

export default function Cliente_Register() {
  const formik = useFormik({
    initialValues: {
      nombre: '' || `${name}`,
      apellido: '',
      direccion: '',
      dui: '',
      telefono: '',
      nacionalidad: '',
    },
    onSubmit: (values) => {},
    validate: (values) => {
      const errors = {};

      if (!values.nombre) {
        errors.nombre = 'Campo requerido';
      }

      if (!values.apellido) {
        errors.apellido = 'Campo requerido';
      }

      // Validar los demás campos según tus necesidades

      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ marginTop: '10px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='nombre'
            name='nombre'
            label='Nombre'
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='apellido'
            name='apellido'
            label='Apellido'
            value={formik.values.apellido}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.apellido && Boolean(formik.errors.apellido)}
            helperText={formik.touched.apellido && formik.errors.apellido}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='direccion'
            name='direccion'
            label='Dirección'
            value={formik.values.direccion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='dui'
            name='dui'
            label='DUI'
            value={formik.values.dui}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='telefono'
            name='telefono'
            label='Teléfono'
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='nacionalidad'
            name='nacionalidad'
            label='Nacionalidad'
            value={formik.values.nacionalidad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
