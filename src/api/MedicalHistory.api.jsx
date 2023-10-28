import { config, configApiBackend } from '../config';
import { format } from 'date-fns';
import axios from 'axios';
import {ApiAuth} from './Auth.api.jsx';
export class PetsMedicalHistories {
  auth = new ApiAuth();
  accessToken = this.auth.getAccessToken();

  // CREAR HOJA CLINICA
  async create(accessToken, idPet, medicalHistory) {
    try {
      if (!medicalHistory.whichPets) {
        delete medicalHistory.whichPets;
      }
      const url = `${config.baseApi}/${configApiBackend.pets}/${idPet}/${configApiBackend.medicalHistories}`;
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isHaveAllVaccine: medicalHistory.vacuna,
            isReproduced: medicalHistory.reproduccion,
            descendants: medicalHistory.descendencia,
            room: medicalHistory.habitaculo,
            diasesEvaluation: medicalHistory.enfermedad,
            observation: medicalHistory.observacion,
            food: {
                quantity: medicalHistory.quantityFood,
                type: medicalHistory.typeFood
            },
            physicalExam: {
                weight: medicalHistory.weight,
                palpitations: medicalHistory.palpitaciones,
                temperature: medicalHistory.temperatura,
                respiratoryRate: medicalHistory.frecuenciaRespiratoria,
                cardiacRate: medicalHistory.frecuenciaCardiaca,
                laboratoryExam: medicalHistory.examenLaboratorio,
                pulse: medicalHistory.pulso,
                mucous: medicalHistory.mucus
            },
            otherPet: {
                isLiveOtherPets: medicalHistory.convivencia,
                whichPets: medicalHistory.whichPets,
            },
            diagnostic: {
                description: medicalHistory.diagnostic,
                treatments: medicalHistory.tratamientos,
                surgicalIntervations: medicalHistory.intervenciones
            }
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
      console.log(fileType);
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
