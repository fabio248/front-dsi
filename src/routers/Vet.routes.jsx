import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth_pages } from "../pages";
import { Vet_Layouts } from "../layouts";

export function Vet_routes() {
  const Layout = (Layout, Pages) => {
    return (
      <>
        <Layout>
          <Pages />
        </Layout>
        {/* <Pages>
          <Layout />
        </Pages> */}
      </>
    );
  };

  return (
    <Routes>
      <Route path="/admin" element={Layout(Vet_Layouts, Auth_pages)} />
    </Routes>
  );
}
