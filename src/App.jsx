import {
  Vet_routes,
  Users_routes,
  Clients_routes,
  Auth_routes,
} from './routers';
import { AuthProvider } from './context';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react"
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SpeedInsights />
        <Auth_routes />
        <Clients_routes />
        <Vet_routes />
        <Users_routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
