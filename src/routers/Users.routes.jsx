import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { User_pages } from "../pages";
import { Catalogo_pages } from "../pages";
import { Visualizar_pages } from "../pages";
import { Mascotas_pages } from "../pages";
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
      <Route path="/visualizar" element={Layout(Users_Layouts, Visualizar_pages)} />
      <Route path="/mascotas" element={Layout(Users_Layouts, Mascotas_pages)} />
    </Routes>
  );
}
