import { ENV } from '../utils';
import { decoderToken } from '../utils';

export class User {
  async getUser(accessToken) {
    try {

      const USER_ID = decoderToken(accessToken).identify;

      //url de conexion con el backend      
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS_ID}/${USER_ID}`;
      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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