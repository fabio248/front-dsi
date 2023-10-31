// Para mantener un orden de datos se importa una carpeta de constantes
import { decoderToken } from '../utils';
import { config, configApiBackend } from '../config';
import { format } from 'date-fns';
import axios from 'axios';

const typeDocument = {
  HEALTH_CERTIFICATION:'HEALTH_CERTIFICATION'
}

export class UserApi {
  // OBTENER USUARIO POR ID
  async getUser(accessToken) {
    try {
      // Se decodifica el token para obtener su información
      const USER_ID = decoderToken(accessToken).identify;

      // URL de conexion con el backend
      const url = `${config.baseApi}/${configApiBackend.users}/${USER_ID}`;

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
  //OBTENER TODOS LOS USUARIOS REGISTRADOS EN LA BASE
  async getAllUsers(accessToken, page, search = null, limit = 5) {
    try {
      let url = `${config.baseApi}/${configApiBackend.users}?page=${page}&limit=${limit}`;

      if (search) {
        url = `${config.baseApi}/${configApiBackend.users}?search=${search}&page=${page}&limit=4`;
      }

      const params = {
        method: 'GET', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) {
        throw result;
      }

      return result;
    } catch (error) {
      next(error);
    }
  }
  // ACTUALIZAR UN USUARIO
  async updateUser(accessToken, idUser, data) {
    try {
      if (!data.password) {
        delete data.password;
      }

      if (data.email !== null) {
        delete data.email;
      }

      const url = `${config.baseApi}/${configApiBackend.users}/${idUser}`;
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
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  // ELIMINAR UN USUARIO
  async deleteUser(accessToken, idUser) {
    try {
      const url = `${config.baseApi}/${configApiBackend.users}/${idUser}`;
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

  //REGISTRAR UN USUARIO Y SU MASCOTA
  async registerUserAndPet(accessToken, clientData, petData) {
    try {
      if (!petData.whichPets) {
        delete petData.whichPets;
      }
      const url = `${config.baseApi}/${configApiBackend.users}/${configApiBackend.pets}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        // Este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
        body: JSON.stringify({
          // Parametros a enviar
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          birthday: format(clientData.birthday, 'dd/MM/yyyy'),
          email: clientData.email,
          password: clientData.password,
          role: clientData.role,
          phone: clientData.phone,
          direction: clientData.direction,
          dui: clientData.dui,
          pet: {
            name: petData.name,
            specieId: petData.specie.id,
            raza: petData.raza,
            color: petData.color,
            isHaveTatto: petData.isHaveTattoo,
            birthday: format(petData.birthday, 'dd/MM/yyyy'),
            gender: petData.gender,
            pedigree: petData.pedigree,
            medicalHistory: {
              isHaveAllVaccine: petData.vacuna,
              isReproduced: petData.reproduccion,
              descendants: petData.descendencia,
              room: petData.habitaculo,
              diasesEvaluation: petData.enfermedad,
              observation: petData.observacion,
              food: {
                quantity: petData.quantityFood,
                type: petData.typeFood,
              },
              physicalExam: {
                weight: petData.weight,
                palpitations: petData.palpitaciones,
              },
              otherPet: {
                isLiveOtherPets: petData.convivencia,
                whichPets: petData.whichPets,
              },
            },
          },
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status != 201) throw result; // Valida la respuesta del back
      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  async requestHealthCertificate(accessToken, idPet) {
    try {
      const url = `${config.baseApi}/${configApiBackend.users}/request-document/${idPet}`;
      const params = {
        method: 'POST',
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        url,
        {
          typeDocument: typeDocument.HEALTH_CERTIFICATION,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log({response})

      return response;
    } catch (error) {
      throw error;
    }
  }
}
