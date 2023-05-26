//para mantener un orden de datos se importa una carpeta de constantes
import { ENV } from "../utils";

export class ApiAuth {

  async registerUser(data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: 'POST', //tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          //el tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          'Content-Type': 'application/json',
        },
        //este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
        body: JSON.stringify({
          //parametros a enviar
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: data.fechaNacimiento,
          email: data.email,
          password: data.password,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; //valida la respuesta del back
      return result;
    } catch (error) {
      throw error; //manejo del error
    }
  }
  
  //this is a example of login
  async login(data) {
    // siempre se encierra todo en try cath
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.LOGIN}`; //la ruta puede cambiar
      const params = {
        method: "POST", //tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          //el tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          "Content-Type": "application/json",
        },
        //este puede variar si es texto plano del body es un stringfy o tambien puede ser formData
        body: JSON.stringify({
          //parametros a enviar
          email: data.email,
          password: data.password,
        }),
      };
      //   fetch funcion que genera la peticion al back con la URL(a donde debe ir) y params(que parametros envias)
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; //valida la respuesta del back

      return result;
    } catch (error) {
      throw error; //menejo del error
    }
  }

  async refreshAccessToken(refreshToken) {
      try {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;

        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: refreshToken,
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

  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }
  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }
  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}