const SERVER_IP = "localhost:5173";

//se crea este documento para que todos cuando ejecuten alguna peticion y la ruta no exista
//solo se tenga que modificar la variable que se invoque
export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`, //url que renderiza la app
    BASE_API: `http://${SERVER_IP}/api/v1`, //esta url cambiará segun como se defina en el back

    API_ROUTES:{
        //Todo esto seran los mismos nombres de las rutas del back segun como se defina
        LOGIN:"/login",
        REGISTER:"/register",
        USERS:"/users",
        USERS_ID:"/users/:id",
    }
}
