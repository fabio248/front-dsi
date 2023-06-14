import { ENV } from '../utils';

export class Pets {
  async getPetsForUsers(accessToken, userId) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USERS}/${userId}`;
      const params = {
        method: 'GET',
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
  async getAllPets(accessToken) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.PETS}`;
      const params = {
        method: 'GET',
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
