import React, { useState, useCallback, useRef, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteOutline } from "@mui/icons-material";

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
import { parse } from 'date-fns';

//Backend petitions
import { Species } from '../../../../api/specie.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { Pets } from '../../../../api/Pets.api';
import { PetsMedicalHistories } from '../../../../api/MedicalHistory.api';
import { size, map } from 'lodash';

//MUI Material
import Autocomplete from '@mui/material/Autocomplete';
import {
  Grid,
  Card,
  FormHelperText,
  CardContent,
  TextField,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  ListItemAvatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Alerta } from '../../../../shared';
import './medicalHistory.css'

//hooks accessToken
import { useAuth } from '../../../../hooks';
// Validations and initialValues
import {
  initialPetValues,
  validationSchemaPetRegister,
  initialTreatmentsValues,
  initialIntervationsValues,
  medicalHistoryTreatmentsSchema,
  medicalHistoryIntervationsSchema,
} from './medicalHistoryFormSchema';

import { Modal_medicalHistory } from '../../../../shared/Modal_MedicalHistory/Modal_medicalHistory';

//estilos
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const specieController = new Species();
const authController = new ApiAuth();
const petsController = new Pets();
const medicalHistoryController = new PetsMedicalHistories();

const steps = ['Anamnesis', 'Examen Físico', 'Diagnóstico'];

export function MedicalHistoryFormAnamnesisTextFields({ formik }) {
  return (
    <Box sx={{ height:'97%'}}>
      <Grid container spacing={2} sx={{ maxWidth: '97%', margin: '0' }}>
        <Grid item xs={12} sm={6}>
          <TextField
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


export function MedicalHistoryPhysicalExamTextFields({ formik, onBinaryStrChange, onDropFile }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && isFileValid(file)) {
        const reader = new FileReader();

        reader.onload = () => {
          const binaryStr = reader.result;
          // console.log('binaryStr in PetFormTextFields:', binaryStr);
          // Call the parent component function to pass the binaryStr value.
          onBinaryStrChange(binaryStr);
        };
        reader.readAsArrayBuffer(file);

        setUploadedFile(file);
        setErrorMessage('');
        setIsError(false);

        onDropFile(file);
      } else {
        setUploadedFile(null);
        setErrorMessage(
          'Formato de archivo no válido. Se aceptan archivos PDF y imágenes (PNG, JPG, JPEG).'
        );
        setIsError(true);
      }
    },
    [onBinaryStrChange]
  );

  const isFileValid = (file) => {
    const acceptedFormats = [
      'application/pdf',
      'application/msword',
      'image/png',
      'image/jpeg',
    ];
    return acceptedFormats.includes(file.type);
  };

  // Eliminar el archivo cargado estableciendo el estado en null en el dropzone
  const handleDelete = () => {
    setUploadedFile(null);
    setErrorMessage('');
    setIsError(false);
  };

  //restriccion de los elementos obtenido en el dropzone
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: [
        'application/pdf',
        'application/msword',
        'image/png',
        'image/jpeg',
      ],
      multiple: false,
    });

  const dropzoneStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: isError ? 'red' : isDragReject ? 'red' : '#888',
    borderStyle: 'dashed',
    p: 4,
    textAlign: 'center',
    backgroundColor: 'background.paper',
    cursor: 'pointer',
    height: '100%',
    ml: 0,
  };

  return (
    <Box sx={{ height:'97%', mb: 10}}>
      <Grid container spacing={2} sx={{ maxWidth: '97%', margin: '0' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='weight'
            label='Peso de la mascota (Kg)'
            variant='outlined'
            placeholder='Ejemplo: 0.0Kg'
            size='small'
            value={formik.values.weight}
            onChange={formik.handleChange}
            type='number'
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='palpitaciones'
            label='Palpitaciones'
            variant='outlined'
            size='small'
            value={formik.values.palpitaciones}
            onChange={formik.handleChange}
            error={ formik.touched.palpitaciones && Boolean(formik.errors.palpitaciones) }
            helperText={ formik.touched.palpitaciones && formik.errors.palpitaciones }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='temperatura'
            label='Temperatura de la mascota (°C)'
            variant='outlined'
            placeholder='Ejemplo: 34 °C'
            size='small'
            value={formik.values.temperatura}
            onChange={formik.handleChange}
            type='number'
            error={formik.touched.temperatura && Boolean(formik.errors.temperatura)}
            helperText={formik.touched.temperatura && formik.errors.temperatura}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
          name='frecuenciaRespiratoria'
            label='Frecuencia respiratoria (res/min)'
            variant='outlined'
            placeholder='Ejemplo: 17 res/min'
            size='small'
            value={formik.values.frecuenciaRespiratoria}
            onChange={formik.handleChange}
            type='number'
            error={formik.touched.frecuenciaRespiratoria && Boolean(formik.errors.frecuenciaRespiratoria)}
            helperText={formik.touched.frecuenciaRespiratoria && formik.errors.frecuenciaRespiratoria}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='frecuenciaCardiaca'
            label='Frecuencia rcardiaca (lat/min)'
            variant='outlined'
            placeholder='Ejemplo: 92 lat/min'
            size='small'
            value={formik.values.frecuenciaCardiaca}
            onChange={formik.handleChange}
            type='number'
            error={formik.touched.frecuenciaCardiaca && Boolean(formik.errors.frecuenciaCardiaca)}
            helperText={formik.touched.frecuenciaCardiaca && formik.errors.frecuenciaCardiaca}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='examenLaboratorio'
            label='Examen de laboratorio'
            variant='outlined'
            size='small'
            value={formik.values.examenLaboratorio}
            onChange={formik.handleChange}
            error={formik.touched.examenLaboratorio && Boolean(formik.errors.examenLaboratorio)}
            helperText={formik.touched.examenLaboratorio && formik.errors.examenLaboratorio}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='pulso'
            label='Pulso'
            variant='outlined'
            placeholder='Ejemplo: 84 pulsos/min'
            size='small'
            value={formik.values.pulso}
            onChange={formik.handleChange}
            error={formik.touched.pulso && Boolean(formik.errors.pulso)}
            helperText={formik.touched.pulso && formik.errors.pulso }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='mucus'
            label='Mucus'
            variant='outlined'
            size='small'
            value={formik.values.mucus}
            onChange={formik.handleChange}
            error={formik.touched.mucus && Boolean(formik.errors.mucus)}
            helperText={formik.touched.mucus && formik.errors.mucus}
          />
        </Grid>
        <Grid container spacing={3} sx={{ margin: 0 }}>
          <Grid item xs={12} sm={24}>
            <Box {...getRootProps()} sx={dropzoneStyle}>
              <input
                {...getInputProps()}
                value={formik.values.uploadedFile}
                // onChange={(event) => {
                //   formik.setFieldValue(
                //     'file',
                //     event.currentTarget.uploadedFile[0]
                //   ); // Actualiza el valor del campo "file" en Formik
                // }}
              />

              {isDragActive ? (
                <Typography variant='body1' color='text.secondary'>
                  Suelta los archivos aquí...
                </Typography>
              ) : (
                <Typography variant='body1' color='text.secondary'>
                  {uploadedFile
                    ? 'Archivo cargado: ' + uploadedFile.name
                    : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos'}
                </Typography>
              )}

              {uploadedFile && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant='contained'
                    onClick={handleDelete}
                    size='small'
                    color='error'
                    startIcon={<RemoveCircle />}
                  >
                    Eliminar
                  </Button>
                </Box>
              )}
              {errorMessage && (
                <Typography variant='body1' color='error' sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export function MedicalHistoryFormDiagnosticTextFields({ formik, medicalHistory }) {
  const [tratamientos, setTratamientos] = useState(formik.values.tratamientos)
  const lastTreatmentCardRef = useRef(null);

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

const MedicalHistoryForm = (props) => {
  const { close, medicalHistory, petId} = props;
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  //data for file amazon
  const [uploadData, setUploadData] = useState(null);
  const [fileOriginal, setFileOriginal] = useState(null);
  const [fileCharged, setFileCharged] = useState(false);


  //Stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  ///////////////////////////

  const validateData = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        handleNext();
      }
      else {
        formik.setTouched(errors, true);
      }
    });
  }


  const queryClient = useQueryClient();
  const createMedicalHistoryMutation = useMutation({
    mutationFn: async ({ petId, formValue }) => {
      const accessToken = authController.getAccessToken();
      // Ejecutar la creación de la mascota primero
      const response = await medicalHistoryController.create(
        accessToken,
        petId,
        formValue
      );

      /*if (fileCharged) {
        try {
          const { url } = await petsController.filePets(
            accessToken,
            fileOriginal.type,
            response.id
          );
          // Después ejecutar la función amazonPeticionForFile
          // await amazonPeticionForFile(url, uploadData, fileOriginal);
        } catch (error) {
          console.error('Error al cargar el archivo en AWS S3:', error);
          throw error; // Importante: propagar el error para que el onError de useMutation lo capture
        }
      }*/
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pets']);
      setSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
  });

  const updatePetMuatation = useMutation({
    mutationFn: async ({ petId, formValue }) => {
      const accessToken = authController.getAccessToken();
      if (fileCharged) {
        const { url } = await petsController.filePets(
          accessToken,
          fileOriginal.type,
          pet.id
        );
        try {
          amazonPeticionForFile(url, uploadData, fileOriginal);
        } catch (error) {
          console.error('Error al cargar el archivo en AWS S3:', error);
        }

        return await petsController.updatePets(accessToken, petId, formValue);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pets']);
      setSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
  });

  //funcion que gestiona la peticio de guardar un archivo en amazon query
  const amazonPeticionForFile = async (url, uploadData, fileOriginal) => {
    await petsController.amazonQuery(url, uploadData, fileOriginal);
  };

  // seteo para la validacion del archivo original en formato buffer
  const handleBinaryStrChange = (binaryStr) => {
    setFileCharged(true);
    setUploadData(binaryStr);
  };
  // seteo para la validacion del formato original del documento
  const handleDropFile = (fileOrigen) => {
    setFileOriginal(fileOrigen);
  };

  //manipulacion y validacion de los campos
  const formik = useFormik({
    initialValues: initialPetValues(medicalHistory),
    validationSchema: validationSchemaPetRegister(medicalHistory, activeStep),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
      if (activeStep === steps.length - 1 ){     
        if (!medicalHistory) {
          createMedicalHistoryMutation.mutate({ petId, formValue });
          setTimeout(() => { 
            close(); 
          }, 2500);
        }
        //aqui ira la peticion donde se actualizaran los datos
        /*updatePetMuatation.mutate({ medicalHistoryId: medicalHistoryId, formValue });

        setTimeout(() => {
          close();
        }, 1500);*/
      } else {
        handleNext();
        console.log(formValue)
      }
    },
  });

  //console.log(formik.values)
  return (
    <>
      <div className='hide-scrollbar'>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }} component='form' noValidate onSubmit={formik.handleSubmit}>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        activeStep === 0 ? (
          <React.Fragment>
            <Typography sx={{ mt: 0.5, mb: 0.5, textAlign: 'center' }}>Parte {activeStep + 1}</Typography>
              <MedicalHistoryFormAnamnesisTextFields
                formik={formik}
              />
          </React.Fragment>
        ) : (
          activeStep === 1 ? (
          <React.Fragment>
            <Typography sx={{ mt: 0.5, mb: 0.5, textAlign: 'center' }}>Parte {activeStep + 1}</Typography>
              <MedicalHistoryPhysicalExamTextFields
                formik={formik}
                onBinaryStrChange={handleBinaryStrChange}
                onDropFile={handleDropFile}
              />
          </React.Fragment>
          ) : (
            activeStep === 2 ? (
          <React.Fragment>
            <Typography sx={{ mt: 0.5, mb: 0.5, textAlign: 'center' }}>Parte {activeStep + 1}</Typography>
              <MedicalHistoryFormDiagnosticTextFields
                formik={formik}
                medicalHistory={medicalHistory}
              />
          </React.Fragment>
            ) : (<></>)
          )
        )
      )}
        <Grid sx={{ display: 'flex', flexDirection: 'row', mt: 2, mb: 1 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Regresar
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button 
          type={activeStep === 2 ? 'submit' : 'button'}
          onClick={activeStep < 2? validateData : () => {}}
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </Grid>
      </Box>
          {/*Campos de llenado del fomrulario*/}
          {/*<MedicalHistoryFormTextFields
            formik={formik}
            onBinaryStrChange={handleBinaryStrChange}
            onDropFile={handleDropFile}
          /> */}
          {success && (
            <Alerta
              type={'success'}
              title={
                medicalHistory ? 'Mascota actualizada' : 'Usuario y mascota registrados'
              }
              message={
                medicalHistory
                  ? 'Se ha actualizado correctamente la mascota'
                  : 'Se ha registrado correctamente'
              }
              strong={medicalHistory ? `${pet.name}` : 'Verifica el registro'}
            />
          )}
          {isError && (
            <Alerta
              type={'error'}
              title={'¡Ha ocurrido un problema!'}
              message={
                medicalHistory
                  ? 'No se ha podido actualizar mascota'
                  : 'No se ha podido completar el registro'
              }
              strong={medicalHistory ? `${pet.name}` : 'Verifica la información ingresada'}
            />
          )}
      </div>
    </>
  );
};

export { MedicalHistoryForm };
