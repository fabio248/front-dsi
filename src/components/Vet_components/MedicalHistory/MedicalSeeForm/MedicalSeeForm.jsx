import React from 'react';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export function MedicalSeeForm({ medicalHistory }) {

  return (
    <div>
      {/* Render medical history details */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Detalles del historial médico:</Typography>
        <Typography>
          <div>
            <b>Fecha de Creación: </b>
            {medicalHistory.createdAt}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Evaluación de Días: </b>
            {medicalHistory.diasesEvaluation}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>¿Posee todas sus vacunas?: </b>
            {medicalHistory.isHaveAllVaccine ? "Si posee todas sus vacunas":"No posee todas sus vacunas"}
          </div>
        </Typography>
        <Typography>
          <div>
            <b>¿Se ha reproducido?: </b>
            {medicalHistory.isReproduced ? "Si se ha reproducido;" : "No se ha reproducido"}
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
        <div  style={{ fontWeight:"bold" }}>Diagnóstico</div>
        <Typography>
          <div>
            <b>Descripción del diagnóstico: </b>
            {medicalHistory.diagnostic.description}
          </div>
        </Typography>

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
        <div style={{ fontWeight:"bold" }}>Otras mascotas</div>
    <Typography>
          <div>
            <b>Convive con otras mascotas: </b>
            {medicalHistory.otherPet.isLiveOtherPets ? "Si convive con otras mascotas ": "No convive con otras mascotas"}
          </div>
        </Typography>
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
          </div>
        </Typography>
        <Typography>
          <div>
            <b>Palpitaciones: </b>
            {medicalHistory.physicalExam.palpitations}
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
    </div>
  );
}
