import React from 'react';
import './Historia.pages.css';
import { Grid } from '@mui/material';

export function Historia_pages() {
  const { titulo, parrafos } = contenido;
  return (
    
    <div className='container'>
      <h2>{titulo}</h2>
      {parrafos.map((parrafo, index) => (
        <p key={index} style={{ textAlign: 'justify'}}>
          {parrafo}
        </p>
      ))}
    
      <div>
        <img
          src='/galeria/huella.png'
          alt='Huella'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

        <Grid container spacing={3} >
          <Grid item xs={12} sm={6} className='gridp'>
            <h2>Misión</h2>
            <p style={{ textAlign: 'center' }}>Ser un establecimiento veterinario que proporcione servicios de atención médico veterinarios a los propietarios dueños de mascotas que nos visitan.</p>
          </Grid>

          <Grid item xs={12} sm={6} className='gridp'>
            <h2>Visión</h2>
            <p style={{ textAlign: 'center' }}>Dar atención veterinaria a animales de compañía o mascotas, para que manteniendo su salud física o ayudar a recuperar la salud perdida, mantengamos así la salud pública veterinaria, y ayudemos proporcionar mejor la calidad de vida a nuestros pacientes.</p>
          </Grid>
        </Grid>

      <div>
        <img
          src='/galeria/huella.png'
          alt='Huella'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
  
      <div>
      <h2>Nuestros Valores</h2> <br />
      <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="grid">
            <br /><h1>Respeto</h1>
            <br /><h1>Atención</h1>          
          </Grid>

          <Grid item xs={12} sm={4} className="grid">
            <img
            src='/galeria/logofavico.png'
            alt='mistun'
            style={{ width: '90%', height: 'auto' }}
            />
            <h1>Compromiso</h1>
          </Grid>

          <Grid item xs={12} sm={4} className="grid">
            <br /><h1>Equidad</h1>
            <br /><h1>Dignidad</h1>
          </Grid>
        </Grid> 
      </div>
    </div>
  );
}

const contenido = {
  titulo: 'Sobre Nosotros',
  parrafos: [
    'Nuestra historia comenzó en el año 2010, cuando el médico veterinario recién egresado, MVDr. Saul Antonio Medina Matus, dio inició a su carrera profesional en el barrio El Centro de Zacatecoluca. Trabajó en una clínica veterinaria que, lamentablemente, hoy en día se encuentra cerrada. Sin embargo, algo especial sucedió: muchos de los clientes habituales continuaron buscando los servicios del MVDr. Saul Antonio para el cuidado de sus queridas mascotas.',
    'Impulsado por esta leal demanda y con el firme compromiso de ofrecer atención veterinaria excepcional, el MVDr. Saul Antonio comenzó a emprender su propio camino. Así, establecemos nuestra clínica veterinaria en la ciudad de Zacatecoluca.',
    'El 3 de febrero de 2013 marcó un hito en nuestra historia, pues fue el día en que abrimos oficialmente nuestras puertas, listos para brindar servicios veterinarios de la más alta calidad a nuestra amada comunidad. Desde entonces, nos hemos dedicado a cuidar y proteger la salud de las mascotas, acompañando a sus dueños en cada paso del camino.',
    'En nuestra clínica veterinaria, nos enorgullece ofrecer atención personalizada, diagnósticos precisos y tratamientos efectivos, respaldados por el conocimiento y la experiencia del MVDr. Saul Antonio Medina Matus. Nuestro objetivo es garantizar el bienestar y la felicidad de cada mascota que entra por nuestras puertas, creando un vínculo duradero con sus dueños.',
    'En MISTUN, no solo tratamos a los animales, sino que también nos preocupamos profundamente por ellos. Los consideramos parte de nuestras familias y nos esforzamos por brindarles el amor, el respeto y la atención que se merecen.',
    '¡Gracias por confiar en nosotros y ser parte de nuestra historia! Estamos ansiosos por servirles y ser su aliado confiable en el cuidado de veterinario sus adorables compañeros peludos.',
  ],
  };

export default contenido;
