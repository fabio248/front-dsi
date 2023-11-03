import React, {useState} from 'react';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton} from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alerta } from "../../../../shared"
//API SERVICE BACK
import { Files } from "../../../../api/files.api"
import { ApiAuth } from "../../../../api/Auth.api"
import { useMutation, useQueryClient } from '@tanstack/react-query';

//elimination modal for files
import { Modal_delete } from "../../../../shared/modal_delete"


const filesController = new Files()
const authController = new ApiAuth()
export function MedicalSeeForm({ medicalHistory }) {
  const [fileId, setFileId] = useState(null)
  //funcion que habilita la eliminacion
  const [showConfirm, setShowConfirm] = useState(false);

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
  return (
    <div>
      {/* Render medical history details */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Detalles del historial médico:</Typography>
        <Typography>
          <div>
            <b>Fecha de Creación:  </b>
            {medicalHistory.createdAt}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Evaluación de Días:  </b>
            {medicalHistory.diasesEvaluation}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>¿Posee todas sus vacunas?:  </b>
            {medicalHistory.isHaveAllVaccine ? " Si posee todas sus vacunas":"No posee todas sus vacunas"}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>¿Se ha reproducido?:  </b>
            {medicalHistory.isReproduced ? " Si se ha reproducido" : "No se ha reproducido"}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Observaciones: </b>
            {medicalHistory.observation}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Habitaculo: </b>
            {medicalHistory.room}
          </div>
        </Typography>
        <br />
        <div  style={{ fontWeight:"bold" }}>Diagnóstico</div>
        <Typography>
          <div>
            <b>Descripción del diagnóstico: </b>
            {medicalHistory.diagnostic.description}
          </div>
        </Typography>
<br />
    <div  style={{ fontWeight:"bold" }}>Alimentación</div>
        <Typography>
          <div>
            <b>Cantidad de alimento: </b>
            {medicalHistory.food.quantity}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Tipo de alimento: </b>
            {medicalHistory.food.type}
          </div>
        </Typography>
        <br />
        <div style={{ fontWeight:"bold" }}>Otras mascotas</div>
    <Typography>
          <div>
            <b>Convive con otras mascotas: </b>
            {medicalHistory.otherPet.isLiveOtherPets ? "Si convive con otras mascotas ": "No convive con otras mascotas"}
          </div>
        </Typography>
        <br />
        <Typography>
          <div>
            {medicalHistory.food.type ? (
            null
            ) : (<Typography>
                <div>
                    <b>Con cuáles mascotas convive: </b>
                    {medicalHistory.otherPet.type ? medicalHistory.otherPet.type : "No convive con otras mascotas"}
                </div>
            </Typography>)
            
            }
            
          </div>
        </Typography>

        <div  style={{ fontWeight:"bold" }}>Examen Físico</div>
        <Typography>
          <div>
            <b>Peso: </b>
            {medicalHistory.physicalExam.weight}
            <b>  Kg</b>
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Palpitaciones: </b>
            {medicalHistory.physicalExam.palpitations}
            <b>  latidos por minuto</b>
          </div>
        </Typography>
        <Typography>
        <div>
            {medicalHistory.physicalExam.laboratoryExam ? (
            <Typography>
            <div>
                <b>Examen de laboratorio: </b>
                {medicalHistory.physicalExam.laboratoryExam }
            </div>
        </Typography>
            ) : (null)
            
            }
            
          </div>
        </Typography>
        <Typography>
        <div>
            {medicalHistory.physicalExam.cardiacRate ? (
            <Typography>
            <div>
                <b>Ritmo Cardiáco: </b>
                {medicalHistory.physicalExam.cardiacRate }
                <b>  latidos por minuto</b>
            </div>
        </Typography>
            ) : (null)
            
            }
            
          </div>
        </Typography>
        <Typography>
        <div>
            {medicalHistory.physicalExam.temperature ? (
            <Typography>
            <div>
                <b>Temperatura: </b>
                {medicalHistory.physicalExam.temperature }
                <b>  °C</b>
            </div>
        </Typography>
            ) : (null)
            
            }
            
          </div>
        </Typography>
        <Typography>
        <div>
            {medicalHistory.physicalExam.respiratoryRate ? (
            <Typography>
            <div>
                <b>Ritmo de respiración: </b>
                {medicalHistory.physicalExam.respiratoryRate }
                <b>  respiraciones por minuto</b>
            </div>
        </Typography>
            ) : (null)
            
            }
            
          </div>
        </Typography>
        <Typography>
        <div>
            {medicalHistory.physicalExam.pulse ? (
            <Typography>
            <div>
                <b>Pulso: </b>
                {medicalHistory.physicalExam.pulse }
                <b>  latidos por minuto</b>
            </div>
        </Typography>
            ) : (null)
            
            }
            
          </div>
        </Typography>
        <Typography>
        <div>
            {medicalHistory.physicalExam.mucous ? (
            <Typography>
            <div>
                <b>Mucosa: </b>
                {medicalHistory.physicalExam.mucous }
            </div>
        </Typography>
            ) : (null)
            
            }
            
          </div>
        </Typography>
      </Paper>

      {/* Render surgical interventions if available */}
      {medicalHistory.diagnostic.surgicalIntervations && medicalHistory.diagnostic.surgicalIntervations.length > 0 && (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', maxHeight: '300px', overflow: 'auto' }}>
          <Typography variant="h6">Intervenciones Quirúrgicas:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la intervención</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Fecha de Intervención</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalHistory.diagnostic.surgicalIntervations.map((intervention, index) => (
                  <TableRow key={index}>
                    <TableCell>{intervention.name}</TableCell>
                    <TableCell>{intervention.description}</TableCell>
                    <TableCell>{intervention.intervationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Render treatments if available */}
      {medicalHistory.diagnostic.treatments && medicalHistory.diagnostic.treatments.length > 0 && (
        <Paper elevation={3} style={{ padding: '20px', maxHeight: '300px', overflow: 'auto' }}>
          <Typography variant="h6">Tratamientos:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
              <TableCell>Nombre del tratamiento</TableCell>
              <TableCell>Días</TableCell>
              <TableCell>Frecuencia</TableCell>
              <TableCell>Cantidad</TableCell>
              </TableHead>
              <TableBody>
                {medicalHistory.diagnostic.treatments.map((treatment, index) => (
                  <TableRow key={index}>
                    <TableCell>{treatment.name}</TableCell>
                    <TableCell>{treatment.days}</TableCell>
                    <TableCell>{treatment.frequency}</TableCell>
                    <TableCell>{treatment.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

    )}
    <br />
      {/*render information about files for medical history*/}
      {medicalHistory.files && medicalHistory.files.length > 0 && (
  <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', maxHeight: '300px', overflow: 'auto' }}>
    <Typography variant="h6">Documentos de la mascota:</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Documentos médicos</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {medicalHistory.files.map((files, index) => (
          <React.Fragment key={index}>
            <TableRow>
              <TableCell>
                <NavLink to={`${files.url}`} style={{ textDecoration: 'none' }} >
                  <Button variant="outlined" endIcon={<SendIcon />} style={{ marginTop: "5px" }}
                   >
                    Visualizar Archivo: {files.name.split("-")[5]}
                  </Button>
                </NavLink>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => openDeleteProduct(files.name.split("-")[5], files.id)}>
                  <DeleteIcon color='error'/>
                </IconButton>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)}
      <Modal_delete 
      onOpen={showConfirm}
      onCancel={onCloseConfirm}
      onConfirm={onDeleteProduct}
      content={confirmMessage}
      title={titleDelete}
      size='mini'
      ></Modal_delete>
    </div>

  );
}
