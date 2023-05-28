import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Auth_pages, Login } from "../pages";
import { Vet_Layouts } from "../layouts";
import { useAuth } from "../hooks";

//const user = useAuth();

export function Vet_routes() {

  const { user } = useAuth();
  const [rol, setRol] = useState("default");

  //console.log(user.role);
  //console.log(user);

  
  useEffect(() => {
    if (user != null) {
      const { role } = user.data;
      console.log(role);
      setRol(role);
      //console.log(user.data.rol);
    }
  }, [])
  
  const Layout = (Layout, Pages) => {
    return (
      <>
        <Layout>
          <Pages />
        </Layout>
      </>
    );
  };
  return (
    <Routes>

      {/* validar un elemento user para verificar el acceso del usuario */}
      {!user && rol != "admin"? (
        <Route path="/admin/*" element={ <Login /> }/>
        ) : (
          <>
          {/* cargar la misma ruta desde dos paths, con la funcion map de lodash*/}
          { ["/admin", "/admin/auth"].map((path) => (
            <Route key={path} path={path} element={Layout(Vet_Layouts, Auth_pages)}/>
          ))}

          {/* Rutas que accede el veterinaria al completar la autentificación */}
          {/*<Route path="" element={Layout(Vet_Layouts, )}/>*/}
          </>
        )};
    </Routes>
  );
}
