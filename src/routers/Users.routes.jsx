import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Catalogo_pages, Informacion_pages, Historia_pages, Galeria_pages } from "../pages";
import { Users_Layouts } from "../layouts";
import { AgendarCita} from "../pages";
export function Users_routes() {
  const Layout = (Layout, Pages) => {
    return (
      <Layout>
        <Pages />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={Layout(Users_Layouts, Catalogo_pages)} />
      <Route path="/catalogo" element={Layout(Users_Layouts, Catalogo_pages)} />
      <Route path="/informacion" element={Layout(Users_Layouts, Informacion_pages)} />
      <Route path="/historia" element={Layout(Users_Layouts, Historia_pages)} />
      <Route path="/galeria" element={Layout(Users_Layouts, Galeria_pages)} />
    </Routes>
  );
}
