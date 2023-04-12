import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth_pages } from "../pages";

export function Vet_routes() {
  return (
    <Routes>
      <Route path="/admin" element={<Auth_pages />} />
    </Routes>
  );
}
