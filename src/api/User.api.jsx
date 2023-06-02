// Para mantener un orden de datos se importa una carpeta de constantes
import { ENV } from '../utils';
import { decoderToken } from '../utils';

export class User {
  async getUser(accessToken) {
    try {

      // Se decodifica el token para obtener su información
      const USER_ID = decoderToken(accessToken).identify;

      // URL de conexion con el backend      
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS_ID}/${USER_ID}`;
      const params = {
        method: "GET", // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

}