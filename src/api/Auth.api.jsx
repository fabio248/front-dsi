//para mantener un orden de datos se importa una carpeta de constantes
import { ENV } from "../utils";

export class ApiAuth {
  base_api = ENV.BASE_API;


  
  //this is a example of login
  async login(data) {
    // siempre se encierra todo en try cath
    try {
      const url = `${this.base_api}/${ENV.API_ROUTES.LOGIN}`; //la ruta puede cambiar
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
      const result = response.json();

      if (response.status !== 200) throw result; //valida la respuesta del back

      return result;
    } catch (error) {
      throw error; //menejo del error
    }
  }
}