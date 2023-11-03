// Para mantener un orden de datos se importa una carpeta de constantes
import { config, configJwt, configApiBackend } from '../config';
import { format } from 'date-fns';

export class ApiAuth {
  //REGISTRO
  async registerUser(data) {
    try {
      const url = `${config.baseApi}/${configApiBackend.users}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        // Este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
        body: JSON.stringify({
          // Parametros a enviar
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: format(data.birthday, 'dd/MM/yyyy'),
          email: data.email,
          password: data.password,
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

  // REGISTRO HECHO POR ADMINISTRADOR
  async registerUserForVet(data) {
    try {
      const url = `${config.baseApi}/${configApiBackend.users}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        // Este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
        body: JSON.stringify({
          // Parametros a enviar
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

      if (response.status != 201) throw result; // Valida la respuesta del back
      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  //LOGIN
  async login(data) {
    try {
      const url = `${config.baseApi}/${configApiBackend.login}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        // Este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
        body: JSON.stringify({
          // Parametros a enviar
          email: data.email,
          password: data.password,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const url = `${config.baseApi}/${configApiBackend.refreshAccessToken}`;

      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          token: refreshToken,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  // GUARDA ACCESSTOKEN EN LOCALSTORAGE
  setAccessToken(token) {
    localStorage.setItem(configJwt.access, token);
  }
  // RECUPERACIÓN DE ACCESSTOKEN EN LOCALSTORAGE
  getAccessToken() {
    return localStorage.getItem(configJwt.access);
  }

  // GUARDA RPROVIDERTOKEN EN LOCALSTORAGE
  setProviderToken(token) {
    localStorage.setItem(configJwt.providerToken, token);
  }
  // RECUPERACIÓN DE PROVIDERTOKEN EN LOCALSTORAGE
  getProviderToken() {
    return localStorage.getItem(configJwt.providerToken);
  }

  // GUARDA REFRESHTOKEN EN LOCALSTORAGE
  setRefreshToken(token) {
    localStorage.setItem(configJwt.refresh, token);
  }
  // RECUPERACIÓN DE REFRESHTOKEN EN LOCALSTORAGE
  getRefreshToken() {
    return localStorage.getItem(configJwt.refresh);
  }

  // ELIMINAR TOKENS DE LOCALSTORAGE
  removeTokens() {
    localStorage.removeItem(configJwt.access);
    localStorage.removeItem(configJwt.refresh);
    localStorage.removeItem(configJwt.providerToken);
  }

  //FORGOT PASSWORD
  async forgotPassword(data, token) {
    try {
      console.log(token)
      const url = `${config.baseApi}/${configApiBackend.forgotPassword}`; // RUTA
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          email: data.email,
          recoveryToken: token,

        }),
      };
      // Fetch funcion que genera la peticion al back con la URL(a donde debe ir) y params(que parametros envias)
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  //CHANGE PASSWORD
  async changePassword(data, changePasswordToken) {
    try {
      console.log(changePasswordToken)
      const url = `${config.baseApi}/${configApiBackend.changePassword}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          newPassword: data.password,
          recoveryToken: changePasswordToken,
        }),
      };
      // Fetch funcion que genera la peticion al back con la URL(a donde debe ir) y params(que parametros envias)
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  //AUTENTIFICACIÓN CON GOOGLE
  async googleAuth(data) {
    try {
      const url = `${config.baseApi}/${configApiBackend.googleAuth}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          birthday: data.birthday,
          role: data.role,
          phone: data.phone,
        }),
      };
      // Fetch funcion que genera la peticion al back con la URL(a donde debe ir) y params(que parametros envias)
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }
}
