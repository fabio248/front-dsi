import { Vet_routes, Users_routes, Clients_routes, Auth_routes } from "./routers";
import {AuthProvider} from "./context";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Auth_routes />
          <Users_routes />
          <Clients_routes />
          <Vet_routes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
