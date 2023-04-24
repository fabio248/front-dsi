import * as React from "react";

import "./Users_Layouts.css";

export function Users_Layouts(props) {
  const { children } = props;

  return (
    <>
      <h1>Hello!, I hate vite </h1>
      {children}
    </>
  );
}
