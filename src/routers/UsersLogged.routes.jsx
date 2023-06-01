import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { User_pages } from "../pages";
import { Catalogo_pages } from "../pages";
import { Mascotas_pages } from "../pages";
import { Visualizar_pages } from "../pages";
import { Users_Logged_Layouts } from "../layouts";
import { useAuth } from "../hooks";
import { ProtectedRoute } from "../components/Admin/Auth/ProtectedRoutes";

export function Users_Logged_routes() {

  const { user } = useAuth();

  const Layout = (Layout, Pages) => {
    return (
      <Layout>
        <Pages />
      </Layout>
    );
  };

  function isClient(){
    if (user != null) {
      const { role } = user.data;
      return role === "client" || role == "authenticated"
    }
  }

  return (
    <Routes>
      <Route element = {<ProtectedRoute isAllowed={!!user && isClient()} redirectTo="/login"/>}>
        <Route path="/client" element={Layout(Users_Logged_Layouts, User_pages)} />
        <Route path="/client/catalogo" element={Layout(Users_Logged_Layouts, Catalogo_pages)} />
        <Route path="/client/mascotas" element={Layout(Users_Logged_Layouts, Mascotas_pages)} />
        <Route path="/client/visualizar" element={Layout(Users_Logged_Layouts, Visualizar_pages)} />
      </Route>
    </Routes>
  );
}