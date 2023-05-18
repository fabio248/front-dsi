import React from 'react'
import catalogo from '../images/catalogo.jpg';
import direccion from '../images/direccion.jpg';
import '../Users/User.css';
export function User_pages() {
  return (
    <div>
      <h1>SOY UN TITULO</h1>
      <div className='container'>
        <div className='card'>
          <figure>
            <img src={direccion}/>
            <div className='contenido'>
              <h3>
              Clínica veterinaria MISTUN
              </h3>
              <p>La clínica veterinaria MISTUN ofrece los siguientes servicios:</p>
              <p>Consulta</p>
            </div>
          </figure>
        </div>
      
      </div>
    </div>
  )
}
