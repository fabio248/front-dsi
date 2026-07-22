import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alerta } from '../../../../shared';
//API SERVICE BACK
import { Files } from '../../../../api/files.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//elimination modal for files
import { Modal_delete } from '../../../../shared/modal_delete';

const filesController = new Files();
const authController = new ApiAuth();

//Seccion con titulo, divisor y contenido responsivo
function SectionPaper({ title, children, sx }) {
  return (
    <Paper
      elevation={3}
      sx={{ p: { xs: 2, sm: 3 }, mb: 2, borderRadius: 2, ...sx }}
    >
      <Typography variant='h6' sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      {children}
    </Paper>
  );
}

//Par etiqueta/valor. 1 columna en movil, 2 en escritorio.
//Se oculta cuando el valor esta vacio (para los campos opcionales).
function Detail({ label, value, full = false }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <Grid item xs={12} sm={full ? 12 : 6}>
      <Typography
        variant='caption'
        sx={{
          display: 'block',
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
      <Typography variant='body2' sx={{ wordBreak: 'break-word' }}>
        {value}
      </Typography>
    </Grid>
  );
}

//Tabla envuelta para permitir scroll horizontal en movil
function ResponsiveTable({ children, minWidth = 480 }) {
  return (
    <TableContainer component={Paper} variant='outlined' sx={{ mt: 1 }}>
      <Table sx={{ minWidth }} size='small'>
        {children}
      </Table>
    </TableContainer>
  );
}

export function MedicalSeeForm({ medicalHistory }) {
  const [fileId, setFileId] = useState(null);
  //funcion que habilita la eliminacion
  const [showConfirm, setShowConfirm] = useState(false);
  //feedback al eliminar
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //funcion que cancela la accion de eliminar
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  //mensaje al eliminar
  const [confirmMessage, setConfirmMessage] = useState('');

  //titulo del mensaje
  const [titleDelete, setTitleDelete] = useState('');

  const openDeleteProduct = (fileName, fileId) => {
    setFileId(fileId);
    setTitleDelete(`Eliminar Archivo: ${fileName}`);
    setConfirmMessage(`¿Esta seguro de que desea eliminar este archivo?`);
    onCloseConfirm();
  };

  const accessToken = authController.getAccessToken();
  const queryClient = useQueryClient();
  //mutacion para eliminar el archivo
  const deleteFileMutation = useMutation({
    mutationFn: async ({ accessToken }) => {
      await filesController.deleteFile(accessToken, fileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pets']);
      queryClient.invalidateQueries(['medical-histories']);
      queryClient.invalidateQueries(['files']);
      setSuccess(true);
      onCloseConfirm();
    },
    onError: () => {
      onCloseConfirm();
      setError(true);
    },
  });
  //funcion que elimiar el archivo
  const onDeleteProduct = async () => {
    deleteFileMutation.mutate({ accessToken });
  };

  const { physicalExam, food, otherPet, diagnostic, files } = medicalHistory;

  //Rotulo Si/No reutilizable para los campos booleanos
  const yesNo = (condition, yes, no) => (
    <Chip
      size='small'
      color={condition ? 'success' : 'default'}
      variant='outlined'
      label={condition ? yes : no}
    />
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
      {/* Detalles generales del historial medico */}
      <SectionPaper title='Detalles del historial médico'>
        <Grid container spacing={2}>
          <Detail label='Fecha de Creación' value={medicalHistory.createdAt} />
          <Detail
            label='Evaluación de Días'
            value={medicalHistory.diasesEvaluation}
          />
          <Detail
            label='¿Posee todas sus vacunas?'
            value={yesNo(
              medicalHistory.isHaveAllVaccine,
              'Sí posee todas sus vacunas',
              'No posee todas sus vacunas',
            )}
          />
          <Detail
            label='¿Se ha reproducido?'
            value={yesNo(
              medicalHistory.isReproduced,
              'Sí se ha reproducido',
              'No se ha reproducido',
            )}
          />
          <Detail label='Habitáculo' value={medicalHistory.room} />
          <Detail
            label='Observaciones'
            value={medicalHistory.observation}
            full
          />
        </Grid>
      </SectionPaper>

      {/* Diagnostico */}
      <SectionPaper title='Diagnóstico'>
        <Grid container spacing={2}>
          <Detail
            label='Descripción del diagnóstico'
            value={diagnostic?.description}
            full
          />
        </Grid>
      </SectionPaper>

      {/* Alimentacion */}
      <SectionPaper title='Alimentación'>
        <Grid container spacing={2}>
          <Detail label='Cantidad de alimento' value={food?.quantity} />
          <Detail label='Tipo de alimento' value={food?.type} />
        </Grid>
      </SectionPaper>

      {/* Otras mascotas */}
      <SectionPaper title='Otras mascotas'>
        <Grid container spacing={2}>
          <Detail
            label='Convive con otras mascotas'
            value={yesNo(
              otherPet?.isLiveOtherPets,
              'Sí convive con otras mascotas',
              'No convive con otras mascotas',
            )}
          />
          {otherPet?.isLiveOtherPets && (
            <Detail
              label='Con cuáles mascotas convive'
              value={otherPet?.whichPets}
            />
          )}
        </Grid>
      </SectionPaper>

      {/* Examen fisico */}
      <SectionPaper title='Examen Físico'>
        <Grid container spacing={2}>
          <Detail
            label='Peso'
            value={
              physicalExam?.weight != null ? `${physicalExam.weight} Kg` : ''
            }
          />
          <Detail
            label='Palpitaciones'
            value={
              physicalExam?.palpitations
                ? `${physicalExam.palpitations} latidos por minuto`
                : ''
            }
          />
          <Detail
            label='Ritmo Cardíaco'
            value={
              physicalExam?.cardiacRate
                ? `${physicalExam.cardiacRate} latidos por minuto`
                : ''
            }
          />
          <Detail
            label='Ritmo de respiración'
            value={
              physicalExam?.respiratoryRate
                ? `${physicalExam.respiratoryRate} respiraciones por minuto`
                : ''
            }
          />
          <Detail
            label='Pulso'
            value={
              physicalExam?.pulse
                ? `${physicalExam.pulse} latidos por minuto`
                : ''
            }
          />
          <Detail
            label='Temperatura'
            value={
              physicalExam?.temperature ? `${physicalExam.temperature} °C` : ''
            }
          />
          <Detail label='Mucosa' value={physicalExam?.mucous} />
          <Detail
            label='Examen de laboratorio'
            value={physicalExam?.laboratoryExam}
            full
          />
        </Grid>
      </SectionPaper>

      {/* Intervenciones quirurgicas */}
      {diagnostic?.surgicalIntervations &&
        diagnostic.surgicalIntervations.length > 0 && (
          <SectionPaper title='Intervenciones Quirúrgicas'>
            <ResponsiveTable>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la intervención</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Fecha de Intervención</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diagnostic.surgicalIntervations.map((intervention, index) => (
                  <TableRow key={index}>
                    <TableCell>{intervention.name}</TableCell>
                    <TableCell>{intervention.description}</TableCell>
                    <TableCell>{intervention.intervationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ResponsiveTable>
          </SectionPaper>
        )}

      {/* Tratamientos */}
      {diagnostic?.treatments && diagnostic.treatments.length > 0 && (
        <SectionPaper title='Tratamientos'>
          <ResponsiveTable>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del tratamiento</TableCell>
                <TableCell>Días</TableCell>
                <TableCell>Frecuencia</TableCell>
                <TableCell>Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnostic.treatments.map((treatment, index) => (
                <TableRow key={index}>
                  <TableCell>{treatment.name}</TableCell>
                  <TableCell>{treatment.days}</TableCell>
                  <TableCell>{treatment.frequency}</TableCell>
                  <TableCell>{treatment.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ResponsiveTable>
        </SectionPaper>
      )}

      {/* Documentos de la mascota */}
      {files && files.length > 0 && (
        <SectionPaper title='Documentos de la mascota'>
          <ResponsiveTable minWidth={320}>
            <TableHead>
              <TableRow>
                <TableCell>Documentos médicos</TableCell>
                <TableCell align='right'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <NavLink
                      to={`${file.url}`}
                      target='_blank'
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant='outlined'
                        endIcon={<SendIcon />}
                        size='small'
                        sx={{ textTransform: 'none' }}
                      >
                        Visualizar: {file.name.split('-')[5]}
                      </Button>
                    </NavLink>
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      onClick={() =>
                        openDeleteProduct(file.name.split('-')[5], file.id)
                      }
                    >
                      <DeleteIcon color='error' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ResponsiveTable>
        </SectionPaper>
      )}

      {success && (
        <Alerta
          type='success'
          title='Archivo eliminado'
          message='El archivo se eliminó correctamente.'
          strong='Documento eliminado'
        />
      )}
      {error && (
        <Alerta
          type='error'
          title='¡Ha ocurrido un problema!'
          message='No se ha podido eliminar el archivo.'
          strong='Intenta nuevamente'
        />
      )}

      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeleteProduct}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>
    </Box>
  );
}
