import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@mui/material';

export function User_pages() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Clínica Veterinaria MISTUM</h1>
      <h2>MVDr. Saul Antonio Medina Matus</h2>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/consulta.png"
                alt="consulta"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Medicina general
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ofrecemos atención integral para tu compañero de cuatro patas, desde chequeos rutinarios hasta el manejo de enfermedades crónicas.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/emergencia.jpg"
                alt="cirugia"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Urgencias Médicas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  En situaciones de emergencia, cuenta con nuestra clínica veterinaria para recibir atención médica inmediata.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/cirugia.jpg"
                alt="cirugia"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cirugía General
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Para procedimientos quirúrgicos, confía en nuestra cirugía general, respaldada por un equipo altamente capacitado y tecnología de vanguardia.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/esterilizacion.jpg"
                alt="Esterilización"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Esterilización
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  La esterilización es una opción responsable y beneficiosa para controlar la reproducción y promover la salud de tu mascota.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/vacuna.jpg"
                alt="Vacunación"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Vacunación
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Protege a tu mascota de enfermedades con nuestra completa gama de vacunas, asegurando su salud a largo plazo.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/Desparasitacion.jpg"
                alt="Desparasitación"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Desparasitación
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  La desparasitación regular de tu mascota es esencial, en nuestra clínica ofrecemos tratamientos efectivos para eliminar parásitos internos y externos.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/dental.jpg"
                alt="Limpieza dental"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Limpieza dental
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Garantizamos una sonrisa saludable para tu mascota con nuestra limpieza dental, que ayuda a tu mascota a prevenir enfermedades bucales.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card sx={{ maxWidth: 445, height: '100%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../../public/galeria/viaje.jpg"
                alt="Emisión de constancias"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Emisión de constancias de salud para viajar al extranjero
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Si tienes planes de viajar al extranjero con tu mascota, no te preocupes, ¡emitimos constancias de salud para cumplir con los requisitos de viaje!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <h2>En nuestra clínica veterinaria, cuidamos y protegemos la salud de tu compañero fiel en cada etapa de su vida.</h2>
    </div>
  );
}
