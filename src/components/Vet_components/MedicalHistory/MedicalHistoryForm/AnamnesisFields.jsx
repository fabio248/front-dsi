import React from 'react';

//Backend petitions
import { ApiAuth } from '../../../../api/Auth.api';
import { Pets } from '../../../../api/Pets.api';
import { PetsMedicalHistories } from '../../../../api/MedicalHistory.api';
import {
  Grid,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import './medicalHistory.css'

export function MedicalHistoryFormAnamnesisTextFields({ formik }) {
    return (
      <Box sx={{ height:'97%'}}>
        <Grid container spacing={2} sx={{ maxWidth: '97%', margin: '0' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              fullWidth
              id='quantityFood'
              name='quantityFood'
              label='Cantidad de alimento'
              variant='outlined'
              size='small'
              value={formik.values.quantityFood}
              onChange={formik.handleChange}
              error={
                formik.touched.quantityFood && Boolean(formik.errors.quantityFood)
              }
              helperText={
                formik.touched.quantityFood && formik.errors.quantityFood
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='typeFood'
              name='typeFood'
              label='Tipo de alimento'
              variant='outlined'
              size='small'
              value={formik.values.typeFood}
              onChange={formik.handleChange}
              error={formik.touched.typeFood && Boolean(formik.errors.typeFood)}
              helperText={formik.touched.typeFood && formik.errors.typeFood}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='descendencia'
              name='descendencia'
              label='Descendencia'
              variant='outlined'
              size='small'
              value={formik.values.descendencia}
              onChange={formik.handleChange}
              error={
                formik.touched.descendencia && Boolean(formik.errors.descendencia)
              }
              helperText={
                formik.touched.descendencia && formik.errors.descendencia
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: '5px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id='reproduccion'
                    name='reproduccion'
                    size='small'
                    checked={formik.values.reproduccion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label='Reproducción:'
                labelPlacement='start'
                sx={{
                  width: '92%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: '5px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id='vacuna'
                    name='vacuna'
                    size='small'
                    checked={formik.values.vacuna}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label='¿Posee todas sus vacunas?'
                labelPlacement='start'
                sx={{
                  width: '92%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: '5px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id='convivencia'
                    name='convivencia'
                    size='small'
                    checked={formik.values.convivencia}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label='¿Vive con otras mascotas?'
                labelPlacement='start'
                sx={{
                  width: '92%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id='whichPets'
              name='whichPets'
              label='Si convive con otras mascotas, ¿Cuáles mascotas?'
              variant='outlined'
              size='small'
              disabled={!formik.values.convivencia}
              value={formik.values.whichPets}
              onChange={formik.handleChange}
              error={formik.touched.whichPets && Boolean(formik.errors.whichPets)}
              helperText={formik.touched.whichPets && formik.errors.whichPets}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='enfermedad'
              name='enfermedad'
              label='Desarrollo/Evaluacion de la enfermedad'
              size='small'
              multiline
              rows={4}
              value={formik.values.enfermedad}
              onChange={formik.handleChange}
              error={
                formik.touched.enfermedad && Boolean(formik.errors.enfermedad)
              }
              helperText={formik.touched.enfermedad && formik.errors.enfermedad}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='observacion'
              name='observacion'
              label='Observaciones'
              size='small'
              multiline
              rows={4}
              value={formik.values.observacion}
              onChange={formik.handleChange}
              error={
                formik.touched.observacion && Boolean(formik.errors.observacion)
              }
              helperText={formik.touched.observacion && formik.errors.observacion}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id='habitaculo'
              name='habitaculo'
              label='Habitáculo'
              size='small'
              multiline
              rows={2}
              value={formik.values.habitaculo}
              onChange={formik.handleChange}
              error={
                formik.touched.habitaculo && Boolean(formik.errors.habitaculo)
              }
              helperText={formik.touched.habitaculo && formik.errors.habitaculo}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }