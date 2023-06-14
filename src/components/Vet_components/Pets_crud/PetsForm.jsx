import React, { useState, useCallback } from 'react';

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
// import { initialValues, validationSchemaRegister } from './UserFormValidate';

//Backend petitions

//MUI Material
import Autocomplete from '@mui/material/Autocomplete';
import {
  Grid,
  TextField,
  FormHelperText,
  Button,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


//estilos
import './PetsFrom.css';

export function PetFormTextFields({formik}){

  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && isFileValid(file)) {
      setUploadedFile(file);
      setErrorMessage('');
      setIsError(false);
    } else {
      setUploadedFile(null);
      setErrorMessage(
        'Formato de archivo no válido. Se aceptan archivos PDF, Word y imágenes (PNG, JPG, JPEG).'
      );
      setIsError(true);
    }
  }, []);

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
    fullWidth: true,
    height: '100%',
    ml:0
  };

  const tatuaje = [
    { label: 'Sí', key: 'yes', value: true },
    { label: 'No', key: 'not', value: false },
  ];

  const gender = [
    { label: 'Macho', key: 'M', value: 'masculino' },
    { label: 'Hembra', key: 'F', value: 'femenino' },
  ];

  const pedigree = [
    { label: 'Sí', key: 'yes', value: true },
    { label: 'No', key: 'not', value: false },
  ];

  const convivencia = [
    { label: 'Sí', key: 'yes', value: true },
    { label: 'No', key: 'not', value: false },
  ];

  const vacune = [
    { label: 'Sí', key: 'yes', value: true },
    { label: 'No', key: 'not', value: false },
  ];

  const reproduccion = [
    { label: 'Sí', key: 'yes', value: true },
    { label: 'No', key: 'not', value: false },
  ];

  const specie = [
    { label: 'Canino', key: 'can', value: 1 },
    { label: 'Felino', key: 'feli', value: 2 },
    { label: 'Cetoácido', key: 'cet', value: 3 },
    { label: 'Roedor', key: 'ro', value: 4 },
    { label: 'Saurio', key: 'sau', value: 5 },
    { label: 'Quelo', key: 'que', value: 6 },
    { label: 'Ofilio', key: 'ofi', value: 7 },
  ];

  const handleDateChange = (date) => {
    formik.setFieldValue('birthday', date);
  };


  return (
    <>
      <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='name'
            label='Nombre'
            variant='outlined'
            size='small'
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={
              formik.touched.name && Boolean(formik.errors.name)
            }
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='specie'
            name='specie'
            size='small'
            options={specie}
            onChange={(_, data) =>
              formik.setFieldValue('specie', data?.value || '')
            }
            value={formik.values.specie}
            renderInput={(params) => (
              <TextField {...params} 
              label='Seleccione una especie'
              error={formik.touched.specie && formik.errors.specie}
              helperText={formik.touched.specie && formik.errors.specie}/>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='raza'
            label='Raza'
            variant='outlined'
            size='small'
            value={formik.values.raza}
            onChange={formik.handleChange}
            error={
             formik.touched.raza && Boolean(formik.errors.raza)
            }
            helperText={formik.touched.raza && formik.errors.raza}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='color'
            label='Color del pelaje'
            variant='outlined'
            size='small'
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && formik.errors.color}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='specie'
            name='isHaveTattoo'
            size='small'
            options={tatuaje}
            onChange={(_, data) =>
              formik.setFieldValue('isHaveTattoo', data?.value || '')
            }
            value={formik.values.isHaveTattoo}
            renderInput={(params) => (
              <TextField {...params} 
              label='¿Posee tatuajes?'
              error={formik.touched.isHaveTattoo && formik.errors.isHaveTattoo}
              helperText={formik.touched.isHaveTattoo && formik.errors.isHaveTattoo}/>
            )}
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
                  error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                />
              )}
              disableFuture // Deshabilitar fechas posteriores al día de hoy
              showTodayButton // Mostrar botón para seleccionar la fecha actual
              clearable // Permitir borrar la fecha seleccionada
              format = 'dd/MM/yyyy'
            />
            {formik.touched.birthday && formik.errors.birthday && (
              <FormHelperText error>{formik.errors.birthday}</FormHelperText>
            )}
          </LocalizationProvider>
            </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='gender'
            name='gender'
            size='small'
            options={gender}
            onChange={(_, data) =>
              formik.setFieldValue('gender', data?.value || '')
            }
            value={formik.values.gender}
            renderInput={(params) => (
              <TextField {...params} 
              label='Seleccione el género'
              error={formik.touched.gender && formik.errors.gender}
              helperText={formik.touched.gender && formik.errors.gender}/>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='pedigree'
            name='pedigree'
            size='small'
            options={pedigree}
            onChange={(_, data) =>
              formik.setFieldValue('pedigree', data?.value || '')
            }
            value={formik.values.pedigree}
            renderInput={(params) => (
              <TextField {...params}
              label='¿Posee pedigree?'
              error={formik.touched.pedigree && formik.errors.pedigree}
              helperText={formik.touched.pedigree && formik.errors.pedigree}/>
            )}
          />
        </Grid>
      </Grid>
      <br />
      <Divider
        container
        spacing={2}
        sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
      >
        {'Annaesis '}
      </Divider>
      <br />
      <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id='quantityFood'
            name='quantityFood'
            label="Cantidad de alimento"
            variant='outlined'
            size='small'
            value={formik.values.quantityFood}
            onChange={formik.handleChange}
            error={formik.touched.quantityFood && Boolean(formik.errors.quantityFood)}
            helperText={formik.touched.quantityFood && formik.errors.quantityFood}
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
            error={formik.touched.descendencia && Boolean(formik.errors.descendencia)}
            helperText={formik.touched.descendencia && formik.errors.descendencia}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='reproduccion'
            name='reproduccion'
            size='small'
            options={reproduccion}
            onChange={(_, data) =>
              formik.setFieldValue('reproduccion', data?.value || '')
            }
            value={formik.values.reproduccion}
            renderInput={(params) => (
              <TextField {...params} 
              label='Reproducción'
              error={formik.touched.reproduccion && formik.errors.reproduccion}
              helperText={formik.touched.reproduccion && formik.errors.reproduccion}/>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='vacuna'
            name='vacuna'
            size='small'
            options={vacune}
            onChange={(_, data) =>
              formik.setFieldValue('vacuna', data?.value || '')
            }
            value={formik.values.vacuna}
            renderInput={(params) => (
              <TextField {...params} 
              label='¿Posee todas sus vacunas?'
              error={formik.touched.vacuna && formik.errors.vacuna}
              helperText={formik.touched.vacuna && formik.errors.vacuna}/>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
              disablePortal
              id='convivencia'
              name='conivencia'
              size='small'
              options={convivencia}
              onChange={(_, data) =>
                formik.setFieldValue('convivencia', data?.value || '')
              }
              value={formik.values.convivencia}
              renderInput={(params) => (
                <TextField {...params} 
                label='¿Vive con otras mascotas?'
                error={formik.touched.convivencia && formik.errors.convivencia}
                helperText={formik.touched.convivencia && formik.errors.convivencia}/>
              )}
            />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id='whichPets'
            name='whichPets'
            label='Si convive con otras mascotas, ¿Cuáles mascotas?'
            variant='outlined'
            size='small'
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
            error={formik.touched.enfermedad && Boolean(formik.errors.enfermedad)}
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
            error={formik.touched.observacion && Boolean(formik.errors.observacion)}
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
            error={formik.touched.habitaculo && Boolean(formik.errors.habitaculo)}
            helperText={formik.touched.habitaculo && formik.errors.habitaculo}
          />
        </Grid>
      </Grid>
      <br />
      <Divider
        container
        spacing={2}
        sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
      >
        {'Examen Físico '}
      </Divider>
      <br />
      <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0'  }}>
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
            inputProps={{
              inputMode: 'numeric',
            }}
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
            error={formik.touched.palpitaciones && Boolean(formik.errors.palpitaciones)}
            helperText={formik.touched.palpitaciones && formik.errors.palpitaciones}
          />
        </Grid>
        <Grid container spacing={3} sx={{ fullWidth: true, margin: 0 }}>
          <Grid item xs={12} sm={24}>
            <Box {...getRootProps()} sx={dropzoneStyle}>
              <input {...getInputProps()} />
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
                  <Button variant='contained' onClick={handleDelete} size='small' color='error' startIcon={<RemoveCircle />}>
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
    </>
  );
}

const PetsForm = (props) => {
  const { close, pet } = props;

  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  //manipulacion y validacion de los campos
  const formik = useFormik({
    // initialValues: initialValues(user),
    // validationSchema: validationSchemaRegister(user),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!user) {
        } else {
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className='hide-scrollbar'>
        <form onSubmit={formik.handleSubmit}>

          {/*Campos de llenado del fomrulario*/}
          <PetFormTextFields formik = {formik} />

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '0 auto',
              marginTop: '25 auto',
            }}
          >
            <Button
              type='submit'
              size='medium'
              sx={{ mx: 2, marginTop: '12px' }}
            >
              {pet ? 'Actualizar' : 'Registrar'}
            </Button>
            <Button
              color='error'
              onClick={close}
              size='medium'
              sx={{ mx: 2, marginTop: '12px' }}
            >
              Cancelar
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export { PetsForm };
