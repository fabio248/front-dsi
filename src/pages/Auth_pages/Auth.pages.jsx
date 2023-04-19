import React from "react";

export function Auth_pages(props) {
  const { children } = props;
  return (
    <>
      <h1>Hola this is children</h1>
      {children}
    </>
  );
}
