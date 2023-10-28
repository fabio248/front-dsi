import React, { useState } from 'react';
import { IconButton, Avatar, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

//Mui material
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';

import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material';

import {
Modal_verInfoFacture
} from '../../../../shared';

//objetos children que se renderizan dentro del modal
import { FactureForm } from '../FactureForm';
import {FactureSeeData} from "../FactureSeeData"

//import petitions of back
import { Facture } from '../../../../api/facture.api';
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiAuth } from '../../../../api/Auth.api';

//controladores de las clases API
// const factureController = new Facture();
// const authController = new ApiAuth();
const defaultTheme = createTheme();

export function FactureItem({ facture }) {

  //verificacion de error en la ejecución
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  //useState que controla el estado del (abrir o cerrar) modal Register
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  //funcion que ejecuta el boton correspondiente (Update pencilIcon)
  const openSeeFacture = () => {
    setTitleModal(`Visualizando Factura de: ${facture.client.firstName} ${facture.client.lastName}`);
    onOpenCloseModal();
  };
//   const accessToken = authController.getAccessToken();
//   const queryClient = useQueryClient();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#8EC167' }}>
              <DescriptionIcon sx={{ fontSize: 45 }} />
              
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <p>
              <b>Factura del cliente: </b>
              {facture.client.firstName}  {facture.client.lastName} 
              <br />  
              <b>Email del cliente: </b>
              {facture.client.email}
              <br />
              {facture.client.dui ?(
                  <div>
                 <b>Documento: </b>
                {facture.client.dui}
             </div>
              )
                 :
              null             
            }   
              <br />
              <b>Total de la venta: $ </b>
              {facture.totalSales.toFixed(2)}
              <br />   
              <b>Fecha de creación de la factura: </b>
              {facture.createdAt} 
            </p>
          </ListItemText>
          <ListItemAvatar
            sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
          >
            <Grid item>
              <IconButton color='info' onClick={openSeeFacture}>
                <VisibilityIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='success' onClick={() => console.log("hola")}>
                <AdfScannerIcon sx={{ fontSize: 30 }} />
              </IconButton>

            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <DescriptionIcon color='action' style={{ width: '30px', height: '30px' }} />
        </Divider>
      </Demo>
      <Modal_verInfoFacture show={showModal} close={onOpenCloseModal} title={titleModal}>
        <FactureSeeData close={onOpenCloseModal} facture={facture} />
      </Modal_verInfoFacture>
    </ThemeProvider>
  );
}
