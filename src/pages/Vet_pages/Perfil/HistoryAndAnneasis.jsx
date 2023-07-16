import React from 'react';

//mui material
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Avatar } from '@mui/material';

import PetsIcon from '@mui/icons-material/Pets';

export function HistoryAndAnneasis({ pet }) {
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
            <b>Posee Todas sus vacunas?: </b>
            <span style={{ color: 'gray' }}>
              {' '}
              {pet.medicalHistory.isHaveAllVaccine == true
                ? 'No posee'
                : 'Si posee'}
            </span>
            <br />
            <b>Nacimiento de la mascota U adquisición: </b>
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
              <b>Documentos médicos: </b>
              <span style={{ color: 'gray' }}>
                <b>aqui ira la url del documento</b>
              </span>
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
