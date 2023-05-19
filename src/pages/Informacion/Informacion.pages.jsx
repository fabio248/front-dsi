import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function Informacion_pages() {
  return (     
<div style={{ textAlign: 'center' }}>
  <h1>Información del Establecimiento</h1>
  
  <div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								<div className="title about-title">
                <h2>Horario de Atención</h2>
								</div>

								<div className="subtitle about-subtitle">
                <h4>Lunes a Sabado</h4>
                <p>11:00 am – 5:00 pm</p>
								</div>
							</div>

							<div className="about-left-side">
								<div className="about-image-container">
									<div className="about-image-wrapper">
                  <img src="../../../public/galeria/fachada.jpg" alt="fachada" style={{ width: '400px', height: 'auto' }}  />
									</div>
								</div>


							</div>
						</div>

					</div>
  <h2>Estamos Ubicados en</h2>
  <h4>Barrio Santa Lucia, Casa #23, sobre 1° Av. Norte, Zacatecoluca.</h4>
  <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.4001806280176!2d-88.871063226807!3d13.511015586856209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7cadbe1e0ae625%3A0xf916477fc1f3c161!2sCl%C3%ADnica%20Veterinaria%20Mistun!5e0!3m2!1ses!2ssv!4v1684523698267!5m2!1ses!2ssv"
        width="600"
        height="450"
        style={{ border: 1 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
</div>
  )
}

