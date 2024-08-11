import {
  Vet_routes,
  Users_routes,
  Clients_routes,
  Auth_routes,
} from './routers';
import { AuthProvider } from './context';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Add the SpeedInsights and Analytics components from Vercel */}
        <SpeedInsights />
        <Analytics />
        <Auth_routes />
        <Clients_routes />
        <Vet_routes />
        <Users_routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
