import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  Grid,
  Button,
  Tooltip,
  Typography, CircularProgress, AlertTitle
} from '@mui/material';
import { Pets, Mail } from '@mui/icons-material';
import {UserApi} from "../../../api/User.api.jsx";
import {useAuth, useModal} from "../../../hooks/index.jsx";
import {useMutation} from "@tanstack/react-query";
import {SharedModal} from "../../../shared/Modal_MedicalHistory/index.jsx";
import React, {useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const userController = new UserApi();
export function PetsItem({ pet }) {
  const [showAlert, setShowAlert] = useState(false)
  const {showModal, onOpenCloseModal} = useModal();
  const { accessToken } = useAuth();

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const requestDocument = useMutation({
    mutationFn: async () => {
      return await userController.requestHealthCertificate(accessToken, pet.id);
    },
    onSuccess: () => {
      onOpenCloseModal()
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
          },6000)
    },
  })

  return (
      <Grid container sx={{background:"#fff", alignSelf: 'right', justifyContent:'right', alignItems:'right', alignContent:'right', textAlign:'right'}}  xs={12} sm={8} md={12}>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid item>
            <ListItemAvatar sx={{ margin: '0 auto' }}>
              <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#8EC167' }}>
                <Pets sx={{ fontSize: 45, color: '#FFFFFF'}} />
              </Avatar>
            </ListItemAvatar>
          </Grid>
          <Grid item>
            <ListItemText>
              <p
                className='estilos-pets'
                style={{ justifyContent: 'space-around' }}
              >
                <b>Nombre de la mascota: </b>
                {pet.name}
                <br />
                <b>Especie de la mascota: </b>
                {pet.specie.name}
                <br />
                <b>Raza de la mascota: </b>
                {pet.raza}
                <br />
                <b>Genero: </b>
                {pet.gender}
                <br />
                <b>Nacimiento de la mascota: </b>
                {pet.birthday}
                <br />
                <b>Color del pelaje: </b>
                {pet.color}
                <br />
                <b>¿Tatuajes o marcas?: </b>
                {pet.isHaveTatto === false ? 'No posee' : 'Si posee'}
                <br />
                <b>¿Posee Pedigrí?: </b>
                {pet.pedigree === false ? 'No Posee' : 'Si posee'}
                <br />
              </p>
            </ListItemText>
          </Grid>
          <Grid item>
            <Tooltip arrow title={<Typography variant="subtitle1">Solicitar constancia de salud para viajes</Typography>}>
              <Button onClick={onOpenCloseModal}>
                <Mail />
              </Button>
            </Tooltip>
          </Grid>
        </ListItem>
        <Grid item xs={12} sm={12} md={12}>
          <Divider>
            <Pets color='disabled' />
          </Divider>
        </Grid>
        {showModal
            ? (<SharedModal
                title={
                    <Typography variant="h4" component="h2" fontWeight="bold">
                      ¿Quieres envía la solicitud de certificado medico?
                    </Typography>
                }
                show={showModal}
                close={onOpenCloseModal}>
                  <Grid container spacing={3}>
                    <Grid item sx={{ml:3}}>
                        <Typography variant="h6" fontWeight="normal">Esta accion envía una correo al veterinario solicitando una constancia de salud para tu mascota <strong>{pet.name}</strong></Typography>
                    </Grid>
                    <br />
                    <Grid
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          margin: '0 auto',
                          mt:3
                        }}
                    >
                      <Button
                          color='error'
                          onClick={onOpenCloseModal}
                          size='medium'
                          sx={{ mx: 2, marginTop: '12px' }}
                      >
                        Cancelar
                      </Button>
                      <Button
                          onClick={()=>requestDocument.mutate()}
                          size='medium'
                          sx={{ mx: 2, marginTop: '12px' }}
                      >
                        {requestDocument.isLoading ? <CircularProgress /> :`Generar`}
                      </Button>
                  </Grid>
                  </Grid>
              </SharedModal>)
            : null}
        {<Snackbar open={showAlert} onClose={onCloseAlert} autoHideDuration={6000}>
          <Alert>
            <AlertTitle>¡Solicitud enviada!</AlertTitle>
          </Alert>
        </Snackbar>}
      </Grid>
  );
}
