import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { User_pages } from "../pages";
import { Catalogo_pages } from "../pages";
import { Informacion_pages } from "../pages";
import { Contacto_pages } from "../pages";
import { Historia_pages } from "../pages";
import { Biografia_pages } from "../pages";
import { Galeria_pages } from "../pages";
import { Users_Layouts } from "../layouts";

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
      <Route path="/" element={Layout(Users_Layouts, User_pages)} />
      <Route path="/catalogo" element={Layout(Users_Layouts, Catalogo_pages)} />
      <Route path="/informacion" element={Layout(Users_Layouts, Informacion_pages)} />
      <Route path="/contacto" element={Layout(Users_Layouts, Contacto_pages)} />
      <Route path="/historia" element={Layout(Users_Layouts, Historia_pages)} />
      <Route path="/biografia" element={Layout(Users_Layouts, Biografia_pages)} />
      <Route path="/galeria" element={Layout(Users_Layouts, Galeria_pages)} />
    </Routes>
  );
}
