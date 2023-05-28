import { Vet_routes, Users_routes, Users_Logged_routes } from "./routers";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Users_routes />
      <Users_Logged_routes />
      <Vet_routes />
      </BrowserRouter>
    </>
  );
}

export default App;
