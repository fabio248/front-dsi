import React from 'react'
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Button } from "@mui/material";
import { FaFacebook } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
//import './Users_Layouts.css';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));


export function Informacion_pages() {
  return (     
<div style={{ textAlign: 'center' }}>
  <h1>Información del Establecimiento</h1>
<Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={4}>
  <h2>Horario de Atención</h2>
  <h3>Lunes a Sabado</h3>
<h4>11:00 am – 5:00 pm</h4>
  </Grid>
  <Divider orientation="vertical" flexItem>
  </Divider>
  <Grid item xs>
  <div className="contenedor-imagen">
  <img src="../../../public/galeria/fachada.jpg" alt="fachada" className="imagen" style={{ width: '50%', height: 'auto' }}  />						
    </div>
   </Grid>
</Grid>

  <h2>Estamos Ubicados en</h2>
  <h4>Barrio Santa Lucia, Casa #23, sobre 1° Av. Norte, Zacatecoluca.</h4>
  <div>
      

<Grid container spacing={2} justifyContent="center">
  <Grid item xs>
  <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.4001806280176!2d-88.871063226807!3d13.511015586856209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7cadbe1e0ae625%3A0xf916477fc1f3c161!2sCl%C3%ADnica%20Veterinaria%20Mistun!5e0!3m2!1ses!2ssv!4v1684523698267!5m2!1ses!2ssv"
        style={{ border: 1 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        width= '100%'
        height= '100%'
      ></iframe>
  </Grid>
  <Divider orientation="vertical" flexItem>
  </Divider>
  <Grid item xs>
  <div className="contenedor-imagen">
  <img src="../../../public/galeria/fachada.jpg" alt="fachada" className="imagen" style={{ width: '75%', height: 'auto' }}  />						
    </div>
   </Grid>
</Grid>
    </div>
</div>
  )
}

