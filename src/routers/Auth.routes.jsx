import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login, Registro, ChangePassword } from "../pages";

export function Auth_routes() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Registro/>} />
      <Route path="/changePassword" element={ <ChangePassword />} />
    </Routes>
  );
}