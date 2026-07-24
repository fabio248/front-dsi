import { config, configApiBackend } from '../config';
import { format } from 'date-fns';
import axios from 'axios';
export class Pets {
  async getPetById(accessToken, petId) {
    try {

      // URL de conexion con el backend
      const url = `${config.baseApi}/${configApiBackend.pets}/${petId}`;

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
  async getAllPets(accessToken, page = 1, search = null) {
    try {
      let url = `${config.baseApi}/${configApiBackend.pets}?page=${page}&limit=5`;

      if (search) {
        url = `${config.baseApi}/${configApiBackend.pets}?search=${search}&page=${page}&limit=5`;
      }

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

  /**
   * Listado paginado para la tabla de mascotas.
   *
   * Convive con `getAllPets`, que sigue sirviendo al scroll infinito de los
   * otros listados. Aquí el servidor ordena, filtra y pagina; el cliente solo
   * traduce el estado de la tabla a query params.
   *
   * Los parámetros se arman con URLSearchParams en vez de interpolarlos: una
   * búsqueda con `&` o `#` rompe la URL si se concatena a mano.
   */
  async getPetsPage(
    accessToken,
    {
      page = 1,
      limit = 10,
      search,
      sortBy,
      sortOrder,
      specieId,
      gender,
      pedigree,
      isHaveTatto,
      userId,
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
      specieId,
      gender,
      pedigree,
      isHaveTatto,
      userId,
      birthdayFrom,
      birthdayTo,
    };

    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, value);
      }
    });

    const url = `${config.baseApi}/${configApiBackend.pets}?${query.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const result = await response.json();

    if (!response.ok) throw result;

    return result;
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

  async filePets(accessToken, fileType, petId, medicalHistoryId) {
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
          medicalHistoryId
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

  async amazonQuery(urlComming, fileBuffer, fileOriginal) {
    try {
      if (!fileBuffer || !fileOriginal) {
        return; // Salir de la función sin hacer nada
      }
      // Convert the ArrayBuffer to a Blob with the correct content type
      const blob = new Blob([fileBuffer], { type: fileOriginal.type });

      // Perform the request using Axios
      const response = await axios.put(urlComming, blob, {
        headers: {
          'Content-Type': fileOriginal.type,
        },
      });
      return response.data;
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

  async getMedicalHistoryById(medicalHistoryId) {
    try {

      const response = await axios.get(
          `${config.baseApi}/pets/medical-histories/${medicalHistoryId}`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
      )

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
