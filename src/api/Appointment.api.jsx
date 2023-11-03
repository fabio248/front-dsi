import { config, configApiBackend } from '../config';
import { format } from 'date-fns';
import axios from 'axios';
import moment from "dayjs";

export class ApiCitas {
  baseUrl = `${config.baseApi}/${configApiBackend.appointments}`;
  //REGISTRO
  async registerAppointment(accessToken, data) {
    try {
      const url = this.baseUrl;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          startDate: format(data.startDate, 'dd/MM/yyyy HH:mm'),
          endDate: format(data.endDate, 'dd/MM/yyyy HH:mm'),
          name: data.name.value,
          emailClient: data.emailClient.value,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  async createEventGoogleCalendar(formikValues, providerToken) {
    const {
      name,
      description,
      startDate,
      endDate,
      emailClient,
    } = formikValues


    const event = {
      summary: name.value,
      sendNotifications: {
        useDefault: true,
      },
      description,
      location:
          'https://www.google.com/maps/place/Cl%C3%ADnica+Veterinaria+Mistun/@13.5110156,-88.8710632,17z/data=!3m1!4b1!4m6!3m5!1s0x8f7cadbe1e0ae625:0xf916477fc1f3c161!8m2!3d13.5110156!4d-88.8684883!16s%2Fg%2F11j09_yr57?entry=ttu',
      start: {
        dateTime: startDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [
        { email: 'veterinariamistum2013@gmail.com' },
        { email: emailClient.value },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 120 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    try {
      const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
          {
            method: 'POST',
            headers: {
              // Authorization: 'Bearer ' + session.provider_token,
              Authorization: 'Bearer ' + providerToken,
            },
            body: JSON.stringify(event),
          }
      );
      if (response.status !== 200) {
        throw new Error('');
      }
    } catch (error) {
      throw new Error(
          'Inicia sesión con Google para poder crear evento en Google Calendar'
      );
    }
  }

  //SEND EMAIL EVENT
  async deleteAppointment(accessToken, idAppointment) {
    try {
      await axios.delete(
          `${this.baseUrl}/${idAppointment}`,
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
            }
      )
    } catch (e) {
      throw e
    }
  }
  async AppoinmentsByEmail(accessToken, email) {
    try {
      const emailValid = `email=${email}`;

      const url = `${config.baseApi}/${configApiBackend.appointments}?${emailValid}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
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
