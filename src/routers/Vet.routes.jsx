import { Route, Routes } from 'react-router-dom';
import { Auth_pages, UserAndPets, Users, AgendarCita, ProductCatalog } from '../pages';
import { Vet_Layouts } from '../layouts';

import { useAuth } from '../hooks';
import { ProtectedRoute } from '../components/Admin/Auth/ProtectedRoutes';
import { PerfilUserAndPets } from '../pages';
import { Layout } from '../shared/components/Layout';
import { CompletePetPerfil } from '../pages/Vet_pages/PerfilPets/CompletePerfilPets';
import {GenerateMedicalHistory} from "../pages/Vet_pages/PerfilPets/GenerateMedicalHistory.jsx";

export function Vet_routes() {
  const { user } = useAuth();
  function isAdmin() {
    if (user != null) {
      const { role } = user;
      return role === 'admin';
    }
  }
  return (
    <Routes>
       <Route
        path='/admin/'
        element={
          <ProtectedRoute isAllowed={!!user && isAdmin()} redirectTo='/login' />
        }
       >     
        <Route path='' element={Layout(Vet_Layouts, Auth_pages)}></Route>
        <Route
          path='userAndPets'
          element={Layout(Vet_Layouts, UserAndPets)}
        ></Route>
        <Route path='users' element={Layout(Vet_Layouts, Users)}></Route>
        <Route
          path='calendar'
          element={Layout(Vet_Layouts, AgendarCita)}
        ></Route>
        <Route path='products' element={Layout(Vet_Layouts, ProductCatalog)}></Route>
        <Route path='users/:userId' element={<PerfilUserAndPets />} />
        <Route path='pets/:petId' element={<CompletePetPerfil />} />
        <Route path='pets/:petId/medical-history/:medicalHistoryId' element={<GenerateMedicalHistory />} />
      </Route>    
    </Routes>
  );
}
