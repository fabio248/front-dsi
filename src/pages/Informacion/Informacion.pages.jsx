import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { FaFacebook } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Box } from '@mui/material';

export function Informacion_pages() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Información del Establecimiento</h1>
      <h2>Horario de Atención</h2>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="50"
                image="../../../public/galeria/reloj.jpg"
                alt="consulta"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lunes, Martes, Jueves y Viernes
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  11:00 am – 5:00 pm
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <h1> </h1>
          <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="50"
                image="../../../public/galeria/reloj.jpg"
                alt="consulta"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Miércoles y Sábado
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  11:00 am – 4:00 pm
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <div className="contenedor-imagen">
            <img src="../../../public/galeria/dog.gif" alt="dog" className="imagen" style={{ width: '100%', height: 'auto' }} />
          </div>
        </Grid>
      </Grid>

      <h2>Estamos Ubicados en</h2>
      <h4>Barrio Santa Lucia, Casa #23, sobre 1° Av. Norte, Zacatecoluca.</h4>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.4001806280176!2d-88.871063226807!3d13.511015586856209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7cadbe1e0ae625%3A0xf916477fc1f3c161!2sCl%C3%ADnica%20Veterinaria%20Mistun!5e0!3m2!1ses!2ssv!4v1684523698267!5m2!1ses!2ssv"
            style={{ border: 1 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            width='100%'
            height='100%'
          ></iframe>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100%"
                image="../../../public/galeria/fachada.jpg"
                alt="consulta"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Box mt={10}>
      <h2>Contactanos</h2>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <div className="contenedor-imagen">
            <img src="../../../public/galeria/cats.gif" alt="dog" className="imagen" style={{ width: '100%', height: 'auto' }} />
          </div>
        </Grid>

        <Grid item xs={7}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={2}>
                  <IconButton
                    color="primary"
                    aria-label="Facebook"
                    component="a"
                    href="https://www.facebook.com/profile.php?id=100069913175592"
                    target="_blank"
                    style={{ fontSize: '3rem' }}
                  >
                    <FaFacebook />
                  </IconButton>
                </Grid>

                <Grid item xs={8} textAlign='left'>
                  <a
                    href="https://www.facebook.com/profile.php?id=100069913175592"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3>Clínica veterinaria mistun</h3>
                  </a>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={2}>
                  <IconButton
                    aria-label="WhatsApp"
                    component="a"
                    href="https://wa.me/50361366565"
                    target="_blank"
                    style={{ color: '#25D366', fontSize: '3rem' }}
                  >
                    <FaWhatsapp />
                  </IconButton>
                </Grid>

                <Grid item xs={8} textAlign='left'>
                  <a
                    href="https://wa.me/50361366565"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                  >
                    <h3>+503 6136 6565</h3>
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box mt={7}>
            <a
              href="https://wa.me/50361366565"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: 'purple' }}
            >
              <h2>¡Regístrate y agenda tu cita hoy!</h2>
            </a>
          </Box>
          
        </Grid>
      </Grid>
      </Box>
    </div>
  );
}
