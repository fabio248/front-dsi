import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Visualizar_pages,
  Catalogo_pages,
  Mascotas_pages,
  User_pages,
} from '../pages';
import { Clients_Layouts } from '../layouts';
import { useAuth } from '../hooks';
import { ProtectedRoute } from '../components/Admin/Auth/ProtectedRoutes';
import { Layout } from '../shared/components/Layout';

export function Clients_routes() {
  const { user } = useAuth();

  function isClient() {
    if (user != null) {
      const { role } = user;
      return role === 'client' || role == 'authenticated';
    }
  }

  return (
    <Routes>
      <Route
        exact
        path='/client/'
        element={
          <ProtectedRoute
            isAllowed={!!user && isClient()}
            redirectTo='/login'
          />
        }
      >
        <Route exact path='' element={Layout(Clients_Layouts, User_pages)} />
        <Route
          exact
          path='catalogo'
          element={Layout(Clients_Layouts, Catalogo_pages)}
        />
        <Route
          exact
          path='mascotas'
          element={Layout(Clients_Layouts, Mascotas_pages)}
        />
        <Route
          exact
          path='visualizar'
          element={Layout(Clients_Layouts, Visualizar_pages)}
        />
      </Route>
    </Routes>
  );
}
