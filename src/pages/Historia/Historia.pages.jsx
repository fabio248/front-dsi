import React from 'react';
import './Historia.pages.css';

export function Historia_pages() {
  const { titulo, parrafos, mision, vision } = contenido;
  return (
    <div className='container'>
      {/* LightWidget WIDGET */}
      <script src='https://cdn.lightwidget.com/widgets/lightwidget.js'></script>
      <iframe
        src='//lightwidget.com/widgets/f6fd46029b3253689639b2126424e352.html'
        allowtransparency='true'
        className='lightwidget-widget'
        style={{
          width: '100%',
          height: '190px',
          border: '0',
          overflow: 'hidden',
        }}
      ></iframe>

      <h2>{titulo}</h2>
      {parrafos.map((parrafo, index) => (
        <p key={index} style={{ textAlign: 'justify' }}>
          {parrafo}
        </p>
      ))}

      <div>
        <img
          src='../../../public/galeria/huella.png'
          alt='Huella'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <h2>Misión</h2>
      <p>{mision}</p>

      <div>
        <img
          src='../../../public/galeria/huella.png'
          alt='Huella'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <h2>Visión</h2>
      <p>{vision}</p>

      <div>
        <img
          src='../../../public/galeria/cat.gif'
          alt='cat'
          style={{ width: '400px', height: 'auto' }}
        />
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
    'En MISTUM, no solo tratamos a los animales, sino que también nos preocupamos profundamente por ellos. Los consideramos parte de nuestras familias y nos esforzamos por brindarles el amor, el respeto y la atención que se merecen.',
    '¡Gracias por confiar en nosotros y ser parte de nuestra historia! Estamos ansiosos por servirles y ser su aliado confiable en el cuidado de veterinario sus adorables compañeros peludos.',
  ],
  mision:
    'Ser un establecimiento veterinario que proporcione servicios de atención Médico veterinarios a los propietarios dueños de mascotas que nos visitan.',
  vision:
    'Dar atención veterinaria a animales de compañía o mascotas, para que manteniendo su salud física o ayudar a recuperar la salud perdida, mantengamos así la salud pública veterinaria, y ayudemos proporcionar mejor la calidad de vida a nuestros pacientes.',
};

export default contenido;
