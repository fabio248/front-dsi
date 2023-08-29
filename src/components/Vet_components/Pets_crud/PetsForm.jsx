import React, { useState, useCallback } from 'react';

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
// import { initialValues, validationSchemaRegister } from './UserFormValidate';

//Backend petitions
import { Species } from '../../../api/specie.api';
import { ApiAuth } from '../../../api/Auth.api';
import { Pets } from '../../../api/Pets.api';

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
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Alerta } from '../../../shared';

//hooks accessToken
import { useAuth } from '../../../hooks';
// Validations and initialValues
import {
  initialPetValues,
  validationSchemaPetRegister,
} from './PetsFromValidate';

//estilos
import './PetsFrom.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const specieController = new Species();
const authController = new ApiAuth();
const petsController = new Pets();

export function PetFormTextFields({ formik, onBinaryStrChange, onDropFile }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [openSpecieList, setOpenSpeciesList] = useState(false);

  const { data: speciesCatalog = [] } = useQuery({
    queryKey: ['species'],
    queryFn: async () => {
      const accessToken = authController.getAccessToken();
      const data = await specieController.getAllspecies(accessToken);
      return data;
    },
  });

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
    fullWidth: true,
    height: '100%',
    ml: 0,
  };

  const gender = [
    { label: 'macho', key: 'M', value: 'macho' },
    { label: 'hembra', key: 'F', value: 'hembra' },
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
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id='specie'
            name='specie'
            size='small'
            open={openSpecieList}
            onOpen={() => {
              setOpenSpeciesList(true);
            }}
            onClose={() => {
              setOpenSpeciesList(false);
            }}
            isOptionEqualToValue={(speciesCatalog, value) => {
              speciesCatalog.id === value.id;
            }}
            getOptionLabel={(speciesCatalog) => speciesCatalog.name}
            options={speciesCatalog}
            onChange={(e, value) => formik.setFieldValue('specie', value)}
            value={formik.values.specie}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Seleccione una especie'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
                error={formik.touched.specie && formik.errors.specie}
                helperText={formik.touched.specie && formik.errors.specie}
              />
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
            error={formik.touched.raza && Boolean(formik.errors.raza)}
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
          <Box sx={{ border: '1px solid #ccc', borderRadius: '5px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  id='isHaveTattoo'
                  name='isHaveTattoo'
                  size='small'
                  checked={formik.values.isHaveTattoo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label='¿Posee tatuajes?'
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
              <TextField
                {...params}
                label='Seleccione el género'
                error={formik.touched.gender && formik.errors.gender}
                helperText={formik.touched.gender && formik.errors.gender}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '5px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  id='pedigree'
                  name='pedigree'
                  size='small'
                  checked={formik.values.pedigree}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label='¿Posee pedigree?'
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
      </Grid>
      <br />
      <Divider
        container
        spacing={2}
        sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
      >
        {'Anamnesis '}
      </Divider>
      <br />
      <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0' }}>
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
      <br />
      <Divider
        container
        spacing={2}
        sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
      >
        {'Examen Físico '}
      </Divider>
      <br />
      <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0' }}>
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
            error={
              formik.touched.palpitaciones &&
              Boolean(formik.errors.palpitaciones)
            }
            helperText={
              formik.touched.palpitaciones && formik.errors.palpitaciones
            }
          />
        </Grid>
        <Grid container spacing={3} sx={{ fullWidth: true, margin: 0 }}>
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
    </>
  );
}

const PetsForm = (props) => {
  const { close, pet, idUser } = props;
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  //data for file amazon
  const [uploadData, setUploadData] = useState(null);
  const [fileOriginal, setFileOriginal] = useState(null);
  const [fileCharged, setFileCharged] = useState(false);

  const queryClient = useQueryClient();
  const createPetMutation = useMutation({
    mutationFn: async ({ idUser, formValue }) => {
      const accessToken = authController.getAccessToken();

      // Ejecutar la creación de la mascota primero
      const response = await petsController.createPets(
        accessToken,
        idUser,
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
          await amazonPeticionForFile(url, uploadData, fileOriginal);
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

  //manipulacion y validacion de los campos
  const formik = useFormik({
    initialValues: initialPetValues(pet),
    validationSchema: validationSchemaPetRegister(pet),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (!pet) {
        createPetMutation.mutate({ idUser, formValue });
      }
      //aqui ira la peticion donde se actualizaran los datos
      updatePetMuatation.mutate({ petId: pet.id, formValue });

      setTimeout(() => {
        close();
      }, 1500);
    },
  });
  return (
    <>
      <div className='hide-scrollbar'>
        <form onSubmit={formik.handleSubmit}>
          {/*Campos de llenado del fomrulario*/}
          <PetFormTextFields
            formik={formik}
            onBinaryStrChange={handleBinaryStrChange}
            onDropFile={handleDropFile}
          />

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
          {success && (
            <Alerta
              type={'success'}
              title={
                pet ? 'Mascota actuallizado' : 'Usuario y mascota registrado'
              }
              message={
                pet
                  ? 'Se ha actualizado correctamente la mascota'
                  : 'Se ha registrado correctamente'
              }
              strong={pet ? `${pet.name}` : 'Verifica el registro'}
            />
          )}
          {isError && (
            <Alerta
              type={'error'}
              title={'¡Ha ocurrido un problema!'}
              message={
                pet
                  ? 'No se ha podido actualizar mascota'
                  : 'No se ha podido completar el registro'
              }
              strong={pet ? `${pet.name}` : 'Verifica la información ingresada'}
            />
          )}
        </form>
      </div>
    </>
  );
};

export { PetsForm };
