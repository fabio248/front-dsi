import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login, Registro } from "../pages";

export function Auth_routes() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Registro/>} />
    </Routes>
  );
}