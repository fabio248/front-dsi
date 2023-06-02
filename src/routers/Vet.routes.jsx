import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth_pages, UserAndPets } from '../pages';
import { Vet_Layouts } from '../layouts';
import { useAuth } from '../hooks';
import { ProtectedRoute } from '../components/Admin/Auth/ProtectedRoutes';

//const user = useAuth();

export function Vet_routes() {
  const { user } = useAuth();

  function isAdmin() {
    if (user != null) {
      const { role } = user.data;
      return role === 'admin';
    }
  }

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
      <Route
        element={
          <ProtectedRoute isAllowed={!!user && isAdmin()} redirectTo='/login' />
        }
      >
        <Route path='/admin' element={Layout(Vet_Layouts, Auth_pages)}></Route>
        <Route
          path='/admin/user_and_pets'
          element={Layout(Vet_Layouts, UserAndPets)}
        ></Route>
        <Route
          path='/admin/ver_calendar'
          element={Layout(Vet_Layouts, () => {
            console.log('Hola como estas');
          })}
        ></Route>
        <Route
          path='/admin/calendar'
          element={Layout(Vet_Layouts, () => {
            console.log('Hola como estas2');
          })}
        ></Route>
      </Route>
    </Routes>
  );
}
