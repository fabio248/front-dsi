import React from 'react';

//mui material
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar, Button } from '@mui/material';

import PetsIcon from '@mui/icons-material/Pets';

export function HistoryAndAnneasis({ pet }) {
  const renderDocuments = () => {
    if (!pet.medicalHistory.files || pet.medicalHistory.files.length === 0) {
      // Mostrar el mensaje si no hay documentos médicos
      return (
        <tr>
          <td style={{ color: 'violet' }} colSpan={2}>
            ¡No se encontraron documentos cargados!
          </td>
        </tr>
      );
    }

    return pet.medicalHistory.files.map((file, index) => (
      <tr key={index}>
        <td>Documento {index + 1}</td>
        <td>
          <Button
            style={{
              width: '150px',
              color: 'blue',
              backgroundColor: 'white',
              border: '2px solid black',
            }}
            onClick={() => handleDocumentClick(file.url)}
          >
            Ver
          </Button>
        </td>
      </tr>
    ));
  };

  const handleDocumentClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className='container'>
      <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Avatar sx={{ mx: 4, width: 60, height: 60 }}>
          <PetsIcon sx={{ fontSize: 45 }} />
        </Avatar>
        <ListItemText>
          <br />
          <b
            className='estilos-pets'
            style={{ justifyContent: 'space-around' }}
          >
            <b>Nombre de la mascota: </b>
            <span style={{ color: 'gray' }}>{pet.name}</span>
            <br />
            <b>Especie: </b>
            <span style={{ color: 'gray' }}>{pet.specie.name}</span>
            <br />
            <b>Raza: </b>
            <span style={{ color: 'gray' }}>{pet.raza}</span>
            <br />
            <b>Género: </b>
            <span style={{ color: 'gray' }}>{pet.gender}</span>
            <br />
            <b>¿Tatuajes o marcas?: </b>
            <span style={{ color: 'gray' }}>
              {pet.isHaveTatto === true ? 'Si posee' : 'No posee'}
            </span>
            <br />
            <b>¿Posee Todas sus vacunas?: </b>
            <span style={{ color: 'gray' }}>
              {' '}
              {pet.medicalHistory.isHaveAllVaccine == true
                ? 'No posee'
                : 'Si posee'}
            </span>
            <br />
            <b>Nacimiento de la mascota o Adquisición: </b>
            <span style={{ color: 'gray' }}>{pet.birthday}</span>
            <br />
            <b>Color del pelaje: </b>
            <span style={{ color: 'gray' }}>{pet.color}</span>
            <br />
            <div
              style={{
                borderBottom: '3px solid grey',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Historial Médico</span>
            </div>
            <br />
            <>
              <b>Cantidad alimenticia: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.food.quantity}
              </span>
              <br />
              <b>Tipos de alimentos: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.food.type}
              </span>
              <br />
              <b>Descendientes: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.descendants}
              </span>
              <br />
              <b>¿Otras mascotas?: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.otherPet.isLiveOtherPet === true
                  ? 'No Convive'
                  : 'Si Convive'}
              </span>
              <br />
              <b>Reproducción: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.isReproduced === true
                  ? 'Si se ha reproducido'
                  : 'No se ha reproducido'}
              </span>
              <br />
              <b>Desarrollo de la enfermedad: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.diasesEvaluation}
              </span>
              <br />
              <b>Observaciones de la mascota: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.observation}
              </span>
              <br />
              <b>Habitáculo de la mascota: </b>
              <span style={{ color: 'gray' }}>{pet.medicalHistory.room}</span>
              <div
                style={{
                  borderBottom: '3px solid grey',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span>Examen Físico</span>
              </div>
              <br />
              <b>Peso de la mascota: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.physicalExam.weight} Kg
              </span>
              <br />
              <b>Palpitaciones: </b>
              <span style={{ color: 'gray' }}>
                {pet.medicalHistory.physicalExam.palpitations}
              </span>
              <br />
              <br />
              {pet.medicalHistory.files ? (
                <table style={{ width: '100%', marginTop: '8px' }}>
                  <thead>
                    <tr>
                      <th>Documentos médicos:</th>
                      <th>Visitar Documento</th>
                    </tr>
                  </thead>
                  <tbody>{renderDocuments()}</tbody>
                </table>
              ) : (
                <b> </b>
              )}

              <br />
            </>
          </b>
        </ListItemText>
      </ListItem>
      <Divider>
        <PetsIcon color='disabled' />
      </Divider>
    </div>
  );
}
