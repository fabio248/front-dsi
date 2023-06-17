import { config, configApiBackend } from '../config';

export class Pets {
  async getPetsForUsers(accessToken, userId) {
    try {
      const url = `${config.baseApi}/${configApiBackend.users}/${userId}`;
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
      const url = `${config.baseApi}/${configApiBackend.pets}`;
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

  async updatePets(accessToken, idPets, pet) {
    try {
      const url = `${config.baseApi}/${configApiBackend.pets}/${idPets}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.name,
          gender: pet.gender,
          raza: pet.raza,
          color: pet.color,
          isHaveTatto: pet.isHaveTatto,
          pedigree: pet.pedigree,
          birthday: pet.birthday,
          medicalHistory: {
            isHaveAllVaccine: pet.medicalHistory.isHaveAllVaccine,
            isReproduced: pet.medicalHistory.isReproduced,
            descendants: pet.medicalHistory.descendants,
            room: pet.medicalHistory.room,
            diasesEvaluation: pet.medicalHistory.diasesEvaluation,
            observation: pet.medicalHistory.observation,
            food: {
              quantity: pet.medicalHistory.food.quantity,
            },
          },
        }),
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
