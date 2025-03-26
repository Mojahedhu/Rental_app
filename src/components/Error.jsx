import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorComponent() {
  const error = useRouteError();
  return (
    <section style={{ textAlign: "center" }}>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.statusText} - {error.status}
      </pre>
    </section>
  );
}

export default ErrorComponent;
