// Para mantener un orden de datos se importa una carpeta de constantes
import { ENV } from '../utils';

export class ApiAuth {
  //REGISTRO
  async registerUser(data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`;
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
          birthday: data.fechaNacimiento,
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

  async registerUserForVet(data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`;
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
          birthday: data.birthday,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      };
      console.log(params);
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result; // Valida la respuesta del back
      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }

  //LOGIN
  async login(data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.LOGIN}`;
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
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;

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
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }
  // RECUPERACIÓN DE ACCESSTOKEN EN LOCALSTORAGE
  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }
  // GUARDA REFRESHTOKEN EN LOCALSTORAGE
  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }
  // RECUPERACIÓN DE REFRESHTOKEN EN LOCALSTORAGE
  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  // ELIMINAR TOKENS DE LOCALSTORAGE
  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }

  //FORGOT PASSWORD
  async forgotPassword(data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FORGOPASSWORD}`; // RUTA
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          email: data.email,
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
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.CHANGEPASSWORD}`;
      const params = {
        method: 'POST', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Parametros a enviar
          newPassword: data.password,
          token: changePasswordToken,
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
