//import { ENV } from '../utils';
import { decoderToken } from '../utils';
import { config, configApiBackend } from '../config';
import { format } from 'date-fns';


export class ApiCitas {
    //REGISTRO
    async registerCita(data) {
      try {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS}/${userId}`;
        const params = {
          method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
          headers: {
            // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
            'Content-Type': 'application/json',
          },
          // Este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
          body: JSON.stringify({
            // Parametros a enviar

            startdate: format(data.startdate, 'dd-MM-yyyy HH:mm'),
            endDate: format(data.endDate, 'dd-MM-yyyy HH:mm'),
    nameEvent: data.nameEvent,
    descripcion: data.descripcion,

            firstName: data.firstName,
            lastName: data.lastName,          
            email: data.email,
      
          }),
        };
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 200) throw result; // Valida la respuesta del back
        return result;
      } catch (error) {
        throw error; // Manejo del error
      }
    }
  
    
  

  
    async refreshAccessToken(refreshToken) {
      try {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
  
        const params = {
          method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
          headers: {
            // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Parametros a enviar
            token: refreshToken,
          }),
        };
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 200) throw result; // Valida la respuesta del back
  
        return result;
      } catch (error) {
        throw error; // Manejo del error
      }
    }
  
    // GUARDA ACCESSTOKEN EN LOCALSTORAGE
    setAccessToken(token) {
      localStorage.setItem(ENV.JWT.ACCESS, token);
    }
    // RECUPERACIÓN DE ACCESSTOKEN EN LOCALSTORAGE
    getAccessToken() {
      return localStorage.getItem(ENV.JWT.ACCESS);
    }
    // GUARDA REFRESHTOKEN EN LOCALSTORAGE
    setRefreshToken(token) {
      localStorage.setItem(ENV.JWT.REFRESH, token);
    }
    // RECUPERACIÓN DE REFRESHTOKEN EN LOCALSTORAGE
    getRefreshToken() {
      return localStorage.getItem(ENV.JWT.REFRESH);
    }
  
    // ELIMINAR TOKENS DE LOCALSTORAGE
    removeTokens() {
      localStorage.removeItem(ENV.JWT.ACCESS);
      localStorage.removeItem(ENV.JWT.REFRESH);
    }
  

  }
  