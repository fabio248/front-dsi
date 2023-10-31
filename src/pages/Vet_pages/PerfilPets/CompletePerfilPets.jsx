import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// MUI Material
import {
  Container,
  Box,
  Tab,
  Tabs,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress, IconButton, Tooltip,
} from '@mui/material';
import {
  HistoryEdu,
  Vaccines,
  LocalHospital,
  Flight,
} from "@mui/icons-material";
//render of pets
import { PetMedicalHistory } from './MedicalHistory';
import { PetMedicalHistoryTreatments } from './Treatments';
import { PetMedicalHistorySurgicalIntervations } from './SurgicalIntervations';

//Lodash for render info pets and user
import { size, map } from 'lodash';

// peticiones al Back
import { Pets } from '../../../api/Pets.api';
import { ApiAuth } from '../../../api/Auth.api';
import { useQuery } from '@tanstack/react-query';
import { SharedModal } from '../../../shared/Modal_MedicalHistory/index.jsx';
import { MedicalHistoryForm } from '../../../components/Vet_components/MedicalHistory/MedicalHistoryForm/MedicalHistoryForm';
import {
  ConsentSurgeryPdfForm
} from "../../../components/Vet_components/MedicalHistory/GenerateConsentSurgeryPdf/ConsentSurgeryPdfForm.jsx";
import {SurgeryIcon} from "../../../shared/Icons/index.js";
import {EuthanasiasIcon} from "../../../shared/Icons/euthanasias.icon.jsx";
import {GeneratePdfApi} from "../../../api/Generate-Pdf.api.js";
import {useAuth, useModal} from "../../../hooks";
import {
  HealthCertificationPdfForm
} from "../../../components/Vet_components/MedicalHistory/GenerateHealthCertificatePdf/HealthCertificatePdfForm.jsx";
import {Header} from "../../../shared/components/Header.jsx";

const petsController = new Pets();
const apiAuthController = new ApiAuth();
const generatePdfController = new GeneratePdfApi();

export function CompletePetPerfil() {
  const allTreatments = [];
  const allIntervations = [];
  const { accessToken } = useAuth();

  let params = useParams();

  const [selectedTab, setSelectedTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingEuthanasias, setIsLoadingEuthanasias] = useState(false)
  const {showModal: showModalSurgery, onOpenCloseModal: onOpenCloseModalSurgery} = useModal();
  const { showModal: showModalEuthanasia, onOpenCloseModal:onOpenCloseModalEuthanasia } = useModal()
  const { showModal: showModalHealthCertificate, onOpenCloseModal: onOpenCloseModalHealthCertificate } = useModal()

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const { data: pet, isLoading } = useQuery({
    queryKey: ['pets', params.petId],
    queryFn: async () => {
      const accessToken = apiAuthController.getAccessToken();
      return await petsController.getPetById(
        accessToken,
        params.petId
      );
    },
  });
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  let medicalHistoryId = 0;
  if (!isLoading ){
    pet.medicalHistories?.map((medicalHistory) => {
      medicalHistoryId = medicalHistory.id;
        if(medicalHistory?.diagnostic !== null){
          medicalHistory.diagnostic.treatments.map((treatment) => {
            allTreatments.push({...treatment, medicalHistoryId});
          })
          medicalHistory?.diagnostic.surgicalIntervations.map((intervation) => {
            allIntervations.push({...intervation, medicalHistoryId});
          })
        }
      }
    );
  }

  return (
    <>
      <Header />

      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={4}>
            <Grid item>
              <Paper style={{ padding: '20px', fontSize: '18px' }}>
                <h1
                    style={{
                      textAlign: 'center',
                      fontSize: '24px',
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '5px',
                    }}
                >
                  Datos generales de la mascota
                </h1>
                <br />
                {isLoading ? (
                    <div
                        style={{
                          minHeight: '250px',
                          maxHeight: '670px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                    >
                      <CircularProgress style={{ alignSelf: 'center' }} />
                    </div>
                ) : (
                    <>
                      <b>Nombre: </b>
                      {pet.name}
                      <br />
                      <br />
                      <b>Género: </b>
                      {pet.gender}
                      <br />
                      <br />
                      <b>Especie: </b>
                      {pet.specie.name}
                      <br />
                      <br />
                      <b>Raza: </b>
                      {pet.raza}
                      <br />
                      <br />
                      <b>Color: </b>
                      {pet.color}
                      <br />
                      <br />
                      <b>Tatuajes: </b>
                      {pet.isHaveTatto ? 'Sí posee':'No posee'}
                      <br />
                      <br />
                      <b>Pedigree: </b>
                      {pet.pedigree ? 'Sí posee':'No posee'}
                      <br />
                      <br />
                      {pet.birthday ? (
                          <>
                            <b>Fecha de nacimiento: </b>
                            {pet.birthday}
                            <br />
                            <br />
                          </>
                      ) : null}
                    </>
                )}
              </Paper>
            </Grid>
            <Grid item sx={{mt: 2, textAlign:'center'}}>
              <Paper style={{ padding: '20px', fontSize: '18px' }}>
                <h1
                    style={{
                      textAlign: 'center',
                      fontSize: '24px',
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '5px',
                    }}
                >
                  Generación de archivos PDFs
                </h1>
                <Tooltip
                    arrow={true}
                    title={
                      <Typography sx={{ fontSize: 14, color: 'white' }}>
                        Consentimiento Cirugía
                      </Typography>
                    }
                >
                  <IconButton onClick={onOpenCloseModalSurgery}>
                      <SurgeryIcon color='#2E7D32'/>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={onOpenCloseModalHealthCertificate}>
                  <Tooltip
                      arrow={true}
                      title={
                        <Typography sx={{ fontSize: 14, color: 'white' }}>
                          Constancia de Salud
                        </Typography>
                      }
                  >
                    <Flight sx={{ fontSize: 55, color: '#2E7D32'}} />
                  </Tooltip>
                </IconButton>
                <Tooltip
                    arrow={true}
                    title={
                      <Typography sx={{ fontSize: 14, color: 'white' }}>
                        Consentimiento Eutanasia
                      </Typography>
                    }
                >
                  <IconButton onClick={onOpenCloseModalEuthanasia}>
                      <EuthanasiasIcon color='#2E7D32'/>
                  </IconButton>
                </Tooltip>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={8} md={8}>
            <Button
              sx = {{ px: 4, py: 1.5, my: 2 }}
              variant='contained'
              onClick={onOpenCloseModal}
            >
              Registrar hoja clinica
            </Button>
            {showModal && (
              <SharedModal
                show={showModal}
                close={onOpenCloseModal}
                title='Crear nueva hoja clinica'
              >
                <MedicalHistoryForm close={onOpenCloseModal} onReload={onReload}  petId={params.petId} />
              </SharedModal>
            )}
            {/*<Paper
              style={{
                padding: '20px',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '5px',
                }}
              >
                Historial médico
              </h1>
              {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {map(pet.medicalHistories, (hojaClinica) => (
                    <PetMedicalHistory key={hojaClinica.id} medicalHistory={hojaClinica} />
                  ))}
                </div>
              )}
            </Paper>*/}
            <Box sx={{  borderBottom: 1, borderColor: 'divider', width: 'auto' }}>
              <Grid container spacing={3} alignItems='center'>
                <Grid item>
                  <Tabs value={selectedTab} onChange={handleTabChange} aria-label='basic tabs example'>
                    <Tab icon={<HistoryEdu />} label='Historial médico' {...a11yProps(0)} />
                    <Tab icon={<Vaccines />} label='Tratamientos' {...a11yProps(1)} />
                    <Tab icon={<LocalHospital />} label='Intervenciones' {...a11yProps(2)} />
                  </Tabs>
                </Grid>
              </Grid>
            </Box>

            {/* PETS MEDICAL HISTORY */}
            {selectedTab === 0 && (
              <div>
                {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div className='box-container'>
                <Box sx={{ width: '100%' }}>
                  {map(pet.medicalHistories, (hojaClinica) => (
                    <PetMedicalHistory key={hojaClinica.id} medicalHistory={hojaClinica} petId={params.petId} />
                  ))}
                </Box>
                </div>
              )}
              </div>
            )}

            {/* PETS DOCUMENTATION */}
            {selectedTab === 1 && (
              <div className='box-container'>
                {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div className='box-container'>
                <Box sx={{ width: '100%' }}>
                  { map(allTreatments, (treatment) => (
                      <PetMedicalHistoryTreatments key={treatment.id} treatment={treatment}/>
                  ))}
                </Box>
                </div>
              )}
              </div>
            )}


            {/* PETS DOCUMENTATION */}
            {selectedTab === 2 && (
              <div>
                {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  { map(allIntervations, (intervation) => (
                      <PetMedicalHistorySurgicalIntervations key={intervation.id} intervation={intervation} />
                  ))}
                </div>
              )}
              </div>
            )}
          </Grid>
        </Grid>
        </Container>

      {showModalSurgery ? (
        <SharedModal
            show={showModalSurgery}
            close={onOpenCloseModalSurgery}
            title='Generar Consentimiento Cirugía'
        >
          <ConsentSurgeryPdfForm onClose={onOpenCloseModalSurgery} petId={pet.id} petName={pet.name}/>
        </SharedModal>)
        : null}

      {showModalEuthanasia ? (
            <SharedModal
                show={showModalEuthanasia}
                close={onOpenCloseModalEuthanasia}
                title='¿Desea generar consentimiento eutanasia?'
              >
              <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
              >
                <Button
                    color='error'
                    onClick={onOpenCloseModalEuthanasia}
                    size='medium'
                    sx={{ mx: 2, marginTop: '12px' }}
                >
                  Cancelar
                </Button>
                <Button
                    onClick={async () => {
                      setIsLoadingEuthanasias(true)
                      await generatePdfController.generateEuthanasiaPdf({}, pet.id, pet.name, accessToken)
                      setIsLoadingEuthanasias(false)
                      onOpenCloseModalEuthanasia()
                    }}
                    size='medium'
                    sx={{ mx: 2, marginTop: '12px' }}
                >
                  {isLoadingEuthanasias ? <CircularProgress /> :`Generar`}
                </Button>
              </Grid>

            </SharedModal>): null
      }
      {showModalHealthCertificate
          ? (
              <SharedModal
                  show={showModalHealthCertificate}
                  close={onOpenCloseModalHealthCertificate}
                  title='Generación de constancia de salud'
              >
                <HealthCertificationPdfForm onClose={onOpenCloseModalHealthCertificate} petId={pet.id} petName={pet.name}/>
              </SharedModal>)
          : null
      }
    </>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
