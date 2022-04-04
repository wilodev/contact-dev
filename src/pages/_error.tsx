import React from "react";
import { NextPageContext } from "next";
// Se crea el tipo de props para el componente error
type errorProps = { statusCode?: number };
// Componente Error
const Error = ({ statusCode }: errorProps) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};
// Props iniciales del componente error
Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
