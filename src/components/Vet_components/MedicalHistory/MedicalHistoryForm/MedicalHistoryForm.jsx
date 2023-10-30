import React, { useState } from 'react';

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';

//Backend petitions
import { ApiAuth } from '../../../../api/Auth.api';
import { Pets } from '../../../../api/Pets.api';
import { PetsMedicalHistories } from '../../../../api/MedicalHistory.api';
import {
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
} from '@mui/material';
import { Alerta } from '../../../../shared';
import './medicalHistory.css'

// Validations and initialValues
import {
  initialPetValues,
  validationSchemaPetRegister,
} from './medicalHistoryFormSchema';

//estilos
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MedicalHistoryFormAnamnesisTextFields } from './AnamnesisFields';
import { MedicalHistoryPhysicalExamTextFields } from './PhysicalExamFields';
import { MedicalHistoryFormDiagnosticTextFields } from './DiagnosticFields';

const authController = new ApiAuth();
const petsController = new Pets();
const medicalHistoryController = new PetsMedicalHistories();

const steps = ['Anamnesis', 'Examen Físico', 'Diagnóstico'];

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
    onSuccess: async () => {
      setSuccess(true);
      await queryClient.invalidateQueries(['pets']);
    },
    onError: () => {
      setIsError(true);
    },
  });

  const updateMedicalHistoryMutation = useMutation({
    mutationFn: async ({ petId, medicalHistory, formValue }) => {
      const accessToken = authController.getAccessToken();
      if (fileCharged) {
        const { url } = await petsController.filePets(
          accessToken,
          fileOriginal.type,
          petId,
          medicalHistory.id
        );
        try {
          amazonPeticionForFile(url, uploadData, fileOriginal);
        } catch (error) {
          console.error('Error al cargar el archivo en AWS S3:', error);
        }
      }
      return await medicalHistoryController.update(accessToken, petId, medicalHistory, formValue);
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
      if (activeStep === steps.length){     
        if (!medicalHistory) {
          createMedicalHistoryMutation.mutate({ petId, formValue });
        }
        else{
          updateMedicalHistoryMutation.mutate({ petId, medicalHistory, formValue });
        } 
        setTimeout(() => { 
          close(); 
        }, 2500);
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
            Todos los paso han sido completados
          </Typography>
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
          type={activeStep === 3 ? 'submit' : 'button'}
          onClick={activeStep < 3? validateData : (e) => {e.preventDefault}}
          >
            {activeStep === steps.length ? 'Finalizar' : 'Siguiente'}
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
                medicalHistory ? 'Hoja clinica actualizada' : 'Hoja clinica registrada'
              }
              message={
                medicalHistory
                  ? 'Se ha actualizado correctamente la hoja clinica'
                  : 'Se ha registrado correctamente'
              }
              strong={medicalHistory ? `${medicalHistory.id}` : 'Verifica el registro'}
            />
          )}
          {isError && (
            <Alerta
              type={'error'}
              title={'¡Ha ocurrido un problema!'}
              message={
                medicalHistory
                  ? 'No se ha podido actualizar hoja clinica'
                  : 'No se ha podido completar el registro'
              }
              strong={medicalHistory ? `${medicalHistory.id}` : 'Verifica la información ingresada'}
            />
          )}
      </div>
    </>
  );
};

export { MedicalHistoryForm };
