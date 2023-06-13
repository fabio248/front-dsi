// Para mantener un orden de datos se importa una carpeta de constantes
import { ENV } from '../utils';
import { decoderToken } from '../utils';
import { format } from 'date-fns';

export class User {
  async getUser(accessToken) {
    try {
      // Se decodifica el token para obtener su información
      const USER_ID = decoderToken(accessToken).identify;

      // URL de conexion con el backend
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS}/${USER_ID}`;
      const params = {
        method: 'GET', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
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

  async getAllUsers(accessToken) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS}`;
      const params = {
        method: 'GET', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      next(error);
    }
  }
  async updateUser(accessToken, idUser, data) {
    try {
      if (!data.password) {
        delete data.password;
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS}/${idUser}`;
      const params = {
        method: 'PATCH', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: format(data.birthday, 'dd/MM/yyyy'),
          email: data.email,
          password: data.password,
          role: data.role,
          phone: data.phone,
          direction: data.direction,
          dui: data.dui,
        }),
      };
      console.log(params);
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(accessToken, idUser) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS}/${idUser}`;
      const params = {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
