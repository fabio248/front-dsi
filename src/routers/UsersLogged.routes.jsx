import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { User_pages } from "../pages";
import { Catalogo_pages } from "../pages";
import { Informacion_pages } from "../pages";
import { Historia_pages } from "../pages";
import { Mascotas_pages } from "../pages";
import { Visualizar_pages } from "../pages";
import { Users_Logged_Layouts } from "../layouts";

export function Users_Logged_routes() {
  const Layout = (Layout, Pages) => {
    return (
      <Layout>
        <Pages />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={Layout(Users_Logged_Layouts, User_pages)} />
      <Route path="/catalogol" element={Layout(Users_Logged_Layouts, Catalogo_pages)} />
      <Route path="/mascotas" element={Layout(Users_Logged_Layouts, Mascotas_pages)} />
      <Route path="/visualizar" element={Layout(Users_Logged_Layouts, Visualizar_pages)} />
    </Routes>
  );
}