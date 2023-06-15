const SERVER_IP = 'localhost:3000';

// Se crea este documento para que todos cuando ejecuten alguna peticion y la ruta no exista
// Solo se tenga que modificar la variable que se invoque
export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`, // URL que renderiza la app
  BASE_API: `http://${SERVER_IP}/api/v1`, // Esta url cambiará segun como se defina en el back
  BASE_SUPABASE: `http://localhost:5173/login`, // URL de redirección para Google Auth

  API_ROUTES: {
    //Todo esto seran los mismos nombres de las rutas del back segun como se defina
    LOGIN: 'auth/login',
    GOOGLEAUTH: 'auth/saveData',
    FORGOPASSWORD: 'auth/forgotPassword',
    CHANGEPASSWORD: 'auth/change-password',
    USERS: 'users',
    REFRESH_ACCESS_TOKEN: 'auth/refreshToken',
    PETS: 'pets',
  },
  JWT: {
    ACCESS: 'access',
    REFRESH: 'refresh',
  },
  PROVIDER_TOKEN: {
    PROVIDER: 'sb-uaxoyjmbhrugldbyjywi-auth-token provider_token',
  },
};
