import { method } from 'lodash';
import { config, configApiBackend } from '../config';
import { format } from 'date-fns';
export class Pets {
  async getPetsForUsers(accessToken, userId) {
    try {
      const url = `${config.baseApi}/${configApiBackend.users}/${userId}/pets`;
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

  //ENCONTRAR TODAS LAS MASCOTAS
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

  // CREAR MASCOTA
  async createPets(accessToken, idUser, pet) {
    try {
      if (!pet.whichPets) {
        delete pet.whichPets;
      }
      const url = `${config.baseApi}/${configApiBackend.users}/${idUser}/${configApiBackend.pets}`;
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.name,
          specieId: pet.specie.id,
          raza: pet.raza,
          color: pet.color,
          isHaveTatto: pet.isHaveTattoo,
          birthday: format(pet.birthday, 'dd/MM/yyyy'),
          gender: pet.gender,
          pedigree: pet.pedigree,
          medicalHistory: {
            isHaveAllVaccine: pet.vacuna,
            isReproduced: pet.reproduccion,
            descendants: pet.descendencia,
            room: pet.habitaculo,
            diasesEvaluation: pet.enfermedad,
            observation: pet.observacion,
            food: {
              quantity: pet.quantityFood,
              type: pet.typeFood,
            },
            physicalExam: {
              weight: pet.weight,
              palpitations: pet.palpitaciones,
            },
            otherPet: {
              isLiveOtherPets: pet.convivencia,
              whichPets: pet.whichPets,
            },
          },
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async filePets(accessToken, fileType, petId) {
    try {
      const url = `${config.baseApi}/${configApiBackend.files}/${petId}`;
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mimetype: fileType,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async amazonQuery(urlComming, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const params = {
        method: 'PUT',
        body: formData,
      };

      const response = await fetch(urlComming, params);
      const result = response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  // ACTUALIZAR MASCOTA
  async updatePets(accessToken, idPets, pet) {
    try {
      if (!pet.whichPets) {
        delete pet.whichPets;
      }
      const url = `${config.baseApi}/${configApiBackend.pets}/${idPets}`;
      const params = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // pet: {
          name: pet.name,
          specieId: pet.specie.id,
          raza: pet.raza,
          color: pet.color,
          isHaveTatto: pet.isHaveTattoo,
          birthday: format(pet.birthday, 'dd/MM/yyyy'),
          gender: pet.gender,
          pedigree: pet.pedigree,
          medicalHistory: {
            isHaveAllVaccine: pet.vacuna,
            isReproduced: pet.reproduccion,
            descendants: pet.descendencia,
            room: pet.habitaculo,
            diasesEvaluation: pet.enfermedad,
            observation: pet.observacion,
            food: {
              quantity: pet.quantityFood,
              type: pet.typeFood,
            },
            physicalExam: {
              weight: pet.weight,
              palpitations: pet.palpitaciones,
            },
            otherPet: {
              isLiveOtherPets: pet.convivencia,
              whichPets: pet.whichPets,
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

  // ELIMINAR MASCOTA
  async deletePet(accessToken, idPet) {
    try {
      const url = `${config.baseApi}/${configApiBackend.pets}/${idPet}`;
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
