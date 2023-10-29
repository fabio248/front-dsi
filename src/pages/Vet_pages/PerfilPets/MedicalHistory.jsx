import React, { useState } from 'react';

// mui material elements
import { Divider, Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import { Pets, ModeEdit, Visibility, HistoryEdu, Vaccines, LocalHospital, FileCopy, AdfScanner } from "@mui/icons-material";
import { createTheme, ThemeProvider, ListItemAvatar, ListItemIcon, ListItemText, List, ListItem } from '@mui/material';
import { size, map } from 'lodash';
import {Modal_medicalHistory} from "../../../shared/Modal_MedicalHistory/index.jsx";
import { Modal_verInfoClientAndPet } from "../../../shared/modal_visualizar_ClientAndPet"
import {
  MedicalHistoryForm
} from "../../../components/Vet_components/MedicalHistory/MedicalHistoryForm/MedicalHistoryForm.jsx";
import { MedicalSeeForm } from "../../../components/Vet_components/MedicalHistory/MedicalSeeForm"
import {useNavigate, useParams} from "react-router-dom";

const defaultTheme = createTheme();

export function PetMedicalHistory({ medicalHistory, petId }) {
  let params = useParams();
  const navigate = useNavigate();
  //Modal informacion concreta
  const [showVisualizar, setShowVisualizar] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  const onOpenInfoClientAndPets = () =>
    setShowVisualizar((prevState) => !prevState);

  const [titleSeeInfoClientAndPet, setTitleSeeInfoClientAndPet] = useState('');

  //ejecuta la funcion de visualizacion de informacion de cliente y su mascota (Visibility)
  const openInfoClientAndPets = () => {
    setTitleSeeInfoClientAndPet(`Datos específicos de la mascota`);
    onOpenInfoClientAndPets();
  };

   const onOpenCloseModal = () => setShowEditModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <div>
    <ThemeProvider theme={defaultTheme}>
      <ListItem
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Avatar sx={{ mx: 4, width: 50, height: 50, bgcolor: '#8EC167' }}>
          <HistoryEdu sx={{ fontSize: 40 }} />
        </Avatar>
        <ListItemText>
          <br />
          <b
            className='estilos-pets'
            style={{ justifyContent: 'space-around' }}
          >
            <b>ID: </b>
            <span style={{ color: 'gray' }}>{medicalHistory.id}</span>
            <br />
            <b>Fecha de registro: </b>
            <span style={{ color: 'gray' }}>{medicalHistory.createdAt}</span>
            <br />
            <b>Diagnostico: </b>
            <span style={{ color: 'gray' }}>{medicalHistory?.diagnostic?.description}</span>
            <br />
            <b>Tratamiento: </b>
            <span style={{ color: 'gray' }}>
            { map(medicalHistory.diagnostic?.treatments, (medication) => (
                <ListItem key={medication.id} sx={{ m: 0, ml:2, p:0 }}>
                    <ListItemIcon>
                        <Vaccines sx={{ color:'#8EC167' }} />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m:0, ml: -3, p:0 }}
                        primary={medication.name}
                        secondary={medication.frequency}
                    />
                </ListItem>
            ))}
            </span>
            <b>Intervención quirúrgica: </b>
            <span style={{ color: 'gray' }}>
            {!medicalHistory?.diagnostic?.surgicalIntervations ? 'No ha tenido' 
            : map(medicalHistory.diagnostic.surgicalIntervations, (surgicalIntervation) => (
                <ListItem key={surgicalIntervation.id} sx={{ m: 0, ml:2, p:0 }}>
                    <ListItemIcon>
                        <LocalHospital sx={{ color:'#8EC167' }} />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m:0, ml: -3, p:0 }}
                        primary={surgicalIntervation.name}
                        secondary={surgicalIntervation.intervationDate}
                    />
                </ListItem>
            ))
            }</span>
            <br />
          </b>
        </ListItemText>
        <ListItemAvatar sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
          <Grid container justifyContent='flex-end'>
            <Grid item>
                <IconButton color='info' onClick={openInfoClientAndPets}>
                  <Tooltip title="Ver detalle" arrow={true}>
                    <Visibility sx={{ fontSize: 30 }} />
                  </Tooltip>
                </IconButton>
              <IconButton color='warning' onClick={onOpenCloseModal} >
                <Tooltip title="Editar Hoja Clinica" arrow={true}>
                  <ModeEdit sx={{ fontSize: 30 }} />
                </Tooltip>
              </IconButton>
                <IconButton color="success" onClick={()=>navigate(`medical-history/${medicalHistory.id}`)}>
                  <Tooltip title="Generar PDF" arrow={true}>
                    <AdfScanner sx={{ fontSize: 30 }} />
                  </Tooltip>
                </IconButton>
            </Grid>
          </Grid>
        </ListItemAvatar>
      </ListItem>
      <Divider>
        <Pets color='disabled' />
      </Divider>
    </ThemeProvider>
        {
            showVisualizar && (
                <Modal_verInfoClientAndPet
                    show={showVisualizar}
                    close={openInfoClientAndPets}
                    title={"Detalles del historial médico"}
                >

                    <MedicalSeeForm close={openInfoClientAndPets} medicalHistory={medicalHistory}/>
                </Modal_verInfoClientAndPet>
            )
        }
      {showEditModal && (
        <Modal_medicalHistory
          show={showEditModal}
          close={onOpenCloseModal}
          title='Editar hoja clinica'
        >
          <MedicalHistoryForm close={onOpenCloseModal} onReload={onReload}  petId={params.petId} medicalHistory = {medicalHistory}/>
        </Modal_medicalHistory>
      )}
    </div>
  );
}
