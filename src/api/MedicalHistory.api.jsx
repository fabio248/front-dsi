import { config, configApiBackend } from '../config';
import { format } from 'date-fns';
import axios from 'axios';
import {ApiAuth} from './Auth.api.jsx';
export class PetsMedicalHistories {
  auth = new ApiAuth();
  accessToken = this.auth.getAccessToken();
  baseUrl = `${config.baseApi}/${configApiBackend.pets}`;

  // CREAR HOJA CLINICA
  async create(accessToken, idPet, medicalHistoryData) {
    try {
      if (!medicalHistoryData.whichPets) {
        delete medicalHistoryData.whichPets;
      }
       
        const medicalHistory = {
            ...medicalHistoryData,
            intervenciones: medicalHistoryData.intervenciones.map(intervation => {
                return {
                    ...intervation,
                    intervationDate: format(intervation.intervationDate, 'dd/MM/yyyy')
                }
            })
        }
      const url = `${config.baseApi}/${configApiBackend.pets}/${idPet}/medical-histories`;
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

  // ACTUALIZAR HOJA CLINICA
  async update(accessToken, idPet, previousMedicalHistory, medicalHistoryData) {
    const url = `${this.baseUrl}/medical-histories`;
    const params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
    try {
          const medicalHistory = {
          ...medicalHistoryData,
          intervenciones: medicalHistoryData.intervenciones.map(intervation => {
              return {
                  ...intervation,
                  intervationDate: format(intervation.intervationDate, 'dd/MM/yyyy')
              }
          })
      }
      if (!medicalHistoryData.whichPets) {
        delete medicalHistoryData.whichPets;
      }

      await Promise.all([
          previousMedicalHistory.diagnostic.treatments.map( async (treatment) => {
              let treatmentId = treatment.id;
              if (treatmentId) {
                  return axios.delete(`${url}/diagnostics/treatments/${treatmentId}`, params);
              }
          }),
          medicalHistory.tratamientos.map( async (treatment) => {
              return axios.post(`${url}/diagnostics/${previousMedicalHistory.diagnostic.id}/treatments`,
                  treatment,
                  params);
          }),
          previousMedicalHistory.diagnostic.surgicalIntervations.map( async (intervation) => {
              let intervationId = intervation.id;
              if (intervationId) {
                  return axios.delete(`${url}/diagnostics/surgical-interventions/${intervationId}`, params);
              }
          }),
          medicalHistory.intervenciones.map( async (intervation) => {
              return axios.post(`${url}/diagnostics/${previousMedicalHistory.diagnostic.id}/surgical-interventions`,
                  intervation,
                  params);
          }),
          axios.patch(`${url}/${previousMedicalHistory.id}/diagnostics`, { description: medicalHistory.diagnostic}, params)
      ])

      const urlPatch = `${config.baseApi}/${configApiBackend.pets}/${configApiBackend.medicalHistories}/${previousMedicalHistory.id}`;
      const paramsPatch = {
        method: 'PATCH',
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
        }),
      };

      const response = await fetch(urlPatch, paramsPatch);
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
