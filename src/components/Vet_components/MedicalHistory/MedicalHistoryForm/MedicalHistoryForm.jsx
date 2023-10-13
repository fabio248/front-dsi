import React, { useState, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
import { parse } from 'date-fns';

//Backend petitions
import { Species } from '../../../../api/specie.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { Pets } from '../../../../api/Pets.api';
import { size, map } from 'lodash';

//MUI Material
import Autocomplete from '@mui/material/Autocomplete';
import {
  Grid,
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

export function MedicalHistoryFormDiagnosticTreatmentsTextFields({ formik, index, medicalHistory, formikTreatments, key, treatment}) {

  const temp = [...formik.values.tratamientos];
  const nameHandleChange = (e) => {
    temp[index].name = e.target.value;
    return formik.setFieldValue('tratamientos', temp)
  }
  const quantityTreatmentHandleChange = (e) => {
    temp[index].quantityTreatment = e.target.value;
    return formik.setFieldValue('tratamientos', temp)
  }
  const frequencyTreatmentHandleChange= (e) =>{
    temp[index].frequencyTreatment = e.target.value;
    return formik.setFieldValue('tratamientos', temp)
  }
  const daysHandleChange= (e) =>{
    temp[index].days = e.target.value;
    return formik.setFieldValue('tratamientos', temp)
  }
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='name'
          name='name'
          label='Nombre del tratamiento'
          variant='outlined'
          size='small'
          value={ medicalHistory || treatment ? formik.values.tratamientos[index].name : formikTreatments.values.name}
          onChange={ medicalHistory ? formik.handleChange : treatment ?  nameHandleChange : formikTreatments.handleChange}
          error={ formikTreatments.touched.name && Boolean(formikTreatments.errors.name) }
          helperText={ formikTreatments.touched.name && formikTreatments.errors.name }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='quantityTreatment'
          name='quantityTreatment'
          label='Cantidad del tratamiento'
          variant='outlined'
          size='small'
          value={  medicalHistory || treatment ? formik.values.tratamientos[index].quantityTreatment : formikTreatments.values.quantityTreatment}
          onChange={ medicalHistory ? formik.handleChange : treatment ?  quantityTreatmentHandleChange : formikTreatments.handleChange }
          error={ formikTreatments.touched.quantityTreatment && Boolean(formikTreatments.errors.quantityTreatment) }
          helperText={ formikTreatments.touched.quantityTreatment && formikTreatments.errors.quantityTreatment }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='frequencyTreatment'
          name='frequencyTreatment'
          label='Frecuencia de aplicación'
          variant='outlined'
          size='small'
          value={  medicalHistory || treatment ? formik.values.tratamientos[index].frequencyTreatment : formikTreatments.values.frequencyTreatment }
          onChange={medicalHistory ? formik.handleChange : treatment ?  frequencyTreatmentHandleChange : formikTreatments.handleChange}
          error={ formikTreatments.touched.frequencyTreatment && Boolean(formikTreatments.errors.frequencyTreatment) }
          helperText={ formikTreatments.touched.frequencyTreatment && formikTreatments.errors.frequencyTreatment }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='days'
          name='days'
          type='number'
          label='Días de aplicación'
          variant='outlined'
          size='small'
          value={  medicalHistory || treatment ? formik.values.tratamientos[index].days :  formikTreatments.values.days}
          onChange={medicalHistory ? formik.handleChange : treatment ?  daysHandleChange : formikTreatments.handleChange}
          error={ formikTreatments.touched.days && Boolean(formikTreatments.errors.days) }
          helperText={ formikTreatments.touched.days && formikTreatments.errors.days }
        />
      </Grid> 
    </>
  );
}


export function MedicalHistoryFormDiagnosticTreatmentsForm({ formik, formikTreatments, close, medicalHistory, key }) {

  return (
    <form onSubmit={formikTreatments.handleSubmit}>
    <Grid container spacing={2} sx={{ maxWidth: '400px'}}>
      <MedicalHistoryFormDiagnosticTreatmentsTextFields formikTreatments={formikTreatments} formik={formik} medicalHistory={medicalHistory} key={key}/> 
    </Grid>
    <Grid sx={{ display: 'flex', justifyItems: 'center',  justifyContent: 'space-around', mt:2}}>
      <Button
        onClick={close}
        color='error'
      >
        Cancelar
      </Button>
      <Button type='submit'>
        Agregar
      </Button>
    </Grid>
    </form>
  );
}

export function MedicalHistoryFormDiagnosticSurgicalInterventionsTextFields({ formik, index, medicalHistory, formikIntervations, key, intervation}) {

  const temp = [...formik.values.intervenciones];
  const nameHandleChange = (e) => {
    temp[index].name = e.target.value;
    return formik.setFieldValue('intervenciones', temp)
  }
  const dateInterventionHandleChange = (date) => {
    temp[index].date = date;
    return formik.setFieldValue('intervenciones', temp)
  }
  const descriptionHandleChange= (e) =>{
    temp[index].description = e.target.value;
    return formik.setFieldValue('intervenciones', temp)
  }

  const handleDateChange = (date) => {
    formikIntervations.setFieldValue('date', date);
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id='name'
          name='name'
          label='Nombre de intervención'
          variant='outlined'
          size='small'
          value={ medicalHistory || intervation ? formik.values.intervenciones[index].name : formikIntervations.values.name}
          onChange={ medicalHistory ? formik.handleChange : intervation ?  nameHandleChange : formikIntervations.handleChange}
          error={ formikIntervations.touched.name && Boolean(formikIntervations.errors.name) }
          helperText={ formikIntervations.touched.name && formikIntervations.errors.name }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month', 'day']}
            slotProps={{ textField: { size: 'small' } }}
            label='Fecha de intervención'
            value={ medicalHistory || intervation ? formik.values.intervenciones[index].date : formikIntervations.values.date}
            onChange={ medicalHistory ? formik.handleChange : intervation ?  dateInterventionHandleChange : handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                name='date'
                id='date'
                error={ formikIntervations.touched.date && Boolean(formikIntervations.errors.date) }
                helperText={ formikIntervations.touched.date && formikIntervations.errors.date }
              />
            )}
            disablePast // Deshabilitar fechas antes al día de hoy
            clearable // Permitir borrar la fecha seleccionada
            format="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id='description'
          name='description'
          label='Descripción'
          variant='outlined'
          size='small'
          value={  medicalHistory || intervation ? formik.values.intervenciones[index].description : formikIntervations.values.description }
          onChange={medicalHistory ? formik.handleChange : intervation ?  descriptionHandleChange : formikIntervations.handleChange}
          error={ formikIntervations.touched.description && Boolean(formikIntervations.errors.description) }
          helperText={ formikIntervations.touched.description && formikIntervations.errors.description }
        />
      </Grid>
    </>
  );
}

export function MedicalHistoryFormDiagnosticSurgicalIntervationsForm({ formik, formikIntervations, close, medicalHistory, key }) {

  return (
    <form onSubmit={formikIntervations.handleSubmit}>
    <Grid container spacing={2} sx={{ maxWidth: '400px'}}>
      <MedicalHistoryFormDiagnosticSurgicalInterventionsTextFields formikIntervations={formikIntervations} formik={formik} medicalHistory={medicalHistory} key={key}/> 
    </Grid>
    <Grid sx={{ display: 'flex', justifyItems: 'center',  justifyContent: 'space-around', mt:2}}>
      <Button
        onClick={close}
        color='error'
      >
        Cancelar
      </Button>
      <Button type='submit'>
        Agregar
      </Button>
    </Grid>
    </form>
  );
}


export function MedicalHistoryFormDiagnosticTextFields({ formik, medicalHistory }) {

  const [showModalTreatment, setShowModalTreatment] = useState(false);
  const [showModalIntervation, setShowModalIntervation] = useState(false);

  const onOpenCloseModalTreatment = () => setShowModalTreatment((prevState) => !prevState);
  const onOpenCloseModalIntervation = () => setShowModalIntervation((prevState) => !prevState);

  const onReload = () => setReload((prevState) => !prevState);

  const formikTreatments = useFormik({
    initialValues: initialTreatmentsValues(),
    validationSchema: medicalHistoryTreatmentsSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      formik.setFieldValue('tratamientos', [...formik.values.tratamientos, formValue]);
      formikTreatments.resetForm();
      onOpenCloseModalTreatment();
    }
  });

  const formikIntervations = useFormik({
    initialValues: initialIntervationsValues(),
    validationSchema: medicalHistoryIntervationsSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      formik.setFieldValue('intervenciones', [...formik.values.intervenciones, formValue]);
      formikIntervations.resetForm();
      onOpenCloseModalIntervation();
    }
  });

  const onDeleteTreatments = (index) =>{
    const temp = [...formik.values.tratamientos]
    temp.splice(index, 1);
    formik.setFieldValue('tratamientos', [...temp]);
  }

  const onDeleteIntervations = (index) =>{
    const temp = [...formik.values.intervenciones]
    temp.splice(index, 1);
    formik.setFieldValue('intervenciones', [...temp]);
  }
  
  console.log(formikIntervations.isValid);

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
        sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
      >
        <Typography fontWeight='bold'>{'Tratamientos'}</Typography>
      </Divider>
      <br />
      <Grid container spacing={2} sx={{ maxWidth: '97%', margin: '0' }}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyItems: 'center',  justifyContent: 'center'}}>
          <Button variant='outlined' onClick={onOpenCloseModalTreatment}>
            Agregar tratamiento
          </Button>
        </Grid>
        {showModalTreatment && (
          <Modal_medicalHistory
            show={showModalTreatment}
            title='Crear tratamiento'
          >
            <MedicalHistoryFormDiagnosticTreatmentsForm formik={formik} formikTreatments={formikTreatments} close={onOpenCloseModalTreatment} />
          </Modal_medicalHistory>
        )}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyItems: 'center',  justifyContent: 'center', margin: '0 auto'}}>
          <TextField
            fullWidth
            id='cantidadTratamientos'
            name='cantidadTratamientos'
            label='Cantidad de tratamientos'
            variant='outlined'
            size='small'
            type='number'
            value={formik.values.tratamientos.length}
            onChange={formik.handleChange}
            error={ formik.touched.tratamientos && Boolean(formik.errors.tratamientos) }
            helperText={ formik.touched.tratamientos && formik.errors.tratamientos }
          />
        </Grid>
        { map(formik.values.tratamientos, (treatment, index) => (
          <>
            <Divider sx = {{ width: '100%', my:2 }}>
              <Typography>{ 'Tratamiento ' + (index + 1)}</Typography>
            </Divider>
            <Grid container sx={{ display: 'flex', flexDirection: 'row' }} justifyContent='flex-end' spacing={2} >
              <Grid container  sx={{ display: 'flex', flexDirection: 'row', mt:1 , ml:0.1 }} spacing={2} xs={10} md={10}>  
                <MedicalHistoryFormDiagnosticTreatmentsTextFields index = {index} formik={formik} formikTreatments={formik} medicalHistory={medicalHistory} treatment={treatment}/>
              </Grid>
              <ListItemAvatar sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto', alignItems: 'center', height:'100%' }}>
                <Grid item xs={1} md={1}>
                  <IconButton onClick={() => onDeleteTreatments(index)}>
                    <DeleteIcon sx={{ fontSize: 30, color: '#f44336'}} />
                  </IconButton>
                </Grid>
              </ListItemAvatar>
            </Grid>
          </>
      
        ))}
      </Grid>
      <br />
      <Divider
        container
        spacing={2}
        sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
      >
        <Typography fontWeight='bold'>{'Intervenciones médicas'}</Typography>
      </Divider>
      <br />
      <Grid container spacing={2} sx={{ maxWidth: '97%', margin: '0' }}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyItems: 'center',  justifyContent: 'center'}}>
          <Button variant='outlined' onClick={onOpenCloseModalIntervation}>
            Agregar Intervención
          </Button>
        </Grid>
        {showModalIntervation && (
          <Modal_medicalHistory
            show={showModalIntervation}
            title='Crear tratamiento'
          >
            <MedicalHistoryFormDiagnosticSurgicalIntervationsForm formik={formik} formikIntervations={formikIntervations} close={onOpenCloseModalIntervation} />
          </Modal_medicalHistory>
        )}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyItems: 'center',  justifyContent: 'center', margin: '0 auto'}}>
          <TextField
            fullWidth
            id='cantidadIntervenciones'
            name='cantidadIntervenciones'
            label='Cantidad de intervenciones'
            variant='outlined'
            size='small'
            type='number'
            value={formik.values.intervenciones.length}
            onChange={formik.handleChange}
            disabled={true}
            //error={ formik.touched.cantidadIntervenciones && Boolean(formik.errors.cantidadIntervenciones) }
            //helperText={ formik.touched.cantidadIntervenciones && formik.errors.cantidadIntervenciones }
          />
        </Grid>
        { map(formik.values.intervenciones, (intervation, index) => (
          <>
            <Divider sx = {{ width: '100%', my:2 }}>
              <Typography>{ 'Intervención ' + (index + 1)}</Typography>
            </Divider>
            <Grid container sx={{ display: 'flex', flexDirection: 'row' }} justifyContent='flex-end' spacing={2} >
              <Grid container  sx={{ display: 'flex', flexDirection: 'row', mt:1 , ml:0.1 }} spacing={2} xs={10} md={10}>  
                <MedicalHistoryFormDiagnosticSurgicalInterventionsTextFields index = {index} formik={formik} formikIntervations={formik} medicalHistory={medicalHistory} intervation={intervation}/>
              </Grid>
              <ListItemAvatar sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto', alignItems: 'center', height:'100%' }}>
                <Grid item xs={1} md={1}>
                  <IconButton onClick={() => onDeleteIntervations(index)}>
                    <DeleteIcon sx={{ fontSize: 30, color: '#f44336'}} />
                  </IconButton>
                </Grid>
              </ListItemAvatar>
            </Grid>
          </>
      
        ))}
      </Grid> 
    </Box>
  );
}

const MedicalHistoryForm = (props) => {
  const { close, medicalHistory, idPet} = props;
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


  const queryClient = useQueryClient();
  const createPetMutation = useMutation({
    mutationFn: async ({ idUser, formValue }) => {
      const accessToken = authController.getAccessToken();

      // Ejecutar la creación de la mascota primero
      const response = await petsController.createPets(
        accessToken,
        idPet,
        formValue
      );

      if (fileCharged) {
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

  console.log(validationSchemaPetRegister(medicalHistory, activeStep));
  //manipulacion y validacion de los campos
  const formik = useFormik({
    initialValues: initialPetValues(medicalHistory),
    validationSchema: validationSchemaPetRegister(medicalHistory, activeStep),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
      if (activeStep === steps.length - 1 ){     
        if (!pet) {
          // createPetMutation.mutate({ idUser, formValue });
          //console.log(formValue);
          /*createPetMuatation.mutate({ medicalHistoryId: medicalHistoryId, formValue });

        setTimeout(() => {
          close();
        }, 1500);*/
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
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button type='submit'>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
