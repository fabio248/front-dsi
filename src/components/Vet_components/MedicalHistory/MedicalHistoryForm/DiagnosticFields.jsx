import React, { useState, useRef,  } from 'react';

import { DeleteOutline } from "@mui/icons-material";

import {
  Grid,
  Card,
  FormHelperText,
  CardContent,
  TextField,
  Button,
  Divider,
  Box,
  Typography,

} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './medicalHistory.css'

export function MedicalHistoryFormDiagnosticTextFields({ formik, medicalHistory }) {
    const [tratamientos, setTratamientos] = useState(formik.values.tratamientos)
    const lastTreatmentCardRef = useRef(null);
    const intervationsDeletedTemp = []
    const treatmentsDeletedTemp = [];
  
    const [intervenciones, setIntervenciones] = useState(formik.values.intervenciones)
    const lastIntervationCardRef = useRef(null);
  
    const handleDateChange = (date) => {
        formik.setFieldValue('dateJourney', date);
    };
  
    const handleDateIntervationChange = (date, index) => {
        formik.setFieldValue(`intervenciones[${index}].intervationDate`, date);
    }
  
    const addIntervation = () => {
        const newIntervenciones = [...formik.values.intervenciones, { intervationDate: null, name: '', description: '' }];
        setIntervenciones(newIntervenciones);
        formik.setFieldValue('intervenciones', newIntervenciones);
  
        if (lastIntervationCardRef.current) {
            lastIntervationCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
  
    const removeIntervation = (index) => {
        const newIntervenciones = formik.values.intervenciones.filter((_, i) => i !== index)
        const newErrorsIntervenciones = formik.errors.intervenciones !== undefined ? formik.errors.intervenciones.filter((_, i) => i !== index) : [];
        formik.setFieldError('intervenciones', newErrorsIntervenciones);
        formik.setFieldValue('intervenciones', newIntervenciones);
        setIntervenciones(newIntervenciones);
    }
  
    const addTreatment = () => {
        const newtratamientos = [...formik.values.tratamientos, { 
          name: '',
          quantity: '',
          frequency: '',
          days: undefined,
          }];
        setTratamientos(newtratamientos);
        formik.setFieldValue('tratamientos', newtratamientos);
  
        if (lastTreatmentCardRef.current) {
            lastTreatmentCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const removeTreatment = (index) => {
        const newTratamientos = formik.values.tratamientos.filter((_, i) => i !== index)
        const newErrorsTratamientos = formik.errors?.tratamientos?.name !== undefined ? formik.errors.tratamientos.filter((_, i) => i !== index) : [];
        formik.setFieldError('tratamientos', newErrorsTratamientos);
        formik.setFieldValue('tratamientos', newTratamientos);
        setTratamientos(newTratamientos);
    }
  
    return (
      <Box sx={{ height:'100%'}}>
        <Grid container spacing={2} sx={{ maxWidth: '97%', margin: '0' }}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoFocus
              fullWidth
              id='diagnostic'
              name='diagnostic'
              label='Descripción del diagnóstico'
              variant='outlined'
              size='small'
              value={formik.values.diagnostic}
              onChange={formik.handleChange}
              error={ formik.touched.diagnostic && Boolean(formik.errors.diagnostic) }
              helperText={ formik.touched.diagnostic && formik.errors.diagnostic }
            />
          </Grid>
        </Grid>
        <br />
        <Divider
          container
          spacing={2}
          sx={{ maxWidth: '100%', margin: 0, marginBottom: '1px' }}
        >
          <Typography fontWeight='bold'>{'Tratamientos'}</Typography>
        </Divider>
        <br />
        {((formik.touched.tratamientos) && Boolean(formik.errors.tratamientos) && typeof(formik.errors.tratamientos) === 'string') &&
            (
            <FormHelperText error>{ 'Error: ' + formik.errors.tratamientos}</FormHelperText>)}
        <Grid item xs={4} sm={8} md={12}>
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {tratamientos && tratamientos.map((treatment, index) => {
                      return <Grid
                          container
                          spacing={1}
                          justifyContent="space-between"
                          textAlign="center"
                          key={index}
                          sx={{ mt:0.5}}
                      >
                      
                          <Card variant="outlined" sx={{ width: '100%', mt:0.5, ml: 1.5 }}>
                              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb:1 }}>
                                      <Typography gutterBottom sx={{ ml:5 }}>
                                          Tratamiento {index + 1}
                                      </Typography>
                                      <Button
                                          variant="contained"
                                          color="error"
                                          type="button"
                                          onClick={() => removeTreatment(index)}
                                      >
                                          <DeleteOutline color="action" />
                                      </Button>
                                  </Grid>
                                  <Grid container spacing={2} sx={{ maxWidth: '600px'}}>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`tratamientos[${index}].name`}
                                        label='Nombre del tratamiento'
                                        variant='outlined'
                                        size='small'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tratamientos[index]?.name || ''}
                                        error={
                                            (formik.touched.tratamientos &&
                                            formik.touched.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.name &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            Boolean(formik.errors.tratamientos[index]?.name)) ?? false
                                        }
                                        helperText={
                                            formik.touched.tratamientos &&
                                            formik.touched.tratamientos[index] &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            formik.errors.tratamientos[index]?.name
                                        }
                                    />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`tratamientos[${index}].quantity`}
                                        label='Cantidad del tratamiento'
                                        variant='outlined'
                                        size='small'
                                        sx={{ mb: 1.5 }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tratamientos[index]?.quantity || ''}
                                        error={
                                            (formik.touched.tratamientos &&
                                            formik.touched?.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.quantity &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            Boolean(formik.errors.tratamientos[index].quantity)) ?? false
                                        }
                                        helperText={
                                            formik.touched.tratamientos &&
                                            formik.touched.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.quantity &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            formik.errors.tratamientos[index]?.quantity
                                        }
                                    />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`tratamientos[${index}].frequency`}
                                        label='Frecuencia de aplicación'
                                        variant='outlined'
                                        size='small'
                                        sx={{ mb: 1.5 }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tratamientos[index]?.frequency || ''}
                                        error={
                                            (formik.touched.tratamientos &&
                                            formik.touched?.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.frequency &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            Boolean(formik.errors.tratamientos[index].frequency)) ?? false
                                        }
                                        helperText={
                                            formik.touched.tratamientos &&
                                            formik.touched.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.frequency &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            formik.errors.tratamientos[index]?.frequency
                                        }
                                    />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`tratamientos[${index}].days`}
                                        label='Días de aplicación'
                                        variant='outlined'
                                        type='number'
                                        size='small'
                                        sx={{ mb: 1.5 }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tratamientos[index]?.days || ''}
                                        error={
                                            (formik.touched.tratamientos &&
                                            formik.touched?.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.days &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            Boolean(formik.errors.tratamientos[index].days)) ?? false
                                        }
                                        helperText={
                                            formik.touched.tratamientos &&
                                            formik.touched.tratamientos[index] &&
                                            formik.touched.tratamientos[index]?.days &&
                                            formik.errors.tratamientos &&
                                            formik.errors.tratamientos[index] &&
                                            formik.errors.tratamientos[index]?.days
                                        }
                                    />
                                    </Grid>
                                  </Grid>
                              </CardContent>
                          </Card>
                      </Grid>
                      }
                  )}
              </div>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', mt: 2 }}>
              <Button
                  type="button"
                  variant="outlined"
                  onClick={addTreatment}
                  sx={{ margin: '0 auto' }}
              >
                  Añadir tratamiento
              </Button>
          </Grid>
        <br />
        <Divider
          container
          spacing={2}
          sx={{ maxWidth: '100%', margin: 0, marginBottom: '1px' }}
        >
          <Typography fontWeight='bold'>{'Intervenciones médicas'}</Typography>
        </Divider>
        <br />
        <Grid item xs={4} sm={8} md={12}>
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {intervenciones && intervenciones.map((intervation, index) => {
                      return <Grid
                          container
                          spacing={1}
                          justifyContent="space-between"
                          textAlign="center"
                          key={index}
                          sx={{ mt:0.5}}
                      >
                          <Card variant="outlined" sx={{ width: "100%", mt:0.5, ml: 1.5 }}>
                              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb:1 }}>
                                      <Typography gutterBottom sx={{ ml:5 }}>
                                          Intervención {index + 1}
                                      </Typography>
                                      <Button
                                          variant="contained"
                                          color="error"
                                          type="button"
                                          onClick={() => removeIntervation(index)}
                                      >
                                          <DeleteOutline color="action" />
                                      </Button>
                                  </Grid>
                                  <Grid container spacing={2} sx={{ maxWidth: '600px'}}>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`intervenciones[${index}].name`}
                                        label='Nombre de la intervención'
                                        variant='outlined'
                                        size='small'
                                        sx={{ mb: 1.5 }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.intervenciones[index]?.name || ''}
                                        error={
                                            (formik.touched.intervenciones &&
                                            formik.touched?.intervenciones[index] &&
                                            formik.touched.intervenciones[index]?.name &&
                                            formik.errors.intervenciones &&
                                            formik.errors.intervenciones[index] &&
                                            Boolean(formik.errors.intervenciones[index].name)) ?? false
                                        }
                                        helperText={
                                            formik.touched.intervenciones &&
                                            formik.touched.intervenciones[index] &&
                                            formik.touched.intervenciones[index]?.name &&
                                            formik.errors.intervenciones &&
                                            formik.errors.intervenciones[index] &&
                                            formik.errors.intervenciones[index]?.name
                                        }
                                    />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label='Dia de intervención'
                                            name={`intervenciones[${index}].intervationDate`}
                                            value={formik.values.intervenciones[index].intervationDate}
                                            onBlur={formik.handleBlur}
                                            onChange={(date)=> handleDateIntervationChange(date, index)}
                                            slotProps={{ 
                                              textField: { 
                                                size: 'small', 
                                                fullWidth: true,
                                                error: (formik.touched.intervenciones &&
                                                  formik.touched?.intervenciones[index] &&
                                                  formik.touched.intervenciones[index]?.intervationDate &&
                                                  formik.errors.intervenciones &&
                                                  formik.errors.intervenciones[index] &&
                                                  Boolean(formik.errors.intervenciones[index].intervationDate)) ?? false,
                                                helperText: (formik.touched.intervenciones &&
                                                    formik.touched.intervenciones[index] &&
                                                    formik.touched.intervenciones[index]?.intervationDate &&
                                                    formik.errors.intervenciones &&
                                                    formik.errors.intervenciones[index] &&
                                                    formik.errors.intervenciones[index]?.intervationDate)
                                              } 
                                            }}
                                            showTodayButton
                                            disablePast
                                            format='dd/MM/yyyy'
                                            ref={index === intervenciones.length - 1 ? lastIntervationCardRef : null}
                                        />
                                    </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        name={`intervenciones[${index}].description`}
                                        label='Descripción de la intervención'
                                        variant='outlined'
                                        size='small'
                                        sx={{ mb: 1.5, minWidth: '250px' }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.intervenciones[index]?.description || ''}
                                        error={
                                            (formik.touched.intervenciones &&
                                            formik.touched?.intervenciones[index] &&
                                            formik.touched.intervenciones[index]?.description &&
                                            formik.errors.intervenciones &&
                                            formik.errors.intervenciones[index] &&
                                            Boolean(formik.errors.intervenciones[index].description)) ?? false
                                        }
                                        helperText={
                                            formik.touched.intervenciones &&
                                            formik.touched.intervenciones[index] &&
                                            formik.touched.intervenciones[index]?.description &&
                                            formik.errors.intervenciones &&
                                            formik.errors.intervenciones[index] &&
                                            formik.errors.intervenciones[index]?.description
                                        }
                                    />
                                    </Grid>
                                  </Grid>
                              </CardContent>
                          </Card>
                      </Grid>
                      }
                  )}
              </div>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', mt: 2 }}>
              <Button
                  type="button"
                  variant="outlined"
                  onClick={addIntervation}
                  sx={{ margin: '0 auto' }}
              >
                  Añadir intervención médica
              </Button>
          </Grid>
      </Box>
    );
  }