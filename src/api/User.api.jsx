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
  /**
   * Listado paginado para la tabla de usuarios.
   *
   * Convive con `getAllUsers`, que sigue sirviendo al scroll infinito de los
   * otros listados. Aquí el servidor ordena, filtra y pagina; el cliente solo
   * traduce el estado de la tabla a query params.
   *
   * Los parámetros se arman con URLSearchParams en vez de interpolarlos: una
   * búsqueda con `&` o `#` rompe la URL si se concatena a mano.
   */
  async getUsersPage(
    accessToken,
    {
      page = 1,
      limit = 10,
      search,
      sortBy,
      sortOrder,
      role,
      birthdayFrom,
      birthdayTo,
    } = {}
  ) {
    const query = new URLSearchParams({ page, limit });

    // Los vacíos se omiten: el backend los trata como "no filtrar", pero
    // mandarlos ensucia la query key de react-query y duplica caché.
    const optionalParams = {
      search,
      sortBy,
      sortOrder,
      role,
      birthdayFrom,
      birthdayTo,
    };

    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, value);
      }
    });

    const url = `${config.baseApi}/${configApiBackend.users}?${query.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const result = await response.json();

    if (!response.ok) throw result;

    return result;
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

      // Solo se envian los campos requeridos y los opcionales con valor.
      // Los @IsOptional del backend ignoran null/undefined pero NO ''.
      const client = {
        firstName: clientData.firstName,
        lastName: clientData.lastName,
      };
      if (clientData.birthday)
        client.birthday = format(clientData.birthday, 'dd/MM/yyyy');
      if (clientData.email) client.email = clientData.email;
      if (clientData.password) client.password = clientData.password;
      if (clientData.role) client.role = clientData.role;
      if (clientData.phone) client.phone = clientData.phone;
      if (clientData.direction) client.direction = clientData.direction;
      if (clientData.dui) client.dui = clientData.dui;

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
          ...client,
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

      return response;
    } catch (error) {
      throw error;
    }
  }
}
