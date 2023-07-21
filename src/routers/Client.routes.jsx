import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  Visualizar_pages,
  Catalogo_pages,
  Mascotas_pages,
  User_pages,
} from '../pages';
import { Clients_Layouts } from '../layouts';
import { useAuth } from '../hooks';
import { ProtectedRoute } from '../components/Admin/Auth/ProtectedRoutes';

export function Clients_routes() {
  const { user } = useAuth();

  const Layout = (Layout, Pages) => {
    return (
      <Layout>
        <Pages />
      </Layout>
    );
  };

  function isClient() {
    if (user != null) {
      const { role } = user;
      return role === 'client' || role == 'authenticated';
    }
  }

  return (
    <Routes>
      <Route
        path='/client/'
        element={
          <ProtectedRoute
            isAllowed={!!user && isClient()}
            redirectTo='/login'
          />
        }
      >
        <Route path='' element={Layout(Clients_Layouts, User_pages)} />
        <Route
          path='catalogo'
          element={Layout(Clients_Layouts, Catalogo_pages)}
        />
        <Route
          path='mascotas'
          element={Layout(Clients_Layouts, Mascotas_pages)}
        />
        <Route
          path='visualizar'
          element={Layout(Clients_Layouts, Visualizar_pages)}
        />
      </Route>
    </Routes>
  );
}
