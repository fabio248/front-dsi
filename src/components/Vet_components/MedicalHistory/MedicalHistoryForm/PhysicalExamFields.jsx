import React, { useState, useCallback, useRef, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CollectionsIcon from '@mui/icons-material/Collections';

import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDropzone } from 'react-dropzone';
import './medicalHistory.css'

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
            '¡Error: Formato de archivo no válido!'
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderColor: isError ? 'red' : isDragReject ? 'red' : '#8EC167',
      borderStyle: 'dashed',
      p: 4,
      textAlign: 'center',
      backgroundColor: 'background.paper',
      cursor: 'pointer',
      height: '100%',
      ml: 0,
      mb: -5,
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
          <Grid container spacing={3} sx={{ margin: '0 auto' }}>
            <Grid item xs={12} sm={12}>
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
                  <>
                    <CloudUploadIcon color= 'secondary' sx={{ fontSize: '4.5rem', mb: 1 }} />
                        <Typography variant='subtitle2' textAlign='center' color= 'secondary' sx={{ fontSize: '1rem'}}>
                            Suelta los archivos aquí...
                        </Typography>
                        <Typography variant='caption' textAlign='center' color= 'secondary' sx={{ fontSize: '0.7rem'}}>
                            Los formatos permitidos para subir son: .pdf, .png, .jpg, .jpeg
                        </Typography>
                  </>
                ) : (
                  <Box>
                    <>
                        {uploadedFile
                            ?   <>
                                    <CloudDoneIcon sx={{ fontSize: '4.5rem', mb: 1}} />
                                    <Box sx={{ m:0, p:0, display: 'flex', flexDirection: 'row' }}>
                                        {
                                            uploadedFile.name.split('.')[1] === 'pdf' 
                                            ? <PictureAsPdfIcon color='secondary' sx={{ fontSize: '1.5rem', mx: 1 }} />
                                            : <CollectionsIcon color='secondary' sx={{ fontSize: '1.5rem', mx: 1 }} />
                                        }
                                        <Typography variant='subtitle2' textAlign='center' color='secondary' sx={{ fontSize: '1rem' }}>
                                            { 'Archivo cargado: ' + uploadedFile.name }
                                        </Typography>
                                    </Box>
                                    <Typography variant='caption' textAlign='center' color= 'secondary' sx={{ fontSize: '0.7rem'}}>
                                       Archivo cargado correctamente
                                    </Typography>
                                </>
                            : 
                            <>
                                <CloudUploadIcon color= {isError ? 'error' : 'secondary'} sx={{ fontSize: '4.5rem', mb: 1 }} />
                                <Typography variant='subtitle2' textAlign='center' color= {isError ? 'error' : 'secondary'} sx={{ fontSize: '1rem'}}>
                                    Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos
                                </Typography>
                                <Typography variant='caption' textAlign='center' color= {isError ? 'error' : 'secondary'} sx={{ fontSize: '0.7rem'}}>
                                    Los formatos permitidos para subir son: .pdf, .png, .jpg, .jpeg
                                </Typography>
                            </>
                        }
                    </>
                  </Box>
                )}
  
                {uploadedFile && (
                  <Box sx={{ mt: 2, mb: -4 }}>
                    <Button
                      variant='outlined'
                      onClick={handleDelete}
                      size='small'
                      color='error'
                      startIcon={<DeleteOutlineIcon sx={{ color: 'Red'}}/>}
                      sx = {{ zIndex: 500000000  }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                )}
                {errorMessage && (
                    <Box sx={{ display: 'flex', flexDirection: 'colum', height: '4vh', alignItems: 'center', mt:7, mb: -7 }}>
                        <ErrorOutlineIcon color='error' sx={{ fontSize: '2rem', mx: 1 }} />
                        <br/>
                        <Typography variant='subtitle2' textAlign='center' color= 'error' sx={{ fontSize: '1rem',}}>
                            {errorMessage}
                        </Typography>
                    </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }