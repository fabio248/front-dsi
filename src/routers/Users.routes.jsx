import React from "react";
import { Route, Routes } from "react-router-dom";
import { User_pages } from "../pages";
import { Users_Layouts } from "../layouts";

export function Users_routes() {
  const Layout = (Layout, Pages) => {
    return (
      <Layout>
        <Pages />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={Layout(Users_Layouts, User_pages)} />
    </Routes>
  );
}
